// bookingModal.js

document.addEventListener('DOMContentLoaded', () => {
    // Function to handle keydown events for focus trapping
    function handleKeyDown(e, firstFocusableElement, lastFocusableElement) {
        const isTabPressed = (e.key === 'Tab' || e.keyCode === 9);

        if (!isTabPressed) {
            return;
        }

        if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                e.preventDefault();
            }
        } else { // Tab
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                e.preventDefault();
            }
        }
    }

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
        modalTitle.id = 'modal-title'; 
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

        // Date selection for single-date bookings
        const singleDateLabel = document.createElement('label');
        singleDateLabel.htmlFor = 'booking-date';
        singleDateLabel.textContent = 'Select Date:';
        
        const singleDateInput = document.createElement('input');
        singleDateInput.type = 'date';
        singleDateInput.id = 'booking-date';
        singleDateInput.required = true;

        // Date range selection for date-range bookings
        const startDateLabel = document.createElement('label');
        startDateLabel.htmlFor = 'booking-start-date';
        startDateLabel.textContent = 'Start Date:';

        const startDateInput = document.createElement('input');
        startDateInput.type = 'date';
        startDateInput.id = 'booking-start-date';
        startDateInput.required = true;

        const endDateLabel = document.createElement('label');
        endDateLabel.htmlFor = 'booking-end-date';
        endDateLabel.textContent = 'End Date:';

        const endDateInput = document.createElement('input');
        endDateInput.type = 'date';
        endDateInput.id = 'booking-end-date';
        endDateInput.required = true;

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
        bookingForm.appendChild(bookingTypeInput);
        bookingForm.appendChild(bookingNameInput);
        bookingForm.appendChild(singleDateLabel);
        bookingForm.appendChild(singleDateInput);
        bookingForm.appendChild(startDateLabel);
        bookingForm.appendChild(startDateInput);
        bookingForm.appendChild(endDateLabel);
        bookingForm.appendChild(endDateInput);
        bookingForm.appendChild(confirmButton);

        // Initially hide date-range inputs
        startDateLabel.style.display = 'none';
        startDateInput.style.display = 'none';
        endDateLabel.style.display = 'none';
        endDateInput.style.display = 'none';

        // Assemble modal content
        modalContent.appendChild(closeButton);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(bookingForm);
        modalContent.appendChild(disclaimer);

        // Assemble modal
        modal.appendChild(modalContent);

        // Append modal to body
        document.body.appendChild(modal);

        // Accessibility Enhancements
        modal.setAttribute('aria-hidden', 'false');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', 'modal-title');

        // Trap focus within modal
        const focusableElements = modal.querySelectorAll('a[href], button, textarea, input, select');
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        // keydown even listener
        document.addEventListener('keydown', handleKeyDown);

        // set focus on first focousable element
        if (firstFocusableElement) {
            firstFocusableElement.focus();
        }

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
        const singleDateLabel = document.querySelector('label[for="booking-date"]');
        const singleDateInput = document.getElementById('booking-date');
        const startDateLabel = document.querySelector('label[for="booking-start-date"]');
        const startDateInput = document.getElementById('booking-start-date');
        const endDateLabel = document.querySelector('label[for="booking-end-date"]');
        const endDateInput = document.getElementById('booking-end-date');
    
        if (modal && bookingTypeInput && bookingNameInput && singleDateLabel && singleDateInput && startDateLabel && startDateInput && endDateLabel && endDateInput) {
            // Set booking type and name
            bookingTypeInput.value = type;
            bookingNameInput.value = name;
    
            // Reset date inputs
            singleDateInput.value = '';
            startDateInput.value = '';
            endDateInput.value = '';
            singleDateInput.min = new Date().toISOString().split('T')[0];
            startDateInput.min = new Date().toISOString().split('T')[0];
            endDateInput.min = new Date().toISOString().split('T')[0];
    
            // Determine if the booking type requires a date range
            const dateRangeTypes = ['Accommodation', 'Car-Rental']; // Add other types as needed
    
            if (dateRangeTypes.includes(type)) {
                // Show date-range inputs
                singleDateLabel.style.display = 'none';
                singleDateInput.style.display = 'none';
                startDateLabel.style.display = 'block';
                startDateInput.style.display = 'block';
                endDateLabel.style.display = 'block';
                endDateInput.style.display = 'block';
            
                // Manage 'disabled' attributes
                singleDateInput.disabled = true;
                startDateInput.disabled = false;
                endDateInput.disabled = false;
            
                // Initialize Flatpickr for date range
                flatpickr("#booking-start-date", {
                    dateFormat: "Y-m-d",
                    minDate: "today",
                    onChange: function(selectedDates, dateStr, instance) {
                        // Update end date's minDate based on selected start date
                        if (selectedDates.length > 0) {
                            endDateInput._flatpickr.set('minDate', dateStr);
                        }
                    }
                });
            
                flatpickr("#booking-end-date", {
                    dateFormat: "Y-m-d",
                    minDate: "today"
                });
            } else {
                // Show single-date input
                singleDateLabel.style.display = 'block';
                singleDateInput.style.display = 'block';
                startDateLabel.style.display = 'none';
                startDateInput.style.display = 'none';
                endDateLabel.style.display = 'none';
                endDateInput.style.display = 'none';
            
                // Manage 'disabled' attributes
                singleDateInput.disabled = false;
                startDateInput.disabled = true;
                endDateInput.disabled = true;
            
                // Initialize Flatpickr for single date
                flatpickr("#booking-date", {
                    dateFormat: "Y-m-d",
                    minDate: "today"
                });
            }
            
    
            // Display the modal
            modal.style.display = 'block';
    
            // Set focus to the appropriate date input for better UX
            if (dateRangeTypes.includes(type)) {
                startDateInput.focus();
            } else {
                singleDateInput.focus();
            }
    
            console.log(`Opened booking modal for type=${type}, name=${name}`);
        }
    }
    
    // Function to close the booking modal
    function closeBookingModal() {
        const modal = document.getElementById('booking-modal');
        if (modal) {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');

            // Remove the keydown event listener to prevent mem leaks
            document.removeEventListener('keydown', handleKeyDown);
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
                const bookingType = document.getElementById('booking-type').value;
                const bookingName = document.getElementById('booking-name').value;
                const currentUser = localStorage.getItem('currentUser');

                console.log(`Submitting booking: type=${bookingType}, name=${bookingName}`);

                if (bookingType && bookingName) {
                    const storedUser = localStorage.getItem(`user_${currentUser}`);
                    if (storedUser) {
                        const userData = JSON.parse(storedUser);

                        // Verify that bookings is an array
                        if (!Array.isArray(userData.bookings)) {
                            console.error('bookings is not an array:', userData.bookings);
                            userData.bookings = []; // Initialize as array if not already
                        }

                        // Determine if the booking requires a date range
                        const dateRangeTypes = ['Accommodation', 'Car Rental']; // Must match the array in openBookingModal

                        let booking = {
                            type: bookingType,
                            name: bookingName,
                            timestamp: new Date().toISOString()
                        };

                        if (dateRangeTypes.includes(bookingType)) {
                            // Booking requires a date range
                            const startDate = document.getElementById('booking-start-date').value;
                            const endDate = document.getElementById('booking-end-date').value;

                            if (startDate && endDate) {
                                // Validate that endDate is after startDate
                                if (new Date(endDate) < new Date(startDate)) {
                                    alert('End date cannot be earlier than start date.');
                                    return;
                                }

                                booking.startDate = startDate;
                                booking.endDate = endDate;
                            } else {
                                alert('Please select both start and end dates.');
                                return;
                            }
                        } else {
                            // Single-date booking
                            const date = document.getElementById('booking-date').value;
                            if (date) {
                                booking.date = date;
                            } else {
                                alert('Please select a date.');
                                return;
                            }
                        }

                        // Check for duplicate booking (optional)
                        const isDuplicate = userData.bookings.some(b => 
                            b.type === booking.type && 
                            b.name === booking.name && 
                            (
                                (b.date && b.date === booking.date) ||
                                (b.startDate && b.startDate === booking.startDate && b.endDate === booking.endDate)
                            )
                        );

                        if (isDuplicate) {
                            alert('You have already booked this activity on the selected date(s).');
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
                    alert('Invalid booking data.');
                }
            });
        } else {
            console.error('Booking form not found.');
        }
    }
});
