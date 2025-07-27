<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GluScan - Mobile Health App</title>
    <link rel="stylesheet" href="./css/login.css">
</head>
<body>
    <div class="login-container">
        <div class="login-header">
            <div class="login-logo"><img src="./public/images/gluscan.png" alt="" srcset=""></div>
            <h1 class="brand-title">GluScan</h1>
            <p class="brand-subtitle">Know your numbers. Rule your day</p>
        </div>

        <form class="login-form" action="php/auth/auth.php" method="post">
            <div class="form-group">
                <label for="email">Email or Phone</label>
                <div class="input-wrapper">
                    <input type="text" id="email" name="email" required>
                </div>
            </div>
            
            <div class="form-group">
                <label for="password">Password</label>
                <div class="input-wrapper">
                    <input type="password" id="password" name="password" required>
                </div>
            </div>
            
            <a href="#" class="forgot-link">Forget Password?</a>
            <button type="submit" class="login-btn">Log in</button>
        </form>

        <div class="signup-section">
            <p class="signup-text">Don't have an account? <a href="reg.php">Sign Up</a></p>

            <div class="social-login">
                <span>Sign Up With</span>
                <div class="social-icons">
                    <div class="social-icon apple">🍎</div>
                    <div class="social-icon google">G</div>
                    <div class="social-icon facebook">f</div>
                    <div class="social-icon twitter">𝕏</div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>