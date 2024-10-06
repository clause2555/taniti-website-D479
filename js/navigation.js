// navigation.js

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
});
