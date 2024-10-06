// Hamburger Menu Toggle
// mobile edit 
// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    // Existing Hamburger Menu Toggle Code
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) { // Ensure elements exist
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    } else {
        console.error('Hamburger or Nav Menu not found in the DOM.');
    }

    // Toggle between Login and Register forms
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
                        // Redirect to account page
                        window.location.href = 'account.html';
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

    // update nav account link per login status
    function updateAccountLink() {
        const navAccount = document.getElementById('nav-account');
        const currentUser = localStorage.getItem('currentUser');

        if (navAccount) {
            if (currentUser) {
                navAccount.href = 'account.html';
                navAccount.textContent = 'My Account';
            } else {
                navAccount.href = 'login.html';
                navAccount.textContent = 'Account';
            }
        }
    }

    // Call the function to update the link on page load
    updateAccountLink();
});

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slider img');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Function to show the previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Initialize Slider
showSlide(currentSlide);
setInterval(nextSlide, 5000); // Change slide every 5 seconds

// Activities Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const activityItems = document.querySelectorAll('.activity-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to the clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        activityItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});


