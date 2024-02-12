const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.get('/recipes', async (req, res) => {
  try {
    const { ingredient, diet } = req.query;
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?${diet?`c=${diet}&`:''}i=${ingredient}`;
    const response = await axios.get(apiUrl);
    const recipes = response.data.meals;
    if (!recipes) {
      res.status(404).json({ message: 'No recipes found.' });
      return;
    }
    const formattedRecipes = recipes.map(recipe => ({
      title: recipe.strMeal,
      image: recipe.strMealThumb,
      ingredients: extractIngredients(recipe),
      instructions: recipe.strInstructions
    }));
    res.json(formattedRecipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


function extractIngredients(recipe) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && measure) {
      ingredients.push(`${ingredient} (${measure})`);
    } else if (ingredient) {
      ingredients.push(ingredient);
    } else {
      break;
    }
  }
  return ingredients;
}


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
