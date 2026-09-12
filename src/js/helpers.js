import { TIMEOUT_SEC } from './config.js';

const timeout = seconds =>
  new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`La solicitud tardó más de ${seconds} segundos.`)), seconds * 1000);
  });

export const getJSON = async url => {
  const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || `Error ${response.status}`);
  return data;
};
