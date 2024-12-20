import * as model from './model.js';
import recipeView from './view/recipeVie.js';
import SearchView from './view/searchView.js';
import ResultView from './view/resultView.js';
import PaginationView from './view/paginationView.js';
import BookMarksView from './view/bookmarksView.js';
// import addNewRecipeView from './view/addNewRecipeView.js';


import 'core-js/stable';
import 'regenerator-runtime/runtime';
import paginationView from './view/paginationView.js';
import bookmarksView from './view/bookmarksView.js';

// if(module.hot){
//   module.hot.accept();
// }
// const addRecipe = document.querySelector('add-recipe-window');
// console.log(addRecipe);


///////////////////////////////////////
const controlRecipe = async function(){
  try{
    // 0) Get Search Query
    const id = window.location.hash.slice(1);
    if(!id) return;
    
    // 1) Render spinner
    recipeView.renderSpinner();

    // 2) Update results view to marks selected search result
    ResultView.update(model.getSearchResultsPage());
    
    // 3) Updating bookMarks View
    BookMarksView.update(model.state.bookmarks);
    
    // 4) Loading Recipes
    await model.loadRecipe(id);
    
    // 5) Rendering Recipes
    recipeView.render(model.state.recipe);
    
    }catch(err){
      recipeView.renderError();
      console.error(err);
    }
  }

////////////////////////////////  
const controlSearchResult = async function(){
  try{
    ///// 
    ResultView.renderSpinner();

    // 1) Get search query
    const query = SearchView.getQuery();
    SearchView._clearInput();
    if(!query) return;
    
    // 2) Load search results
    await model.loadSearchResult(query);
    
    // 3)
    ResultView.render(model.getSearchResultsPage());

    // 4) Render New Pagination buttons
    PaginationView.render(model.state.search);
   
  }catch(err){
    console.log(err);
  }
}

///////////////
const controlPagination = function(goToPage){
 // 1) Render New results
    ResultView.render(model.getSearchResultsPage(goToPage));

    // 2) Render New Pagination buttons
    PaginationView.render(model.state.search);
}

////////////////////////
const controlServings = function(newServings){
  // Update the recipe servings(in state)
   model.updateServings(newServings)

  // Update the recipe Viewv
    // recipeView.render(model.state.recipe);
    recipeView.update(model.state.recipe);

}

///////////////////
const controlAddBookMark = function(){
  if(!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.deleteBookMark(model.state.recipe.id);

  // 2) Update recipe View
  recipeView.update(model.state.recipe);

  // 3) Render Bookmarks
  BookMarksView.render(model.state.bookmarks);
}

////////////////////////
const controlBookMarks = function(){
  bookmarksView.render(model.state.bookmarks);
}

////////////////
const init = function(){
  bookmarksView.addHandlerRender(controlBookMarks);
  SearchView.addHandlerSearch(controlSearchResult);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookMark(controlAddBookMark);
  paginationView.addHandlerClick(controlPagination);
}
init();

