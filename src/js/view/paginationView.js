import View from './view.js';
import icons from '../../img/icons.svg';

class PaginationView extends View{
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler){  
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--inline');
            if(!btn) return;
            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        })
    }

    _generateMarkup(){
        const currentPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        // Page 1, and there are other pages
        if(currentPage === 1 && numPages > 1){
            return this._nextPage(currentPage);
        }
        
        //Last Pages
       if(currentPage === numPages && numPages > 1){
        return this._backPage(currentPage);
    }
    
    // Other Pages
    if(currentPage < numPages){
        return `${this._backPage(currentPage)}
        ${this._nextPage(currentPage)}`;
    }

    //Page 1,and there are No other pages
    return '';
    }

    _backPage(pageNO){
        return `
        <button data-goto="${pageNO - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${pageNO - 1}</span>
          </button>
          `;
    }

    _nextPage(pageNO){
          return `<button data-goto="${pageNO + 1}"class="btn--inline pagination__btn--next">
            <span>Page ${pageNO + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          `
    }
}

export default new PaginationView();