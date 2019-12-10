import Search from './model/Search';
import Recipe from './model/Recipe';
import List from './model/List';
import Likes from './model/Like';


import * as searchView from "./view/searchView";
import * as recipeView from "./view/recipeView";
import * as listView from "./view/listView";
import * as likesView from "./view/likesView";

import { elements, renderLoader, clearLoader } from './view/base';
import Like from './model/Like';


// import * as likesView from './view/likesView';

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
        recipeView.clearRecipe();
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
    console.log(e);
    console.log(e.target);
    // console.log(btn.dataset);
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
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // 2.0.1 highlight selected search item
        if (state.search) searchView.highlightSelected(id);

        // 2.1 new recipe obj and add to state
        state.recipe = new Recipe(id);

        try{
            // 3. get the recipe data (by await)
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // 4. calculate everything and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // 5. render the result on UI
            clearLoader();
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id),
            );

        } catch (error) {
            console.log(error);
            alert('Error processing recipe!');
            clearLoader();
        }
    }

}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));






/** 
 * ------------------------------------------------------------------
 * LIST CONTROLLER
 * ------------------------------------------------------------------
 */
const controlList = () => {
    // Create a new list IF there in none yet
    if (!state.list) state.list = new List();

    // Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
};


// Handle delete and update list item events
elements.shopping.addEventListener('click', el => {
    // Get the id of item
    const id = el.target.closest('.shopping__item').dataset.itemid;  //确保每次点击能得到 ID

    // Handle the Delete button
    if (el.target.matches('.shopping__delete, .shopping__delete *')){
        // Delete from state
        state.list.deleteItem(id);

        // Delete from UI
        listView.deleteItem(id);
    } 
    // Handle the update
    else if (el.target.matches('.shopping__count-value')){
        const val = parseFloat(el.target.value, 10);
        state.list.updateCount(id, val);
    }
});




/** 
 * ------------------------------------------------------------------
 * LIKE CONTROLLER
 * ------------------------------------------------------------------
 */
const controlLike = () => {
    // Create a new likes IF there is NO likes
    if(!state.likes) state.likes = new Likes();
    const curID = state.recipe.id;

    // Two conditions
    if (!state.likes.isLiked(curID)){
        // Add item into state
        const newLike = state.likes.addLike(
            curID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        )

        // Toggle the icon
        likesView.toggleLikeBtn(true);

        // Add the item into the UI
        // state.likes.likes.forEach(el => likesView.renderLike(el));
        likesView.renderLike(newLike);
        console.log(state.likes);
    }

    else {
        // Delete the item in the state
        state.likes.deleteLike(curID);

        // Toggle the icon
        likesView.toggleLikeBtn(false);

        // Delete the item from the UI
        likesView.deleteLike(curID);

    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
}



// Reload the likes into like
window.addEventListener('load', () => {
    state.likes = new Likes();
    
    state.likes.readStorage();

    // Toggle the like icon in the recipe
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render the exist thing 
    state.likes.likes.forEach(el => likesView.renderLike(el));

})



// --------------------------------------------------------------------------------
//serving controller
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } 
    else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } 
    else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // Add ingredients to shopping list
        console.log(`controlList()`);
        controlList();
    }
    else if (e.target.matches('.recipe__love, .recipe__love *')){
        // Like Controller
        controlLike();
    }

});

catName("Chloe");
function catName(name) {
    // this.a = 1;
    console.log("我的猫名叫 " + name);
    console.log(typeof this);
    console.log(this);
};




function identify() {
	return this.name.toUpperCase();
}

function speak() {
	var greeting = "Hello, I'm " + identify.call( this );
    console.log( greeting );
    console.log( this );
}

var me = {
	name: "Kyle"
};

var you = {
	name: "Reader"
};

identify.call( me ); // KYLE
identify.call( you ); // READER

speak.call( me ); // Hello, I'm KYLE
speak.call( you ); // Hello, I'm READER