<?php
    include 'php/db/connect.php';
    // Mengatur header respons sebagai JSON
    header('Content-Type: application/json');

    // Memeriksa apakah metode request adalah POST
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {

        // Memeriksa apakah semua data yang diperlukan ada
        if (isset($_GET['id_user']) && isset($_GET['nilai']) && isset($_GET['jenis'])) {
            
            // Mengambil data dari request
            $id_user = $_GET['id_user'];
            $nilai_sensor = $_GET['nilai'];
            $jenis_sensor = $_GET['jenis'];

            // SQL query untuk memasukkan data ke tabel 'readings'
            // Kolom 'time' akan diisi secara otomatis oleh database jika diatur DEFAULT CURRENT_TIMESTAMP
            // Jika tidak, Anda bisa menggunakan NOW() seperti: INSERT INTO readings (users_id_user, nilai, jenis, time) VALUES (?, ?, ?, NOW())
            $sql = "INSERT INTO readings (users_id_user, nilai, jenis) VALUES (?, ?, ?)";
            
            $stmt = $conn->prepare($sql);
            
            // Mengikat parameter ke statement
            // i = integer (untuk id_user)
            // d = double/float (untuk nilai)
            // s = string (untuk jenis)
            $stmt->bind_param("ids", $id_user, $nilai_sensor, $jenis_sensor);

            // Menjalankan statement
            if ($stmt->execute()) {
                // Jika berhasil, kirim respons sukses
                $response = ['status' => 'success', 'message' => 'Data berhasil disimpan.'];
                http_response_code(201);
            } else {
                // Jika gagal, kirim respons error
                $response = ['status' => 'error', 'message' => 'Gagal menyimpan data: ' . $stmt->error];
                http_response_code(500);
            }
            
            // Menutup statement
            $stmt->close();

        } else {
            // Jika salah satu data tidak lengkap
            $response = ['status' => 'error', 'message' => 'Data tidak lengkap. Pastikan id_user, nilai, dan jenis dikirim.'];
            http_response_code(400);
        }

    } else {
        // Jika metode request bukan POST
        $response = ['status' => 'error', 'message' => 'Metode request tidak diizinkan. Gunakan POST.'];
        http_response_code(405);
    }

    // Menutup koneksi database
    $conn->close();

    // Mengirimkan respons dalam format JSON
    echo json_encode($response);
?>