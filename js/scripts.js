// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) { // Ensure elements exist
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    } else {
        console.error('Hamburger or Nav Menu not found in the DOM.');
    }

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

    // Function to update the "Account" link based on login status
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

    // Hero Slider (Assuming you have a slider in your HTML)
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
    if (slides.length > 0) {
        showSlide(currentSlide);
        setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

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

    /// Booking Modal Logic
    // Function to create the booking modal dynamically
    function createBookingModal() {
        // Check if modal already exists to prevent duplicates
        if (document.getElementById('booking-modal')) return;

        // Create modal container
        const modal = document.createElement('div');
        modal.id = 'booking-modal';
        modal.classList.add('modal');

        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        // Close button
        const closeButton = document.createElement('span');
        closeButton.classList.add('close-button');
        closeButton.innerHTML = '&times;';

        // Modal title
        const modalTitle = document.createElement('h2');
        modalTitle.textContent = 'Book Your Selection';

        // Booking form
        const bookingForm = document.createElement('form');
        bookingForm.id = 'booking-form';

        // Hidden input to store booking type and name
        const bookingTypeInput = document.createElement('input');
        bookingTypeInput.type = 'hidden';
        bookingTypeInput.id = 'booking-type';
        bookingForm.appendChild(bookingTypeInput);

        const bookingNameInput = document.createElement('input');
        bookingNameInput.type = 'hidden';
        bookingNameInput.id = 'booking-name';
        bookingForm.appendChild(bookingNameInput);

        // Date selection
        const dateLabel = document.createElement('label');
        dateLabel.htmlFor = 'booking-date';
        dateLabel.textContent = 'Select Date:';

        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.id = 'booking-date';
        dateInput.required = true;

        // Confirm booking button
        const confirmButton = document.createElement('button');
        confirmButton.type = 'submit';
        confirmButton.classList.add('btn');
        confirmButton.textContent = 'Confirm Booking';

        // Disclaimer message
        const disclaimer = document.createElement('p');
        disclaimer.classList.add('modal-disclaimer');
        disclaimer.textContent = 'No payment due at time of booking, all payments collected upon arrival.';

        // Assemble form
        bookingForm.appendChild(dateLabel);
        bookingForm.appendChild(dateInput);
        bookingForm.appendChild(confirmButton);

        // Assemble modal content
        modalContent.appendChild(closeButton);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(bookingForm);
        modalContent.appendChild(disclaimer);

        // Assemble modal
        modal.appendChild(modalContent);

        // Append modal to body
        document.body.appendChild(modal);

        // Event listener to close modal when clicking the close button
        closeButton.addEventListener('click', closeBookingModal);

        // Event listener to close modal when clicking outside the modal content
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeBookingModal();
            }
        });

        // Attach the submit event listener to the booking form
        attachBookingFormListener();
    }

    // Function to open the booking modal with specific booking details
    function openBookingModal(type, name) {
        createBookingModal(); // Ensure modal exists

        const modal = document.getElementById('booking-modal');
        const bookingTypeInput = document.getElementById('booking-type');
        const bookingNameInput = document.getElementById('booking-name');
        const bookingDateInput = document.getElementById('booking-date');

        if (modal && bookingTypeInput && bookingNameInput && bookingDateInput) {
            // Set booking type and name
            bookingTypeInput.value = type;
            bookingNameInput.value = name;

            // Reset and set minimum date to today
            bookingDateInput.value = '';
            bookingDateInput.min = new Date().toISOString().split('T')[0];

            // Display the modal
            modal.style.display = 'block';

            // Set focus to the date input for better UX
            bookingDateInput.focus();

            console.log(`Opened booking modal for type=${type}, name=${name}`);
        }
    }

    // Function to close the booking modal
    function closeBookingModal() {
        const modal = document.getElementById('booking-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Event listener for "Book Now" buttons
    const bookNowButtons = document.querySelectorAll('.book-now');
    bookNowButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const currentUser = localStorage.getItem('currentUser');
            const bookingType = button.getAttribute('data-type');
            const bookingName = button.getAttribute('data-name');

            console.log(`Book Now clicked: type=${bookingType}, name=${bookingName}`);

            if (currentUser) {
                // User is logged in, open the booking modal
                openBookingModal(bookingType, bookingName);
            } else {
                // User is not logged in, redirect to login with redirect parameter
                const currentURL = window.location.href;
                const redirectURL = encodeURIComponent(currentURL);
                window.location.href = `login.html?redirect=${redirectURL}`;
            }
        });
    });

    // Function to attach the submit event listener to the booking form
    function attachBookingFormListener() {
        const bookingForm = document.getElementById('booking-form');
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const bookingDate = document.getElementById('booking-date').value;
                const bookingType = document.getElementById('booking-type').value;
                const bookingName = document.getElementById('booking-name').value;
                const currentUser = localStorage.getItem('currentUser');

                console.log(`Submitting booking: type=${bookingType}, name=${bookingName}, date=${bookingDate}`);

                if (bookingDate) {
                    const storedUser = localStorage.getItem(`user_${currentUser}`);
                    if (storedUser) {
                        const userData = JSON.parse(storedUser);

                        // Verify that bookings is an array
                        if (!Array.isArray(userData.bookings)) {
                            console.error('bookings is not an array:', userData.bookings);
                            userData.bookings = []; // Initialize as array if not already
                        }

                        // Create a booking object
                        const booking = {
                            type: bookingType,
                            name: bookingName,
                            date: bookingDate,
                            timestamp: new Date().toISOString()
                        };

                        // Check for duplicate booking (optional)
                        const isDuplicate = userData.bookings.some(b => 
                            b.type === booking.type && 
                            b.name === booking.name && 
                            b.date === booking.date
                        );

                        if (isDuplicate) {
                            alert('You have already booked this activity on the selected date.');
                            return;
                        }

                        // Add booking to user's bookings
                        userData.bookings.push(booking);
                        console.log('Updated bookings after push:', userData.bookings);

                        // Save updated user data
                        localStorage.setItem(`user_${currentUser}`, JSON.stringify(userData));
                        console.log(`User data updated for ${currentUser}`);

                        alert('Booking confirmed successfully!');
                        // Close the modal
                        closeBookingModal();
                        // Optionally, trigger a refresh or update bookings display
                        if (typeof updateAccountPage === 'function') {
                            updateAccountPage();
                        }
                    } else {
                        console.error('User data not found for:', currentUser);
                        alert('User data not found.');
                    }
                } else {
                    alert('Please select a date.');
                }
            });
        } else {
            console.error('Booking form not found.');
        }
    }
});
