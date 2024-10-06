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
            const userHTML = `
                <p><strong>Email:</strong> ${userData.email}</p>
                <h3>Your Bookings:</h3>
                <div id="bookings">
                    ${userData.bookings.length > 0 ? 
                        `<ul>
                            ${userData.bookings.map(booking => `<li>${booking}</li>`).join('')}
                        </ul>` : 
                        '<p>No bookings yet.</p>'
                    }
                </div>
            `;
            accountInfoDiv.innerHTML = userHTML;
        } else {
            accountInfoDiv.innerHTML = '<p>User data not found.</p>';
        }
    } else {
        accountInfoDiv.innerHTML = '<p>No user is logged in. Please <a href="login.html">login</a>.</p>';
    }
});
