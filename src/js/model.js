
import {async} from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helper';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE,
    },
    bookmarks: [],
};

export const loadRecipe = async function(id){
    try{
     const data = await getJSON(`${API_URL}${id}`);
    let {recipe} = data.data;     
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.sourceUrl,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime:  recipe.cooking_time,
      ingredients: recipe.ingredients
    };
    if(state.bookmarks.some(bookmark => bookmark.id === id)) state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    }catch(err){
        // console.error(`${err} `);
        throw err;
    }
}

export const loadSearchResult = async function(query){
   try{
    state.search.query = query;
    state.search.page = 1;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(rec => {
         return {
             id: rec.id,
             title: rec.title,
             publisher: rec.publisher,
             image: rec.image_url,   
            }
        })
    }catch(err){
    console.error(err);
    throw err;
   }
}

export const getSearchResultsPage = function(page = state.search.page){
    state.search.page = page;

    const start =  (page - 1) * state.search.resultsPerPage;    //0;
    const end =    page * state.search.resultsPerPage;;    //10;
    return state.search.results.slice(start, end);
}

export const updateServings = function(newServings){
    console.log(state.recipe);
    state.recipe.ingredients.forEach(ing => { 
        ing.quantity = (ing.quantity * newServings)/state.recipe.servings;
        // NewQt = OldQt * newServings/oldServings // 2*8/4 = 4
    });

    state.recipe.servings = newServings;
}

const persistBookMark = function(){
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}


export const addBookMark = function(recipe){
    // Add bookmark
   state.bookmarks.push(recipe);
   
   // Mark current recipe as bookmark
   if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;

   persistBookMark();
}


export const deleteBookMark = function(id){
    //Delete book mark
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index, 1);

    
   // Mark current recipe as not bookmark
   if(id === state.recipe.id) state.recipe.bookmarked = false;

   persistBookMark();
}

const init = function(){
   const storage = localStorage.getItem('bookmarks');
   if(storage) state.bookmarks = JSON.parse(storage);
}
init();

const clearBooks = function(){
    localStorage.clear('bookmarks');
}
// clearBooks();