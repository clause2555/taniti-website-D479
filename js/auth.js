// Written by Aidan Jones

// auth.js

document.addEventListener('DOMContentLoaded', () => {
    // Toggle between Login and Register forms (on login.html)
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const loginSection = document.querySelector('.login-section');
    const registerSection = document.querySelector('.register-section');

    if (showRegister && showLogin && loginSection && registerSection) {
        showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginSection.style.display = 'none';
            registerSection.style.display = 'block';
        });

        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            registerSection.style.display = 'none';
            loginSection.style.display = 'block';
        });
    }

    // Handle Registration
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value.trim();

            if (email && password) {
                // Check if user already exists
                if (localStorage.getItem(`user_${email}`)) {
                    alert('Account already exists. Please log in.');
                } else {
                    // Store user credentials in localStorage
                    const userData = {
                        email: email,
                        password: password,
                        bookings: [] // Initialize empty bookings array
                    };
                    localStorage.setItem(`user_${email}`, JSON.stringify(userData));
                    alert('Account created successfully! Please log in.');
                    // Switch to login form
                    registerSection.style.display = 'none';
                    loginSection.style.display = 'block';
                    registerForm.reset();
                }
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Handle Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            if (email && password) {
                const storedUser = localStorage.getItem(`user_${email}`);
                if (storedUser) {
                    const userData = JSON.parse(storedUser);
                    if (userData.password === password) {
                        // Successful login
                        alert('Login successful!');
                        // Set currentUser in localStorage
                        localStorage.setItem('currentUser', email);
                        // Check for redirect parameter
                        const urlParams = new URLSearchParams(window.location.search);
                        const redirectURL = urlParams.get('redirect');
                        if (redirectURL) {
                            window.location.href = decodeURIComponent(redirectURL);
                        } else {
                            // Redirect to account page
                            window.location.href = 'account.html';
                        }
                    } else {
                        alert('Incorrect password.');
                    }
                } else {
                    alert('Account does not exist. Please register.');
                }
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Handle Logout on Account Page
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Remove currentUser from localStorage
            localStorage.removeItem('currentUser');
            // Redirect to login page
            window.location.href = 'login.html';
        });
    }
});
