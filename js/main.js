        // Data simulasi
        let currentBalance = 2235114.50;
        let transactions = [];

        // Transfer functionality
        document.getElementById('transferForm').addEventListener('submit', function(e) {
            e.preventDefault();
        
            const accountNumber = document.getElementById('accountNumber').value;
            const amount = parseFloat(document.getElementById('transferAmount').value);
            const note = document.getElementById('transferNote').value;
            const recipientName = document.getElementById('recipientName').value;
        
            if (!accountNumber || amount <= 0 || recipientName === '' || recipientName === 'Rekening tidak ditemukan') {
                alert('Mohon lengkapi data transfer dengan benar.');
                return;
            }
        
            const formData = new FormData();
            formData.append('rekening_tujuan', accountNumber);
            formData.append('jumlah', amount);
            formData.append('catatan', note);
        
            fetch('php/handler/transaksi/proses_transaksi.php', {
                method: 'POST',
                body: formData
            })
            .then(res => res.text())
            .then(response => {
                if (response.includes('BERHASIL')) {
                    // Update tampilan sukses
                    document.getElementById('successAmount').textContent = `Rp ${amount.toLocaleString('id-ID')}`;
                    document.getElementById('transactionDate').textContent = new Date().toLocaleString('id-ID');
                    document.getElementById('successRecipient').textContent = recipientName;
                    document.getElementById('successAlias').textContent = recipientName;
                    document.getElementById('successAccount').textContent = accountNumber;
                    document.getElementById('successSender').textContent = currentUserName;
                    document.getElementById('successNote').textContent = note || "-";
                    document.getElementById('successTransaksi').textContent = "#" + Math.floor(Math.random() * 10000000000);
                    document.getElementById('successRef').textContent = Math.floor(100000000000 + Math.random() * 900000000000);

                    transactions.unshift({
                        type: 'transfer',
                        amount: -amount,
                        recipient: recipientName,
                        date: new Date().toLocaleString('id-ID'),
                        note: note
                    });
                
                    showSuccess();
                } else {
                    alert('Gagal transfer: ' + response);
                }
            })
            .catch(err => {
                console.error(err);
                alert('Terjadi kesalahan saat mengirim data.');
            });
        });

        // Auto-fill recipient name when account number is entered
        document.getElementById('accountNumber').addEventListener('input', function(e) {
            const accountNumber = e.target.value;
            const recipientName = document.getElementById('recipientName');
            
            if (accountNumber.length >= 10) {
                // Simulasi auto-fill nama
                recipientName.value = 'Kevin Hypershop';
            } else {
                recipientName.value = '';
            }
        });

        // Navigation functions
        function showMain() {
            hideAllScreens();
            document.getElementById('mainScreen').style.display = 'block';
            updateNavigation('main');
        }

        function showTransfer() {
            hideAllScreens();
            document.getElementById('transferScreen').style.display = 'block';
            updateNavigation('transfer');
        }

        function showSuccess() {
            hideAllScreens();
            document.getElementById('successScreen').style.display = 'block';
        }

        function showActivity() {
            hideAllScreens();
            document.getElementById('activityScreen').style.display = 'block';
            updateNavigation('activity');
        }

        function showReport() {
            hideAllScreens();
            document.getElementById('reportScreen').style.display = 'block';
            updateNavigation('report');
            updateReportData();
        }

        function showSettings() {
            hideAllScreens();
            document.getElementById('settingsScreen').style.display = 'block';
            updateNavigation('settings');
        }

        function showEdit() {
            hideAllScreens();
            document.getElementById('editScreen').style.display = 'block';
            updateNavigation('settings');
        }

        function hideAllScreens() {
            const screens = [ 'mainScreen', 'transferScreen', 'successScreen', 'activityScreen', 'reportScreen', 'settingsScreen', 'editScreen'];
            screens.forEach(screen => {
                document.getElementById(screen).style.display = 'none';
            });
        }

        function updateNavigation(active) {
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => item.classList.remove('active'));
            
            // Add active class based on current screen
            if (active === 'main') {
                navItems[0].classList.add('active');
            } else if (active === 'report') {
                navItems[1].classList.add('active');
            } else if (active === 'activity') {
                navItems[2].classList.add('active');
            } else if (active === 'transfer') {
                navItems[3].classList.add('active');
            } else if (active === 'settings') {
                navItems[4].classList.add('active');
            }
        }

        function updateBalanceDisplay() {
            document.getElementById('balanceAmount').textContent = `Rp ${currentBalance.toLocaleString('id-ID')}`;
        }

        // Add click handlers for navigation
        document.querySelectorAll('.nav-item').forEach((item, index) => {
            item.addEventListener('click', function() {
                switch(index) {
                    case 0: showMain(); break;
                    case 1: showReport(); break;
                    case 2: showActivity(); break;
                    case 3: showTransfer(); break;
                    case 4: showSettings(); break;
                    default: break;
                }
            });
        });

        /* Report functions */
        function updateReportData(period = 'week') {
            const data = reportData[period];
            const totalIncome = data.income || 0;
            const totalExpense = data.expense || 0;
            const netBalance = totalIncome - totalExpense;
            const days = period === 'week' ? 7 : (period === 'month' ? 30 : 365);
            const dailyAverage = netBalance / days;
        
            document.getElementById('totalIncome').textContent = `+Rp ${totalIncome.toLocaleString('id-ID')}`;
            document.getElementById('totalExpense').textContent = `-Rp ${totalExpense.toLocaleString('id-ID')}`;
            document.getElementById('netBalance').textContent = `${netBalance >= 0 ? '+' : '-'}Rp ${Math.abs(netBalance).toLocaleString('id-ID')}`;
            document.getElementById('dailyAverage').textContent = `Rp ${Math.round(dailyAverage).toLocaleString('id-ID')}`;
        }

        function setReportFilter(period, button) {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            if (button) button.classList.add('active');
        
            const data = reportData[period] || { income: 0, expense: 0 };
            const totalIncome = data.income;
            const totalExpense = data.expense;
        
            const netBalance = totalIncome - totalExpense;
            const days = period === 'week' ? 7 : (period === 'month' ? 30 : 365);
            const dailyAverage = netBalance / days;
        
            document.getElementById('totalIncome').textContent = `+Rp ${totalIncome.toLocaleString('id-ID')}`;
            document.getElementById('totalExpense').textContent = `-Rp ${totalExpense.toLocaleString('id-ID')}`;
            document.getElementById('netBalance').textContent = `${netBalance >= 0 ? '+' : '-'}Rp ${Math.abs(netBalance).toLocaleString('id-ID')}`;
            document.getElementById('dailyAverage').textContent = `Rp ${Math.round(dailyAverage).toLocaleString('id-ID')}`;
        }

        // Settings functions
        function toggleSetting(settingName) {
            const toggle = document.getElementById(settingName + '-toggle');
            if (toggle) {
                toggle.classList.toggle('active');
                
                // Show feedback
                const settingItem = toggle.closest('.setting-item');
                const settingNameEl = settingItem.querySelector('.setting-name');
                const originalText = settingNameEl.textContent;
                
                if (toggle.classList.contains('active')) {
                    // settingNameEl.textContent = originalText + ' ✓';
                    setTimeout(() => {
                        settingNameEl.textContent = originalText;
                    }, 1500);
                }
            }
        }

async function refreshData() {
    const refreshBtn = document.getElementById('refreshBtn');
    
    // Tambahkan loading state
    refreshBtn.classList.add('loading');

    try {
        // Tambahkan jeda visual (opsional, agar animasi loading terlihat)
        await new Promise(resolve => setTimeout(resolve, 500));

        // Reload seluruh halaman
        window.location.reload();

    } catch (error) {
        console.error('Error saat me-refresh:', error);
        showNotification('Gagal memuat ulang halaman', 'error');
    } finally {

        refreshBtn.classList.remove('loading');
    }
}

async function refreshSaldo() {
    const response = await fetch('../php/handler/refresh/refresh.php'); // Ganti ke rekening dinamis
    const data = await response.json();

    if (data.saldo !== undefined) {
        const saldoElement = document.getElementById('saldo');
        if (saldoElement) {
            saldoElement.textContent = `Rp ${data.saldo.toLocaleString('id-ID')}`;
        }
    }

    if (data.user) {
        const userName = document.getElementById('userName');
        const userEmail = document.getElementById('userEmail');
        const userPhone = document.getElementById('userPhone');

        if (userName) userName.textContent = data.user.nama;
        if (userEmail) userEmail.textContent = data.user.email;
        if (userPhone) userPhone.textContent = data.user.telepon;
    }

    if (data.error) {
        showNotification(data.error, 'error');
    }
}

async function refreshUserData() {
    // Contoh: refresh data profil user
    const response = await fetch('/api/user/profile');
    const userData = await response.json();
    
    // Update tampilan data user jika diperlukan
    // Sesuaikan dengan struktur data dan element yang ada
}

// 6. Fungsi helper untuk menampilkan notifikasi (opsional)
function showNotification(message, type = 'info') {
    // Implementasi notifikasi sesuai dengan sistem yang Anda gunakan
    // Contoh sederhana:
    console.log(`${type.toUpperCase()}: ${message}`);
    
    // Atau bisa menggunakan alert, toast, atau sistem notifikasi lainnya
    // alert(message);
}
