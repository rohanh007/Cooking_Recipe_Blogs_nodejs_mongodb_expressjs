const express=require('express')

const router =express.Router();
const recipecontroller=require('../controllers/recipecontroller');


router.get('/',recipecontroller.homepage);
router.get('/categories',recipecontroller.explorecategories);
router.get('/categories/:id',recipecontroller.explorecategoriesById);
router.get('/recipe/:id', recipecontroller.exploreRecipe);
router.post('/search',recipecontroller.searchrecipe);
router.get('/explore-latest',recipecontroller.exploreLatest);
router.get('/random-recipe',recipecontroller.explorerandom);
router.get('/submit-recipe',recipecontroller.submitRecipe);
router.post('/submit-recipe',recipecontroller.submitRecipeOnpost);
router.get('/about',recipecontroller.aboutus);
router.get('/contact',recipecontroller.contactus);
router.post('/contact',recipecontroller.contactuspost);
 router.post('/updaterecipe/:id',recipecontroller.updaterecipeput);
router.get('/updaterecipe/:id',recipecontroller.updaterecipe);
// router.put('/updaterecipe/:id',recipecontroller.updateingredient);
router.delete('/delete/:id',recipecontroller.deleterecipe);
// router.get('/delete',recipecontroller.deletepage);


 
module.exports =router;   