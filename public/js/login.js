
document.addEventListener("DOMContentLoaded", function() {
    function updateUserDisplayName(userName) {
        const userNameDisplay = document.getElementById('userNameDisplay');

        if (userNameDisplay) {
            userNameDisplay.textContent = userName || 'Login';
        }
    }

    function handlePopupAndLogin() {
        // Handle the popup (replace with your popup logic)
        openLoginPopup();

        // Simulate a successful login (replace with actual login logic)
        const user = {
            name: "John", // Replace with the user's name or null if not logged in
        };

        // Check if user is logged in and update the display
        if (user && user.name) {
            updateUserDisplayName(user.name);
        }
    }

    // You can also add a logout functionality using a similar approach
    function handleLogoutClick() {
        // Clear user data and update the display
        updateUserDisplayName(null); // Show "Login"
    }
});