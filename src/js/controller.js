import * as model from './model.js';import recipeView from './views/RecipeView.js';import searchView from './views/SearchView.js';import resultsView from './views/ResultsView.js';
const controlRecipes=async()=>{const id=window.location.hash.slice(1);if(!id)return;try{recipeView.renderSpinner();await model.loadRecipe(id);recipeView.render(model.state.recipe);}catch(e){recipeView.renderError(e.message);}};
const controlSearchResults=async()=>{try{const q=searchView.getQuery();if(!q)return;resultsView.renderSpinner();await model.loadSearchResults(q);resultsView.render(model.state.search.results);}catch(e){resultsView.renderError(e.message);}};
const init=()=>{recipeView.addHandlerRender(controlRecipes);searchView.addHandlerSearch(controlSearchResults);};init();
