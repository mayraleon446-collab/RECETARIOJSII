class SearchView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const field = this._parentElement.querySelector('.search__field');
    const query = field.value.trim();
    field.value = '';
    return query;
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', event => {
      event.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
