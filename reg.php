<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GluScan - Register</title>
    <link rel="stylesheet" href="css/login.css">
</head>
<body>
    <div class="login-container">
        <form class="login-form" action="php/auth/regist.php" method="post">
            <div class="form-group">
                <label for="nama">Nama Lengkap</label>
                <div class="input-wrapper">
                    <input type="text" id="nama" name="nama" placeholder="Masukkan nama lengkap" required>
                </div>
            </div>
            
            <div class="form-group">
                <label for="jenis">Jenis Kelamin</label>
                <div class="input-wrapper">
                    <select name="jenis" id="jenis" required>
                        <option value="L">Laki - Laki</option>
                        <option value="P">Perempuan</option>
                    </select>
                </div>
            </div>
            
            <div class="form-group">
                <label for="email">Email</label>
                <div class="input-wrapper">
                    <input type="email" id="email" name="email" placeholder="contoh@email.com" required>
                </div>
            </div>
            
            <div class="form-group">
                <label for="password">Password</label>
                <div class="input-wrapper">
                    <input type="password" id="password" name="password" placeholder="Masukkan password" required>
                </div>
            </div>
            
            <button type="submit" class="login-btn">Daftar</button>
        </form>

        <div class="signup-section">
            <p class="signup-text">Sudah punya akun? <a href="index.php">Login</a></p>
        </div>
    </div>
</body>
</html>