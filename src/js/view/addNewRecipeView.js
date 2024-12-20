import View from './view.js';

class addNewRecipeView extends View {
    _parentElement = document.querySelector('.upload');

    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-model');
    window = documnet.querySelector('.add-recipe-window');

    constructor(){
        super();
        console.log('Hello');
         this._addHandlerShowWindow();
         this._addHandlerHideWindow();
}
    toggleWindow(){
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    _addHandlerShowWindow(){
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    }

    _addHandlerHideWindow(){
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
        this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    }

    _generateMarkup(){}
}

export default new addNewRecipeView();

    