import { API_URL } from './config.js'; import { getJSON } from './helpers.js';
export const state={recipe:{},search:{query:'',results:[]}};
export const loadRecipe=async id=>{const d=await getJSON(`${API_URL}/${id}`),r=d.data.recipe;state.recipe={id:r.id,title:r.title,publisher:r.publisher,sourceUrl:r.source_url,image:r.image_url,servings:r.servings,cookTime:r.cooking_time,ingredients:r.ingredients};};
export const loadSearchResults=async query=>{state.search.query=query;const d=await getJSON(`${API_URL}?search=${encodeURIComponent(query)}`);state.search.results=d.data.recipes.map(r=>({id:r.id,title:r.title,publisher:r.publisher,image:r.image_url}));};
