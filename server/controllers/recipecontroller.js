
require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');


/**
 * GET/
 * homepage
*/

exports.homepage= async(req, res)=>{
    try{
        const limitnumber = 5;
        const categories =await Category.find({}).limit(limitnumber);
        const latest= await Recipe.find({}).sort({__id:-1}).limit(limitnumber);
        const indian =await Recipe.find({'category': 'Indian'}).limit(limitnumber);
        const thai =await Recipe.find({'category': 'Thai'}).limit(limitnumber);
        const american =await Recipe.find({'category': 'American'}).limit(limitnumber);
        const chinese =await Recipe.find({'category': 'Chinese'}).limit(limitnumber); 
        const food ={latest ,indian , thai ,american , chinese};
        
        res.render('index', {title:'Cooking Blogs', categories, food})

    }catch(error){
        res.status(500).send({message : error.message || "Error occured"})

    }

}

/**
 * GET/categories 
 * Categories
*/
exports.explorecategories = async(req, res)=>{
    try{
        const limitnumber = 20;
        const categories =await Category.find({}).limit(limitnumber);
        res.render('categories', {title:'Cooking Blogs-view all', categories})

    }catch(error){
        res.status(500).send({message : error.message || "Error occured"})

    } 

}

/**
 * GET/recipe
 * Recipes
*/
exports.exploreRecipe = async(req, res)=>{
    try{
         const recipeId =req.params.id;

         const recipe= await Recipe.findById(recipeId);
        res.render('recipe', {title:'Cooking Blogs-Recipe',recipe});

    }catch(error){
        res.status(500).send({message : error.message || "Error occured"})

    } 

}

/**
 * GET/categories/:id 
 * Categories/id
*/
exports.explorecategoriesById = async(req, res)=>{
    try{
        let categoryId =req.params.id;

        const limitnumber = 20;
        const categoryById =await Recipe.find({'category' :'categoryId'}).limit(limitnumber);
        res.render('categories', {title:'Cooking Blogs-view all', categoryById})

    }catch(error){
        res.status(500).send({message : error.message || "Error occured"})

    } 

}

exports.searchrecipe = async(req, res)=>{
     //searchTerm
     try{
     let searchTerm =req.body.searchTerm;
     let recipe =await Recipe.find({ $text :{$search : searchTerm , $diacriticSensitive:true}})
     res.render('search', {title:'Cooking Blogs-Search', recipe })
     }catch(error){
        res.status(500).send({message : error.message || "Error occured"})

    } 

}


exports.exploreLatest = async(req, res)=>{
    try{
        const limitnumber = 20;
        const recipe= await Recipe.find({}).sort({__id:-1}).limit(limitnumber);
        res.render('explore-latest', {title:'Cooking Blogs-Recipe',recipe});

    }catch(error){
        res.status(500).send({message : error.message || "Error occured"})

    } 

}


exports.explorerandom  = async(req, res)=>{
    try{
        let count =await Recipe.find().countDocuments();
        let random =Math.floor(Math.random()* count);
        let recipe =await Recipe.findOne().skip(random).exec();
        res.render('random-recipe', {title:'Cooking Blogs-Recipe',recipe});

    }catch(error){
        res.status(500).send({message : error.message || "Error occured"})

    } 

}


// submit route
exports.submitRecipe  = async(req, res)=>{

    res.render('submit-recipe', {title:'Cooking Blogs-Recipe'});

}


// postmethod submit recipe

exports.submitRecipeOnpost = async(req, res)=>{

    res.redirect('submit-recipe');
}



// async function insertDymmyRecipeData(){
//   try {
//     await Recipe.insertMany([
//       { 
//         "name": "Recipe Name Goes Here",
//         "description": `Recipe Description Goes Here`,
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Indian", 
//         "image": "southern-friend-chicken.jpg"
//       },
//       { 
//         "name": "Recipe Name Goes Here",
//         "description": `Recipe Description Goes Here`,
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "American", 
//         "image": "southern-friend-chicken.jpg"
//       },
//     ]);

//   } catch (error) {
//     console.log('err', + error)
//   }
// }

// insertDymmyRecipeData();


// async function insertDymmyCategoryData(){
//       try {
//         await Category.insertMany([
//           {
//             "name": "Thai",
//             "image": "thai-food.jpg"
//           },
//           {
//             "name": "American",
//             "image": "american-food.jpg"
//           }, 
//           {
//             "name": "Chinese",
//             "image": "chinese-food.jpg"
//           },
//           {
//             "name": "Mexican",
//             "image": "mexican-food.jpg"
//           }, 
//           {
//             "name": "Indian",
//             "image": "indian-food.jpg"
//           },
//           {
//             "name": "Spanish",
//             "image": "spanish-food.jpg"
//           }
//         ]);
//         console.log("done");
//       } catch (error) {
//         console.log('err',+error)
//       }
//     }
    
// insertDymmyCategoryData();
    