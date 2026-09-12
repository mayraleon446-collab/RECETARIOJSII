export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner-wrap">
        <span class="spinner"></span>
        <p>Cocinando los detalles...</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage || 'Algo salió mal. Intenta nuevamente.') {
    const markup = `
      <div class="message">
        <span class="message__icon">⚠</span>
        <h2>No encontramos lo que buscabas</h2>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
