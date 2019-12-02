import Search from './model/Search';
import * as searchView from "./view/searchView";
import { elements, renderLoader, clearLoader } from './view/base'
import Recipe from './model/Recipe';

/** Global state of the app
 *  - Search object
 *  - Current obj
 *  - Shopping list obj
 *  - Liked reciped
 */
const state = {};


/**
 * ---------------------------------------------------------------
 * Search Controller
 * ---------------------------------------------------------------
 */
const controlSearch = async () => {
    // 1. get the query from view
    const query = searchView.getInput(); //TODO
    console.log(query);
     
    if (query) {
        // 2. new search obj and add to state
        state.search = new Search(query);

        // 3. prepare UI for results
        searchView.clearInput();
        searchView.clearRes();
        renderLoader(elements.searchRes);

        try {
            // 4. search for recipes
            await state.search.getResult();  //每个async func 会自动返回一个 promise

            // 5. render the result on UI
            console.log(state.search.result);
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (error) {
            alert('Error processing search!');
            clearLoader();
        }
     
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); //阻止点了button后，页面reload
    controlSearch();
});

// event delegation
elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    console.log(btn.dataset);
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10); // ????????!!!!!!   dataset, 10
        searchView.clearRes();
        searchView.renderResults(state.search.result, goToPage);
    }
});



/**
 * ---------------------------------------------------------------
 * Recipe Controller
 * ---------------------------------------------------------------
 */
const controlRecipe = async () => {
    // 1. get the id from 'hashchange', from URL
    const id = window.location.hash.replace('#', '');

    if (id){
        // 2.0 prepare UI for results (like loader)

        // 2.1 new recipe obj and add to state
        state.recipe = new Recipe(id);

        try{
            // 3. get the recipe data (by await)
            await state.recipe.getRecipe();

            // 4. calculate everything and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // 5. render the result on UI
            console.log(state.recipe);
            
        } catch (error) {
            console.log(error);
            alert('Error processing recipe!');
        }

    }

}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// const test = new Recipe(47746);
// // console.log(test);
// test.getRecipe();
// console.log(test)