import * as model from './model.js';
import { DEFAULT_QUERY } from './config.js';
import recipeView from './views/RecipeView.js';
import searchView from './views/SearchView.js';
import resultsView from './views/ResultsView.js';
import paginationView from './views/PaginationView.js';

const controlRecipes = async () => {
  const id = window.location.hash.slice(1);
  if (!id) return;
  try {
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
    if (model.state.search.results.length) {
      resultsView.render(model.getSearchResultsPage());
    }
  } catch (error) {
    recipeView.renderError(error.message);
  }
};

const controlSearchResults = async (queryOverride = '') => {
  try {
    resultsView.renderSpinner();
    const query = queryOverride || searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);

    if (!window.location.hash && model.state.search.results[0]) {
      window.location.hash = model.state.search.results[0].id;
    }
  } catch (error) {
    resultsView.renderError(error.message);
  }
};

const controlPagination = page => {
  resultsView.render(model.getSearchResultsPage(page));
  paginationView.render(model.state.search);
  document.querySelector('.results-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  controlSearchResults(DEFAULT_QUERY);
};

init();
