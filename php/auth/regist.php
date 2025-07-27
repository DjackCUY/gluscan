<?php
include("../db/connect.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nama = $_POST['nama'];
    $jenis = $_POST['jenis'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $cek_email = $conn->prepare("SELECT id_user FROM users WHERE email = ?");
    $cek_email->bind_param("s", $email);
    $cek_email->execute();
    $cek_email->store_result();

    if ($cek_email->num_rows > 0) {
        session_start();
        $_SESSION['error'] = "Email sudah terdaftar!";
        header("Location: ../../index.php");
        exit();
    }

    $cek_email->close();

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO users (nama, email, pass, jenis_kelamin, created_at) VALUES (?, ?, ?, ?, NOW())");
    $stmt->bind_param("ssss", $nama, $email, $hashed_password, $jenis);

    if ($stmt->execute()) {
        header("Location: ../../index.php");
        exit();
    } else {
        echo "Gagal mendaftar: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
