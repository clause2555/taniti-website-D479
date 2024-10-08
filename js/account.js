// Written by Aidan Jones

// account.js

document.addEventListener('DOMContentLoaded', () => {
    const accountInfoDiv = document.getElementById('account-info');

    // Function to check if user is logged in
    function getCurrentUser() {
        return localStorage.getItem('currentUser');
    }

    const userEmail = getCurrentUser();

    if (userEmail) {
        const storedUser = localStorage.getItem(`user_${userEmail}`);
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            // Display user information
            let bookingsHTML = '';
            if (userData.bookings.length > 0) {
                bookingsHTML = `
                    <ul>
                        ${userData.bookings.map(booking => `
                            <li class="booking-item" data-booking-id"${booking.id}">
                                    <strong>Type:</strong> ${booking.type} <br>
                                    <strong>Name:</strong> ${booking.name} <br>
                                    ${booking.date ? `<strong>Date:</strong> ${booking.date} <br>` : ''}
                                    ${booking.startDate && booking.endDate ? `<strong>Start Date:</strong> ${booking.startDate} <br>
                                    <strong>End Date:</strong> ${booking.endDate} <br>` : ''}
                                    <p><strong>Booked On:</strong> ${new Date(booking.timestamp).toLocaleString()}</p>
                                    <button class="btn cancel-booking" data-booking-id="${booking.id}">Cancel Booking</button>
                                </li>
                        `).join('')}
                    </ul>
                `;
            } else {
                bookingsHTML = '<p>No bookings yet.</p>';
            }

            const userHTML = `
                <p><strong>Email:</strong> ${userData.email}</p>
                <h3>Your Bookings:</h3>
                <div id="bookings">
                    ${bookingsHTML}
                </div>
            `;
            accountInfoDiv.innerHTML = userHTML;
        } else {
            accountInfoDiv.innerHTML = '<p>User data not found.</p>';
        }
    } else {
        accountInfoDiv.innerHTML = '<p>No user is logged in. Please <a href="login.html">login</a>.</p>';
    }

    //Function to update bookings without reloading the page
    window.updateAccountPage = function() {
        const userEmail = getCurrentUser();
        if (userEmail) {
            const storedUser = localStorage.getItem(`user_${userEmail}`);
            if (storedUser) {
                const userData = JSON.parse(storedUser);
                let bookingsHTML = '';
                if (userData.bookings.length > 0) {
                    bookingsHTML = `
                        <ul>
                            ${userData.bookings.map(booking => `
                                <li class="booking-item" data-booking-id"${booking.id}">
                                    <strong>Type:</strong> ${booking.type} <br>
                                    <strong>Name:</strong> ${booking.name} <br>
                                    ${booking.date ? `<strong>Date:</strong> ${booking.date} <br>` : ''}
                                    ${booking.startDate && booking.endDate ? `<strong>Start Date:</strong> ${booking.startDate} <br>
                                    <strong>End Date:</strong> ${booking.endDate} <br>` : ''}
                                    <p><strong>Booked On:</strong> ${new Date(booking.timestamp).toLocaleString()}</p>
                                    <button class="btn cancel-booking" data-booking-id="${booking.id}">Cancel Booking</button>
                                </li>
                            `).join('')}
                        </ul>
                    `;
                } else {
                    bookingsHTML = '<p>No bookings yet.</p>';
                }

                const userHTML = `
                    <p><strong>Email:</strong> ${userData.email}</p>
                    <h3>Your Bookings:</h3>
                    <div id="bookings">
                        ${bookingsHTML}
                    </div>
                `;
                accountInfoDiv.innerHTML = userHTML;
            } else {
                accountInfoDiv.innerHTML = '<p>User data not found.</p>';
            }
        } else {
            accountInfoDiv.innerHTML = '<p>No user is logged in. Please <a href="login.html">login</a>.</p>';
        }
    };
});
