import { API_URL } from './config.js';
import { getJSON } from './helpers.js';
export const state = { recipe: {} };
export const loadRecipe = async id => {
  const data = await getJSON(`${API_URL}/${id}`);
  const r = data.data.recipe;
  state.recipe = {id:r.id,title:r.title,publisher:r.publisher,sourceUrl:r.source_url,image:r.image_url,servings:r.servings,cookTime:r.cooking_time,ingredients:r.ingredients};
};
export const loadDessertStarter = async () => {
  const data = await getJSON(`${API_URL}?search=cake`);
  const id = data.data.recipes?.[0]?.id;
  if (!id) throw new Error('No se encontró una receta de postre.');
  return id;
};
