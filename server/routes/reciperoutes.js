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

module.exports =router;