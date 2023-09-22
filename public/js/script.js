let addIngredientsBtn = document.getElementById('addIngredientsBtn');
let ingredientList = document.querySelector('.ingredientList');
let ingredeintDiv = document.querySelectorAll('.ingredeintDiv')[0];

// addIngredientsBtn.addEventListener('click', function(){
//   let newIngredients = ingredeintDiv.cloneNode(true);
//   let input = newIngredients.getElementsByTagName('input')[0];
//   input.value = '';
//   ingredientList.appendChild(newIngredients);
// });



// JavaScript code to handle adding and removing ingredients
// const addIngredientsBtn = document.getElementById('addIngredientsBtn');
// const ingredientList = document.querySelector('.ingredientList');
// JavaScript code to handle adding and removing ingredients
addIngredientsBtn.addEventListener('click', function() {
    const newIngredientDiv = document.createElement('div');
    newIngredientDiv.classList.add('ingredientDiv', 'mb-1');

    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'ingredients[]'; // Use array notation for multiple ingredients
    input.className = 'form-control';

    const removeIngredientLink = document.createElement('a');
    removeIngredientLink.href = '#';
    removeIngredientLink.className = 'removeIngredientLink';
    removeIngredientLink.textContent = 'Remove';

    newIngredientDiv.appendChild(input);
    newIngredientDiv.appendChild(removeIngredientLink);

    ingredientList.appendChild(newIngredientDiv);
});

// Handle removing ingredients
ingredientList.addEventListener('click', function(event) {
    if (event.target.classList.contains('removeIngredientLink')) {
        const ingredientDiv = event.target.parentElement;
        ingredientList.removeChild(ingredientDiv);
    }
});




// Function to open the login popup
// function openLoginPopup() {
//     var popup = document.getElementById('loginPopup');
//     var card = document.getElementById('loginCard');
//     popup.style.display = 'block';
//     card.style.display = 'block'; 
    
//   }
  
  // Function to close the login popup
  function closeLoginPopup() {
    var popup = document.getElementById('loginPopup');
    var card = document.getElementById('loginCard');
    popup.style.display = 'none';
    card.style.display = 'none'; 


    
  }
  var loginLink = document.querySelector('.login-link');
  loginLink.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    openLoginPopup(); // Open the login popup
  })



  
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
  


  // Automatically show the popup after 5 seconds (5000 milliseconds)
  setTimeout(openLoginPopup, 5000); // Adjust the time as needed


  
