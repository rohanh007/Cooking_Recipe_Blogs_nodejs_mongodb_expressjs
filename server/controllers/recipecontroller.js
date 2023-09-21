
require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const usercontact =require('../models/usercontact');

/**
 * GET/
 * homepage
*/

exports.homepage= async(req, res)=>{
    try{
        const limitnumber = 5;
        const categories =await Category.find({}).limit(limitnumber);
        const latest= await Recipe.find({}).sort({_id:-1}).limit(limitnumber);
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
        res.render('categories', {title:'Cooking Blogs-Categories', categories})

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
        const categoryById =await Recipe.find({'category' :categoryId}).limit(limitnumber);
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
        const recipe= await Recipe.find({}).sort({_id:-1}).limit(limitnumber);
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
    const infoErrorsObj =req.flash('infoErrors');
    const infoSubmitsObj =req.flash('infoSubmit');
    res.render('submit-recipe', {title:'Cooking Blogs-Recipe', infoErrorsObj , infoSubmitsObj });

}


// postmethod submit recipe
exports.submitRecipeOnpost = async(req, res) => {
    try {
  
      let imageUploadFile;
      let uploadPath;
      let newImageName;
  
      if(!req.files || Object.keys(req.files).length === 0){
        console.log('No Files where uploaded.');
      } else {
  
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;
  
        uploadPath = require('path').resolve('./') + '/public/upload/' + newImageName;
  
        imageUploadFile.mv(uploadPath, function(err){
          if(err) return res.status(500).send(err);
        })
  
      }
      
  
      const newRecipe = new Recipe({
        name: req.body.name,
        description: req.body.description,
        email: req.body.email,
        ingredients: req.body.ingredients,
        category: req.body.category,
        image: newImageName
      });
      
      await newRecipe.save();
  
      req.flash('infoSubmit', 'Recipe has been added.')
      res.redirect('/submit-recipe');
    } catch (error) {
      // res.json(error);
      req.flash('infoErrors', error);
      res.redirect('/submit-recipe');
    }
  }
  
// About Section 


  exports.aboutus = async(req, res)=>{
     res.render('about', {title:'Cooking Blogs-About' });
}
  
// contact us open page

exports.contactus = async(req, res)=>{
 
    const infoErrorsObj =req.flash('infoErrors');
    const infoSubmitsObj =req.flash('infoSubmit');
    res.render('contact', {title:'Cooking Blogs-Contact',infoErrorsObj ,infoSubmitsObj});

}
// user contact storage into data base 


exports.contactuspost =async(req,res) =>{
    // if (!req.body.name || !req.body.email) {
    //     // Redirect back to the contact form with an error message
    //     res.redirect('/contact');
    // }
    try{
    const newcontact = new usercontact({
        message: req.body.message,
        name: req.body.name,
        email: req.body.email,
    });
     await newcontact.save(); 
    //  res.render('contact', {title:'Cooking Blogs-Contact'});
   }catch(error){
    res.status(500).send({message : error.message || "Error occured"})
   }
    
}

// update recipe    ..
exports.updaterecipe = async (req, res) => {
    const id = req.params.id; // Assuming you are using the _id field to identify the recipe
  
    Recipe.findById(id) // Use findById to find the recipe by its _id
      .then(result => {
        if (!result) {
          // Handle the case where the recipe is not found
          return res.status(404).send('Recipe not found');
        }
  
        // Render the template and pass the result data to it
        res.render('updaterecipe', { update: result, title: 'Cooking Blogs-Update' });
      })
      .catch(err => {
        console.log(err);
        // Handle any errors that occur during database query
        res.status(500).send('Internal Server Error');
      });
  };

 
  exports.updaterecipeput = async (req, res) => {
    try {
      const recipeId = req.params.id; // Get the recipe ID from the URL parameter
  
      // Get the updated data from the form submission
      const { name, email, description, ingredients, category } = req.body;
      const {  index } = req.params;
        const updatedIngredient = req.body.ingredient;
    
        // Find the recipe by ID
        const recipe = await Recipe.findById(recipeId);
    
        if (!recipe) {
          return res.status(404).send('Recipe not found');
        }
    
        // Update the specific ingredient in the array
        recipe.ingredients[index] = updatedIngredient;
    
        // Save the updated recipe
        await recipe.save();
  
      // Update the recipe in the database using findOneAndUpdate
      const updatedRecipe = await Recipe.findOneAndUpdate(
        { _id: recipeId },
        {
          name,
          email,
          description,
          ingredients, // This should be an array of ingredients
          category,
        },
        { new: true } // Return the updated recipe
      );
  
      if (!updatedRecipe) {
        return res.status(404).send('Recipe not found');
      }
  
      // Redirect to the recipe details page or any other appropriate page
      res.redirect(`/recipe/${recipeId}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  

//   exports.updateingredient =async(req,res)=>{

//     try {
//         const { _id, index } = req.params;
//         const updatedIngredient = req.body.ingredient;
    
//         // Find the recipe by ID
//         const recipe = await Recipe.findById(_id);
    
//         if (!recipe) {
//           return res.status(404).send('Recipe not found');
//         }
    
//         // Update the specific ingredient in the array
//         recipe.ingredients[index] = updatedIngredient;
    
//         // Save the updated recipe
//         await recipe.save();
    
//         res.status(200).send('Ingredient updated successfully');
//       } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//       }
//   }


// delete recipe

exports.deleterecipe = async (req, res) => {
    try {
        const recipeId = req.params.id;

        // Find the recipe by ID and remove it from the database
        const deletedRecipe = await Recipe.findByIdAndRemove(recipeId);

        if (!deletedRecipe) {
            return res.status(404).send('Recipe not found');
        }

        // Redirect to a success page or another appropriate page
        // Redirect to a recipes listing page, for exampl
        console.log("hello data are deleted ")
        res.render('delete', {title:'Cooking Blogs-Contact'});

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// exports.deletepage =async (req,res)=>{
//     console.log("data delete")

//     res.render('delete', {title:'Cooking Blogs-delete'});
// }


  
  
  // Delete Recipe
  // async function deleteRecipe(){
  //   try {
  //     await Recipe.deleteOne({ name: 'New Recipe From Form' });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // deleteRecipe();

