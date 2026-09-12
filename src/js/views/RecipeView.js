import View from './View.js';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'No pudimos cargar esta receta. Prueba con otra.';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(event => window.addEventListener(event, handler));
  }

  _generateMarkup() {
    const recipe = this._data;
    return `
      <article class="recipe-card">
        <figure class="recipe-hero">
          <img class="recipe-hero__img" src="${recipe.image}" alt="${recipe.title}" />
          <div class="recipe-hero__shade"></div>
          <span class="recipe-hero__label">POSTRE SELECCIONADO</span>
          <figcaption class="recipe-hero__title">
            <span>RECETA / ${recipe.id.slice(-5).toUpperCase()}</span>
            <h2>${recipe.title}</h2>
            <p>Publicado por ${recipe.publisher}</p>
          </figcaption>
        </figure>

        <div class="recipe-meta">
          <div class="meta-item"><span>◷</span><div><small>TIEMPO</small><strong>${recipe.cookTime} min</strong></div></div>
          <div class="meta-item"><span>♙</span><div><small>PORCIONES</small><strong>${recipe.servings} personas</strong></div></div>
          <a class="source-btn" href="${recipe.sourceUrl}" target="_blank" rel="noopener">Ver receta original ↗</a>
        </div>

        <section class="ingredients-section">
          <div class="section-heading">
            <p class="eyebrow">ANTES DE ENCENDER EL HORNO</p>
            <h3>Ten todos los ingredientes a mano.</h3>
            <p>Ingredientes claros y cantidades tomadas directamente de la receta original.</p>
          </div>
          <ul class="ingredients-grid">
            ${recipe.ingredients.map(ingredient => `
              <li class="ingredient">
                <span class="ingredient__check">✓</span>
                <div>
                  <strong>${ingredient.quantity ?? ''} ${ingredient.unit ?? ''}</strong>
                  <span>${ingredient.description}</span>
                </div>
              </li>`).join('')}
          </ul>
        </section>
      </article>`;
  }
}

export default new RecipeView();
