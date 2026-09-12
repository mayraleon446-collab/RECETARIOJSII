import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', event => {
      const button = event.target.closest('[data-goto]');
      if (!button) return;
      handler(Number(button.dataset.goto));
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numberPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    if (numberPages <= 1) return '';

    const prev = currentPage > 1
      ? `<button class="pagination__btn" data-goto="${currentPage - 1}">← <span>Página ${currentPage - 1}</span></button>`
      : '<span></span>';
    const next = currentPage < numberPages
      ? `<button class="pagination__btn pagination__btn--next" data-goto="${currentPage + 1}"><span>Página ${currentPage + 1}</span> →</button>`
      : '<span></span>';

    return `${prev}<span class="pagination__status">${currentPage} / ${numberPages}</span>${next}`;
  }
}

export default new PaginationView();
