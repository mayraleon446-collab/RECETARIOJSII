import { TIMEOUT_SEC } from './config.js';
const timeout = s => new Promise((_, reject) => setTimeout(() => reject(new Error(`La petición tardó más de ${s} segundos.`)), s * 1000));
export const getJSON = async url => {
  const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
  const data = await res.json();
  if (!res.ok) throw new Error(`${data.message || 'No se pudo cargar la receta'} (${res.status})`);
  return data;
};
