import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

const normalizeRecipe = recipe => ({
  id: recipe.id,
  title: recipe.title,
  publisher: recipe.publisher,
  sourceUrl: recipe.source_url,
  image: recipe.image_url,
  servings: recipe.servings,
  cookTime: recipe.cooking_time,
  ingredients: recipe.ingredients,
});

export const loadRecipe = async id => {
  const data = await getJSON(`${API_URL}/${id}`);
  state.recipe = normalizeRecipe(data.data.recipe);
};

export const loadSearchResults = async query => {
  state.search.query = query;
  const data = await getJSON(`${API_URL}?search=${encodeURIComponent(query)}`);
  state.search.results = data.data.recipes.map(recipe => ({
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    image: recipe.image_url,
  }));
  state.search.page = 1;
};

export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};
