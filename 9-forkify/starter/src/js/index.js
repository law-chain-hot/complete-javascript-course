import Search from './model/Search';
import * as searchView from "./view/searchView";
import { elements } from './view/base'

/** Global state of the app
 *  - Search object
 *  - Current obj
 *  - Shopping list obj
 *  - Liked reciped
 */
const state = {};

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

        // 4. search for recipes
        await state.search.getResult();  //每个async func 会自动返回一个 promise

        // 5. render the result on UI
        console.log(state.search.result);
        searchView.renderResults(state.search.result);
        
    }
    
}

elements.searchForm .addEventListener('submit', e => {
    e.preventDefault(); //阻止点了button后，页面reload
    controlSearch();
});





// const search = new Search('pizza');
// console.log(search);
// let test = search.getResult()
// console.log(search);
// console.log(test);