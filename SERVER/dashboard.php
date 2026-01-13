<?php
session_start();

if (!isset($_SESSION["user_email"])) {
    header("Location: login.html");
    exit;
}

echo "Ulogovan si kao: " . $_SESSION["user_email"];
echo "<br><a href='logout.php'>Logout</a>";
