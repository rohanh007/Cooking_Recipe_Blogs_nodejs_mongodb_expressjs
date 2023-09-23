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

