import View from './View.js';
class ResultsView extends View{_parentElement=document.querySelector('.results');_errorMessage='No encontramos postres para esa búsqueda.';_generateMarkup(){return this._data.map(r=>`<a class="preview" href="#${r.id}"><img src="${r.image}" alt="${r.title}"><div><h4>${r.title}</h4><p>${r.publisher}</p></div></a>`).join('');}} export default new ResultsView();
