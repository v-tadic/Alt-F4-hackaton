<?php
require "db.php";

$username = $_POST["username"] ?? "";
$email    = $_POST["email"] ?? "";
$password = $_POST["password"] ?? "";

if ($username === "" || $email === "" || $password === "") {
    die("Sva polja su obavezna");
}

if (strlen($password) < 8) {
    die("Šifra mora imati najmanje 8 karaktera");
}

if (
    !str_contains($email, "@gmail.com") &&
    !str_contains($email, "@yahoo.com") &&
    !str_contains($email, "@outlook.com")
) {
    die("Email nije validan");
}

$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    die("Korisnik već postoji");
}

$hashed = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
);
$stmt->bind_param("sss", $username, $email, $hashed);
$stmt->execute();

echo "Registracija uspešna";
