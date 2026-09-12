import View from './View.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No se encontraron recetas para esta búsqueda.';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    const active = window.location.hash.slice(1) === result.id;
    return `
      <a class="preview ${active ? 'preview--active' : ''}" href="#${result.id}">
        <img src="${result.image}" alt="${result.title}" />
        <div class="preview__text">
          <h3>${result.title}</h3>
          <p>${result.publisher}</p>
        </div>
        <span class="preview__arrow">→</span>
      </a>`;
  }
}

export default new ResultsView();
