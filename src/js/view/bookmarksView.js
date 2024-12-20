import View from './view.js';
import PreviewView from './previewView.js';
import icons from '../../img/icons.svg';

class BookMarksView extends View{
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmark yet. Find a nice recipe and bookmark it ';
    _message = '';

    addHandlerRender(handler){
        window.addEventListener('load', handler);
    }
    _generateMarkup(){
        return this._data.map(bookMark => PreviewView.render(bookMark, false)).join('');
    }
}

export default new BookMarksView();