<?php
session_start();
require "db.php";

$email    = $_POST["email"] ?? "";
$password = $_POST["password"] ?? "";

if ($email === "" || $password === "") {
    die("Popuni sva polja");
}

$stmt = $conn->prepare(
    "SELECT password FROM users WHERE email = ?"
);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    die("Korisnik ne postoji");
}

$user = $result->fetch_assoc();

if (!password_verify($password, $user["password"])) {
    die("Pogrešna šifra");
}

$_SESSION["user_email"] = $email;
header("Location: dashboard.php");
exit;
