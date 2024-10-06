// cancelBooking.js

document.addEventListener('DOMContentLoaded', () => {
    // Function to create the cancellation modal
    function createCancellationModal() {
        // Check if modal already exists to prevent duplicates
        if (document.getElementById('cancellation-modal')) return;

        // Create modal container
        const modal = document.createElement('div');
        modal.id = 'cancellation-modal';
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
        modalTitle.id = 'cancellation-modal-title';
        modalTitle.textContent = 'Confirm Cancellation';

        // Cancellation message
        const cancellationMessage = document.createElement('p');
        cancellationMessage.textContent = 'Cancelled bookings cannot be recovered. If you cancel by mistake, the booking will need to be rebooked subject to availability.';

        // Confirm cancellation button
        const confirmButton = document.createElement('button');
        confirmButton.type = 'button';
        confirmButton.classList.add('btn', 'confirm-cancellation');
        confirmButton.textContent = 'Confirm Cancellation';

        // Assemble modal content
        modalContent.appendChild(closeButton);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(cancellationMessage);
        modalContent.appendChild(confirmButton);

        // Assemble modal
        modal.appendChild(modalContent);

        // Append modal to body
        document.body.appendChild(modal);

        // Accessibility Enhancements
        modal.setAttribute('aria-hidden', 'true');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', 'cancellation-modal-title');

        // Event listener to close modal when clicking the close button
        closeButton.addEventListener('click', closeCancellationModal);

        // Event listener to close modal when clicking outside the modal content
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeCancellationModal();
            }
        });
    }

    // Function to open the cancellation modal
    function openCancellationModal(bookingId) {
        createCancellationModal(); // Ensure modal exists

        const modal = document.getElementById('cancellation-modal');
        const confirmButton = modal.querySelector('.confirm-cancellation');

        // Store the bookingId in the confirm button's dataset for reference
        confirmButton.dataset.bookingId = bookingId;

        // Display the modal
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');

        // Trap focus within modal
        const focusableElements = modal.querySelectorAll('a[href], button, textarea, input, select');
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        function handleKeyDown(e) {
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

        document.addEventListener('keydown', handleKeyDown);

        // Store the handler to remove it later
        modal.handleKeyDown = handleKeyDown;

        // Attach confirm cancellation listener
        attachConfirmCancellationListener();

        // Focus the confirm button for accessibility
        confirmButton.focus();
    }

    // Function to close the cancellation modal
    function closeCancellationModal() {
        const modal = document.getElementById('cancellation-modal');
        if (modal) {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');

            // Remove the keydown event listener
            if (modal.handleKeyDown) {
                document.removeEventListener('keydown', modal.handleKeyDown);
                delete modal.handleKeyDown;
            }
        }
    }

    // Event listener for "Cancel Booking" buttons
    function attachCancelBookingListeners() {
        const cancelButtons = document.querySelectorAll('.cancel-booking');
        cancelButtons.forEach(button => {
            button.addEventListener('click', () => {
                const bookingId = button.dataset.bookingId;
                if (bookingId) {
                    openCancellationModal(bookingId);
                } else {
                    console.error('Booking ID not found for cancellation.');
                }
            });
        });
    }

    // Event listener for "Confirm Cancellation" button within the modal
    function attachConfirmCancellationListener() {
        const modal = document.getElementById('cancellation-modal');
        if (modal) {
            const confirmButton = modal.querySelector('.confirm-cancellation');
            confirmButton.addEventListener('click', () => {
                const bookingId = confirmButton.dataset.bookingId;
                if (bookingId) {
                    cancelBooking(bookingId);
                    closeCancellationModal();
                } else {
                    console.error('Booking ID not found for confirmation.');
                }
            });
        }
    }

    // Function to cancel the booking
    function cancelBooking(bookingId) {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const storedUser = localStorage.getItem(`user_${currentUser}`);
            if (storedUser) {
                const userData = JSON.parse(storedUser);
                const bookingIndex = userData.bookings.findIndex(b => b.id === bookingId);
                if (bookingIndex !== -1) {
                    // Remove the booking from the array
                    userData.bookings.splice(bookingIndex, 1);
                    // Update localStorage
                    localStorage.setItem(`user_${currentUser}`, JSON.stringify(userData));
                    alert('Booking has been successfully canceled.');
                    // Refresh the bookings display
                    if (typeof updateAccountPage === 'function') {
                        updateAccountPage();
                    }
                } else {
                    alert('Booking not found.');
                }
            } else {
                alert('User data not found.');
            }
        } else {
            alert('No user is currently logged in.');
        }
    }

    // Initialize cancellation functionality
    attachCancelBookingListeners();
    attachConfirmCancellationListener();
});
