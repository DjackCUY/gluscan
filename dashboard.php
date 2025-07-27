<?php
session_start();
include "php/db/connect.php";

// Cek apakah user sudah login
if (!isset($_SESSION['user'])) {
    header("Location: index.php");
    exit();
}

$user = $_SESSION['user'];
$user_id = $user['id_user'];

// Pembacaan terbaru
$stmt = $conn->prepare("SELECT * FROM readings WHERE users_id_user = ? ORDER BY time DESC LIMIT 1");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$latest_reading = $result->fetch_assoc();

// Seluruh pembacaan
$stmt_read = $conn->prepare("
    SELECT * 
    FROM readings 
    WHERE users_id_user = ? 
      AND time < (
        SELECT MAX(time) 
        FROM readings 
        WHERE users_id_user = ?
    )
    ORDER BY time DESC;
");

$stmt_read->bind_param("ii", $user_id, $user_id);
$stmt_read->execute();
$result = $stmt_read->get_result();
$all_reading = $result->fetch_all(MYSQLI_ASSOC);

foreach ($all_reading as $reading) {
    echo "{$reading['nilai']} mg/dL - {$reading['jenis']} - {$reading['time']}<br>";
}


// Simulasi data report untuk grafik
$reportData = [
    "week" => ["lowest" => 80, "average" => 120, "highest" => 160],
    "month" => ["lowest" => 85, "average" => 125, "highest" => 170],
    "year" => ["lowest" => 90, "average" => 130, "highest" => 180]
];
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gluscan</title>
    <link rel="stylesheet" href="css/style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">
</head>
<body>
    <div class="phone-container">
        <!-- Report Screen -->
        <div class="report-screen" id="reportScreen">
            <div class="screen-header">
                <div class="screen-title">History</div>
            </div>

            <div class="report-filters">
                <button class="filter-btn active" onclick="setReportFilter('week', this)">7 Hari</button>
                <button class="filter-btn" onclick="setReportFilter('month', this)">1 Bulan</button>
                <button class="filter-btn" onclick="setReportFilter('year', this)">1 Tahun</button>
            </div>

            <div class="chart-container">
                <canvas id="reportChart" width="350" height="180"></canvas>
                <div class="report-boxes">
                <div class="report-box highest">
                    <div class="label">Highest</div>
                    <div class="value" id="highestValue">200</div>
                </div>
                <div class="report-box average">
                    <div class="label">Average</div>
                    <div class="value" id="averageValue">120</div>
                </div>
                <div class="report-box lowest">
                    <div class="label">Lowest</div>
                    <div class="value" id="lowestValue">50</div>
                </div>
            </div>
            </div>

            <div class="report-summary">
                <div class="summary-row">
                    <span class="summary-label"><i class="bi bi-arrow-down-circle text-success"></i> Total Pemasukan</span>
                    <span class="summary-value positive" id="totalIncome">+777</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label"><i class="bi bi-arrow-up-circle text-danger"></i> Total Pengeluaran</span>
                    <span class="summary-value negative" id="totalExpense">-777</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label"><i class="bi bi-calculator"></i> Saldo Bersih</span>
                    <span class="summary-value" id="netBalance">777</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label"><i class="bi bi-graph-up"></i> Rata-rata Harian</span>
                    <span class="summary-value" id="dailyAverage">7777</span>
                </div>
            </div>

            <div class="features-section">
                <div class="section-title">
                    <span><i class="bi bi-pie-chart"></i> Kategori Pengeluaran Tertinggi</span>
                </div>
            </div>
        </div>

        <!-- Settings Screen -->
        <div class="settings-screen" id="settingsScreen">
            <div class="screen-header">
                <div class="screen-title">Settings</div>
            </div>

            <div class="profile-section">
                <div class="profile-avatar"><?= strtoupper(substr($user['nama'], 0, 2)) ?></div>
                <div class="profile-name"><?= htmlspecialchars($user['nama']) ?></div>
                <div class="profile-email"><?= htmlspecialchars($user['email']) ?></div>
                <button class="edit-profile-btn" onclick="showEdit()"><i class="bi bi-pencil"></i> Edit Profil</button>
            </div>

            <div class="settings-section">
                <div class="settings-title"><i class="bi bi-shield-lock"></i> Keamanan</div>
                <div class="setting-item" onclick="toggleSetting('biometric')">
                    <div class="setting-left">
                        <div class="setting-icon"><i class="bi bi-fingerprint"></i></div>
                        <div class="setting-info">
                            <div class="setting-name">Login Biometrik</div>
                            <div class="setting-desc">Gunakan sidik jari atau Face ID</div>
                        </div>
                    </div>
                    <div class="toggle-switch active" id="biometric-toggle"></div>
                </div>
                <div class="setting-item">
                    <div class="setting-left">
                        <div class="setting-icon"><i class="bi bi-key"></i></div>
                        <div class="setting-info">
                            <div class="setting-name">Ubah PIN</div>
                            <div class="setting-desc">Ganti PIN transaksi Anda</div>
                        </div>
                    </div>
                    <div class="setting-right">
                        <span><i class="bi bi-chevron-right"></i></span>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-left">
                        <div class="setting-icon"><i class="bi bi-lock"></i></div>
                        <div class="setting-info">
                            <div class="setting-name">Ubah Password</div>
                            <div class="setting-desc">Ganti password login Anda</div>
                        </div>
                    </div>
                    <div class="setting-right">
                        <span><i class="bi bi-chevron-right"></i></span>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <div class="settings-title"><i class="bi bi-bell"></i> Notifikasi</div>
                <div class="setting-item" onclick="toggleSetting('push')">
                    <div class="setting-left">
                        <div class="setting-icon"><i class="bi bi-phone-vibrate"></i></div>
                        <div class="setting-info">
                            <div class="setting-name">Push Notification</div>
                            <div class="setting-desc">Notifikasi transaksi & promo</div>
                        </div>
                    </div>
                    <div class="toggle-switch active" id="push-toggle"></div>
                </div>
                <div class="setting-item" onclick="toggleSetting('email')">
                    <div class="setting-left">
                        <div class="setting-icon"><i class="bi bi-envelope"></i></div>
                        <div class="setting-info">
                            <div class="setting-name">Email Notification</div>
                            <div class="setting-desc">Laporan bulanan via email</div>
                        </div>
                    </div>
                    <div class="toggle-switch" id="email-toggle"></div>
                </div>
                <div class="setting-item" onclick="toggleSetting('sms')">
                    <div class="setting-left">
                        <div class="setting-icon"><i class="bi bi-chat-text"></i></div>
                        <div class="setting-info">
                            <div class="setting-name">SMS Notification</div>
                            <div class="setting-desc">Konfirmasi transaksi via SMS</div>
                        </div>
                    </div>
                    <div class="toggle-switch active" id="sms-toggle"></div>
                </div>
            </div>

            <div class="settings-section">
                <div class="settings-title"><i class="bi bi-gear"></i> Umum</div>
                <div class="setting-item">
                    <div class="setting-left">
                        <div class="setting-icon"><i class="bi bi-globe"></i></div>
                        <div class="setting-info">
                            <div class="setting-name">Bahasa</div>
                            <div class="setting-desc">Pilih bahasa aplikasi</div>
                        </div>
                    </div>
                    <div class="setting-right">
                        <span class="setting-value">Indonesia</span>
                        <span><i class="bi bi-chevron-right"></i></span>
                    </div>
                </div>
                <div class="setting-item" onclick="toggleSetting('dark')">
                    <div class="setting-left">
                        <div class="setting-icon"><i class="bi bi-moon"></i></div>
                        <div class="setting-info">
                            <div class="setting-name">Mode Gelap</div>
                            <div class="setting-desc">Aktifkan tema gelap</div>
                        </div>
                    </div>
                    <div class="toggle-switch active" id="dark-toggle"></div>
                </div>
                <div class="setting-item">
                    <div class="setting-left">
                        <div class="setting-icon"><i class="bi bi-currency-dollar"></i></div>
                        <div class="setting-info">
                            <div class="setting-name">Mata Uang</div>
                            <div class="setting-desc">Format tampilan uang</div>
                        </div>
                    </div>
                    <div class="setting-right">
                        <span class="setting-value">IDR (Rp)</span>
                        <span><i class="bi bi-chevron-right"></i></span>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <div class="settings-title"><i class="bi bi-headset"></i> Bantuan</div>
                <div class="setting-item">
                    <div class="setting-left">
                        <div class="setting-icon"><i class="bi bi-question-circle"></i></div>
                        <div class="setting-info">
                            <div class="setting-name">FAQ</div>
                            <div class="setting-desc">Pertanyaan yang sering ditanyakan</div>
                        </div>
                    </div>
                    <div class="setting-right">
                        <span><i class="bi bi-chevron-right"></i></span>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-left">
                        <div class="setting-icon"><i class="bi bi-chat-dots"></i></div>
                        <div class="setting-info">
                            <div class="setting-name">Live Chat</div>
                            <div class="setting-desc">Hubungi customer service</div>
                        </div>
                    </div>
                    <div class="setting-right">
                        <span><i class="bi bi-chevron-right"></i></span>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-left">
                        <div class="setting-icon"><i class="bi bi-file-text"></i></div>
                        <div class="setting-info">
                            <div class="setting-name">Syarat & Ketentuan</div>
                            <div class="setting-desc">Kebijakan penggunaan aplikasi</div>
                        </div>
                    </div>
                    <div class="setting-right">
                        <span><i class="bi bi-chevron-right"></i></span>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-left">
                        <div class="setting-icon"><i class="bi bi-shield-check"></i></div>
                        <div class="setting-info">
                            <div class="setting-name">Kebijakan Privasi</div>
                            <div class="setting-desc">Perlindungan data pribadi</div>
                        </div>
                    </div>
                    <div class="setting-right">
                        <span><i class="bi bi-chevron-right"></i></span>
                    </div>
                </div>
            </div>
            <a href="php/auth/logout.php"><button class="logout-btn"><i class="bi bi-box-arrow-left"></i> Keluar dari Akun</button></a>
        </div>

        <!-- Main Screen -->
        <div class="main-screen" id="mainScreen">
            <div class="header">
                <div class="header-left">
                    <div class="greeting">
                        <?php
                        date_default_timezone_set('Asia/Jakarta');

                        $hour = date('H');
                        if ($hour <= 12) {
                            echo "Good Morning";
                        } elseif ($hour < 18 && $hour > 12) {
                            echo "Good Afternoon";
                        } else {
                            echo "Good Night";
                        }
                        ?>
                    </div>
                    <div class="user-name"><?= htmlspecialchars($user['nama']) ?></div>
                </div>
                <div class="header-right">
                <button class="refresh-btn" onclick="refreshData()" id="refreshBtn">
                    <svg class="refresh-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 2v6h-6"></path>
                        <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                        <path d="M3 22v-6h6"></path>
                        <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                    </svg>
                </button>
                <div class="profile-pic" onclick="showSettings()"><?= strtoupper(substr($user['nama'], 0, 2)) ?></div>
                </div>
            </div>
<!-- if ($latest) {
    echo "Pembacaan terakhir: {$latest['nilai']} mg/dL ({$latest['jenis']}) pada {$latest['time']}";
} else {
    echo "Belum ada data pembacaan.";
} -->
            <div class="balance-card">
                <div class="overlay">
                    <div class="balance-label">Blood Glucose</div>
                    <div class="balance-amount" id="balanceAmount">
                        <span class="balanceValue"><?= htmlspecialchars($latest_reading['nilai']) ?></span>
                        <span class="balancePar">mg/dL</span>
                    </div>
                    <h5 class="status-circle"><i class="bi bi-circle-fill" style="color: green;"></i> Normal</h5>
                </div>
            </div>

            <div class="features-section">
                <div class="section-title">
                    <span><i class="bi bi-activity"></i> Your Latest Reading</span>
                    <span><i class="bi bi-plus-circle"></i></span>
                </div>
                <div class="feature-grid">
                </div>
            </div>

            <div class="features-section">
                <div class="section-title">
                    <span style="color: black;"><i class="bi bi-calendar-check"></i> Aktivitas Mendatang</span>
                    <span><i class="bi bi-plus-circle"></i></span>
                </div>
                <div class="upcoming-activities">
                    <div class="activity-suggestion">
                        <i class="bi bi-alarm"></i>
                        <div>
                            <div>Pembayaran Tagihan Listrik</div>
                            <div>Jatuh tempo: 15 Juni 2025</div>
                        </div>
                    </div>
                    <div class="activity-suggestion">
                        <i class="bi bi-piggy-bank"></i>
                        <div>
                            <div>Target Menabung Bulanan</div>
                            <div>Progress: 65% dari target</div>
                        </div>
                    </div>
                    <div class="activity-suggestion">
                        <i class="bi bi-credit-card"></i>
                        <div>
                            <div>Cashback Promo</div>
                            <div>Berlaku hingga akhir bulan</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Transfer Screen -->
        <div class="transfer-screen" id="transferScreen">
            <div class="screen-header">
                <div class="screen-title">Drug Suggestion</div>
            </div>

            <form class="transfer-form" id="transferForm" action="php/handler/transaksi/proses_transaksi.php" method="post">
                <div class="form-group">
                    <label class="form-label">Nomor Rekening Tujuan</label>
                    <input type="text" class="form-input" placeholder="Masukkan nomor rekening" id="accountNumber" name="rekening_tujuan" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Nama Penerima</label>
                    <input type="text" class="form-input" placeholder="Nama akan muncul otomatis" id="recipientName" readonly>
                </div>
                <div class="form-group">
                    <label class="form-label">Jumlah Transfer</label>
                    <input type="number" class="form-input" placeholder="Rp 0" id="transferAmount" name="jumlah" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Catatan (Opsional)</label>
                    <input type="text" class="form-input" placeholder="Tambahkan catatan" id="transferNote" name="catatan">
                </div>
                <button type="submit" class="submit-btn">Transfer Sekarang</button>
            </form>
        </div>

        <!-- Success Screen -->
        <div class="success-screen" id="successScreen">
            <div class="success-icon">✓</div>
            <div class="success-title">Transaksi Berhasil</div>

            <div class="transaction-details">
                <div class="detail-row">
                    <span class="detail-label">Tujuan:</span>
                    <span class="detail-value" id="successRecipient">-</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Nomor Transaksi:</span>
                    <span class="detail-value" id="successTransaksi">#-</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Tanggal & Waktu:</span>
                    <span class="detail-value" id="transactionDate">-</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Nomor Referensi:</span>
                    <span class="detail-value" id="successRef">-</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Sumber Dana:</span>
                    <span class="detail-value" id="successSender">-</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Nomor Tujuan:</span>
                    <span class="detail-value" id="successAccount">-</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Alias Penerima:</span>
                    <span class="detail-value" id="successAlias">-</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Catatan:</span>
                    <span class="detail-value" id="successNote">-</span>
                </div>
            </div>

            <div class="amount-display" id="successAmount">Rp 0</div>

            <div class="action-buttons">
                <button class="secondary-btn">Bagikan</button>
                <button class="primary-btn" onclick="showMain()">Selesai</button>
            </div>
        </div>


        <!-- Activity Screen -->
        <div class="activity-screen" id="activityScreen">
            <div class="screen-header">
                <div class="screen-title">Aktivitas Transaksi</div>
            </div>

            <div class="activity-list">
            </div>
        </div>

        <!-- Edit Profil -->
        <div class="edit-screen" id="editScreen" style="display: none;">
            <div class="screen-header">
                <button class="back-btn" onclick="showSettings()">←</button>
                <div class="screen-title">Edit Profil</div>
            </div>

            <form class="transfer-form" action="php/handler/profil/editprofil.php" method="post">
                <div class="form-group">
                    <label class="form-label">Nama lengkap</label>
                    <input type="text" class="form-input" placeholder="nama lengkap" name="nama_lengkap" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Alamat</label>
                    <input type="text" class="form-input" placeholder="alamat" name="alamat" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Nomor telepon</label>
                    <input type="tel" class="form-input" placeholder="08..." name="nomor_telepon" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-input" placeholder="email" name="email" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-input" placeholder="password" name="password" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Jenis kelamin</label>
                    <select name="jenis_kelamin" id="gender" required>
                        <option value="">Pilih jenis kelamin</option>
                        <option value="P">Perempuan</option>
                        <option value="L">Laki-laki</option>
                    </select>
                </div>
                <button type="submit" class="submit-btn" >Simpan</button>
            </form>
        </div>

        <div class="bottom-nav">
            <div class="nav-items">
                <div class="nav-item active" onclick="showMain()">
                    <div class="nav-icon"><i class="bi bi-house-fill"></i></div>
                    <div class="nav-label">Home</div>
                </div>
                <div class="nav-item" onclick="showReport()">
                    <div class="nav-icon"><i class="bi bi-graph-up"></i></div>
                    <div class="nav-label">History</div>
                </div>
                <div class="nav-item" onclick="showActivity()">
                    <div class="nav-icon"><i class="bi bi-plus-circle-fill"></i></div>
                    <div class="nav-label">Gluscan</div>
                </div>
                <div class="nav-item" onclick="showTransfer()">
                    <div class="nav-icon"><i class="bi bi-capsule-pill"></i></div>
                    <div class="nav-label">Drug</div>
                </div>
                <div class="nav-item" onclick="showSettings()">
                    <div class="nav-icon"><i class="bi bi-gear-fill"></i></div>
                    <div class="nav-label">Settings</div>
                </div>
            </div>
        </div>
    </div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@1.4.0"></script>
<script>
    const reportData = <?= json_encode($reportData); ?>;
    let reportChart;

    function renderReportChart(period = 'week') {
        const data = reportData[period] || { lowest: 0, average: 0, highest: 0 };
        const ctx = document.getElementById('reportChart').getContext('2d');
        if (reportChart) reportChart.destroy();
        reportChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Lowest', 'Average', 'Highest'],
                datasets: [{
                    label: 'Nilai',
                    data: [data.lowest, data.average, data.highest],
                    backgroundColor: 'rgba(33, 150, 243, 0.2)',
                    borderColor: '#2196F3',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    pointRadius: 6,
                    pointBackgroundColor: '#2196F3'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    annotation: {
                        annotations: {
                            safeZone: {
                                type: 'box',
                                yMin: 0,
                                yMax: 200,
                                xMin: 0,
                                xMax: 4,
                                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                                borderWidth: 0
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        suggestedMax: 300,
                        ticks: {
                            stepSize: 100
                        },
                        grid: {
                            color: '#ccc',
                            borderDash: [4, 4]
                        }
                    }
                }
            }
        });
    }

    renderReportChart('week');

    window.setReportFilter = function(period, button) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        if (button) button.classList.add('active');
        renderReportChart(period);
    };
</script>
    <script src="js/main.js"></script>
</body>
</html>