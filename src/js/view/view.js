import icons from '../../img/icons.svg';

export default class View {
    _data;
    render(data, render = true){

        if(!data  || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        const markups = this._generateMarkup();

        if(!render) return markups;
        
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markups);        
    }

    update(data){
        // if(!data  || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        const newMarkup = this._generateMarkup();
        
        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newELements = Array.from(newDOM.querySelectorAll('*'));
        const currElements = Array.from(this._parentElement.querySelectorAll('*'));

        newELements.forEach((newEl, i) => {
          const curEl = currElements[i];
          // Update Changed Text
          if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ''){
            curEl.textContent = newEl.textContent;
          }

          // Update Changed Attrubutes
          if(!newEl.isEqualNode(curEl)){
            Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
          }
        })
    }
    _clear(){
        this._parentElement.innerHTML = '';
    }

    renderSpinner(){
      const markup = `
      <div class="spinner">
      <svg>
      <use href="${icons}#icon-loader"></use>
      </svg>
      </div>`
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    
    renderError(message = this._errorMessage){
       const markup = `<div class="error">
            <div>
              <svg>
                <use href="src/img/${icons}.svg_icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);          
    }

    renderSuccesMessage(message = this._message){
       const markup = `<div class="message">
            <div>
              <svg>
                <use href="src/img/${icons}.svg_icon-alert-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);          
    }
}
