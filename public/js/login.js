const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnpopup = document.querySelector('.btnLogin-link');
const closepopup = document.querySelector('.icon-close');
const popupWrapper = document.querySelector('.popup-wrapper');
registerLink.addEventListener('click', () => {
    // When "Register" link is clicked, activate the registration form
    console.log('Register link clicked');
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    // When "Login" link is clicked, activate the login form
    wrapper.classList.remove('active');
});

btnpopup.addEventListener('click', () => {
    // When a button with the class "btnLogin-link" is clicked, activate the popup
    popupWrapper.style.display = 'block';
    wrapper.classList.add('active-popup');
});

closepopup.addEventListener('click', () => {
    // When the close icon is clicked, deactivate the popup
    popupWrapper.style.display = 'none';
    wrapper.classList.remove('active-popup');
});


