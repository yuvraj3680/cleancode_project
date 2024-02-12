document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const ingredientInput = document.getElementById('ingredient-input');
    const dietaryPreference = document.getElementById('dietary-preference');
    const recipeResults = document.getElementById('recipe-results');
  
    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const ingredient = ingredientInput.value.trim();
      const dietPreference = dietaryPreference.value.trim();
      if (!ingredient) {
        alert('Please enter an ingredient.');
        return;
      }
  
      try {
        const response = await fetch(`/recipes?ingredient=${ingredient}&diet=${dietPreference}`);
        const recipes = await response.json();
        displayRecipes(recipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        alert('An error occurred while fetching recipes. Please try again.');
      }
    });
  
    function displayRecipes(recipes) {
      recipeResults.innerHTML = ''; // Clear previous results
      if (recipes.length === 0) {
        recipeResults.innerHTML = '<p>No recipes found.</p>';
        return;
      }
      recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        
        const title = document.createElement('h2');
        title.textContent = recipe.title;
        recipeCard.appendChild(title);
        
        const image = document.createElement('img');
        image.src = recipe.image;
        recipeCard.appendChild(image);
        
        const ingredients = document.createElement('p');
        ingredients.textContent = `Ingredients: ${recipe.ingredients.join(', ')}`;
        recipeCard.appendChild(ingredients);
        
        const instructions = document.createElement('p');
        instructions.textContent = `Instructions: ${recipe.instructions}`;
        recipeCard.appendChild(instructions);
        
        recipeResults.appendChild(recipeCard);
      });
    }
  });
  