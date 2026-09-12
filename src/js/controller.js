const recipeContainer = document.querySelector('.recipe');

// En Avance 1 todavía no se implementa la búsqueda del usuario.
// Para mantener la temática de postres, primero buscamos "cake" en la API
// y usamos el primer resultado para cargar el detalle de una receta.
const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes';

const renderSpinner = parentEl => {
  const markup = `
    <div class="spinner-wrap">
      <div class="spinner"></div>
      <p>Preparando algo dulce…</p>
    </div>`;

  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
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

const renderRecipe = recipe => {
  const markup = `
    <article class="recipe-card">
      <figure class="recipe-hero">
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe-hero__img" />
        <div class="recipe-hero__shade"></div>
        <div class="recipe-hero__label">POSTRE DEL DÍA</div>
        <div class="recipe-hero__title">
          <span>RECETA / ${recipe.id.slice(-5).toUpperCase()}</span>
          <h2>${recipe.title}</h2>
          <p>Publicado por ${recipe.publisher}</p>
        </div>
      </figure>

      <div class="recipe-meta">
        <div class="meta-item">
          <span class="meta-item__icon">⏱</span>
          <div><small>TIEMPO</small><strong>${recipe.cookTime} min</strong></div>
        </div>
        <div class="meta-item">
          <span class="meta-item__icon">♙</span>
          <div><small>PORCIONES</small><strong>${recipe.servings} personas</strong></div>
        </div>
        <a class="source-btn" href="${recipe.sourceUrl}" target="_blank" rel="noreferrer">Ver receta original ↗</a>
      </div>

      <section class="ingredients-section">
        <div class="section-heading">
          <span class="eyebrow">ANTES DE ENCENDER EL HORNO</span>
          <h3>Ten todos los ingredientes a mano.</h3>
          <p>Los datos se muestran dinámicamente a partir de la respuesta de la API.</p>
        </div>

        <ul class="ingredients-grid">
          ${recipe.ingredients
            .map(
              ing => `
                <li class="ingredient">
                  <span class="ingredient__check">✓</span>
                  <div>
                    <strong>${ing.quantity ?? ''} ${ing.unit ?? ''}</strong>
                    <span>${ing.description}</span>
                  </div>
                </li>`
            )
            .join('')}
        </ul>
      </section>
    </article>`;

  recipeContainer.innerHTML = '';
  recipeContainer.insertAdjacentHTML('afterbegin', markup);
};

const renderError = message => {
  recipeContainer.innerHTML = `
    <div class="message message--error">
      <div class="message__icon">🍪</div>
      <h2>No pudimos cargar la receta</h2>
      <p>${message}</p>
    </div>`;
};

const fallbackRecipe = {
  id: 'demo-chocolate-cake',
  title: 'Pastel de chocolate clásico',
  publisher: 'Forkify Postres · modo demostración',
  sourceUrl: 'https://forkify-api.herokuapp.com/',
  image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1400&q=80',
  servings: 8,
  cookTime: 55,
  ingredients: [
    { quantity: 2, unit: 'tazas', description: 'harina de trigo' },
    { quantity: 1.5, unit: 'tazas', description: 'azúcar' },
    { quantity: 0.75, unit: 'taza', description: 'cacao en polvo' },
    { quantity: 2, unit: '', description: 'huevos' },
    { quantity: 1, unit: 'taza', description: 'leche' },
    { quantity: 0.5, unit: 'taza', description: 'aceite vegetal' },
  ],
};

const showRecipe = async () => {
  try {
    renderSpinner(recipeContainer);

    // 1) Buscamos una receta de pastel para que el proyecto conserve la temática de postres.
    const searchResp = await fetch(`${API_URL}?search=cake`);
    if (!searchResp.ok) throw new Error(`Error ${searchResp.status} al consultar la API.`);
    const searchData = await searchResp.json();

    const firstRecipe = searchData?.data?.recipes?.[0];
    if (!firstRecipe?.id) throw new Error('La API no devolvió recetas de pastel.');

    // 2) Cargamos el detalle de la receta seleccionada.
    const resp = await fetch(`${API_URL}/${firstRecipe.id}`);
    if (!resp.ok) throw new Error(`Error ${resp.status} al cargar la receta.`);
    const data = await resp.json();

    const recipe = normalizeRecipe(data.data.recipe);
    console.log('Respuesta de la API:', resp);
    console.log('Datos recibidos:', data);
    console.log('Receta normalizada:', recipe);

    renderRecipe(recipe);
  } catch (err) {
    console.error(err);
    // El fallback permite que el avance pueda revisarse visualmente aunque la API no esté disponible.
    renderRecipe(fallbackRecipe);
  }
};

showRecipe();
