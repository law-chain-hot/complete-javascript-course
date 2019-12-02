import { elements } from "./base";

export const getInput = () => {
    // it would automatically return the only line
    return elements.searchInput.value; 
};

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearRes = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};


const limitRecipeTitle = (title, limit = 17) =>{
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        // return the result
        return `${newTitle.join(' ')} ...`;
    }
    return title;
};

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li> 
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup); 
};

const creatButton = (page, type) => {
    const newPage = type === 'prev' ? page - 1 : page + 1;
    const direction = type === 'prev' ? 'left' : 'right';
    let markup = `
        <button class="btn-inline results__btn--${type}" data-goto=${newPage} >
            <span>Page ${newPage}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${direction}"></use>
            </svg>
        </button>
    `;
    return markup;
}


export const renderButton = (page, numTotal, perPage) => {
    const pagesTotal = Math.ceil(numTotal/perPage);
    let button;
    
    if (page === 1 && pagesTotal > 1){
        // only right
        button = creatButton (page, 'next');
    }
    else if (page < pagesTotal) {
        // both
        button = creatButton (page, 'prev');
        button += creatButton (page, 'next');
    }
    else if (page === pagesTotal && pagesTotal > 1) {
        // only left
        button = creatButton (page, 'prev');
    }

    //insert into HTML
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page=2, perPage=10) => {
    // render results of currente page
    const start = (page - 1) * perPage;
    const end = page * perPage;

    recipes.slice(start, end).forEach(renderRecipe);

    //render pagination buttons
    renderButton(page, recipes.length, perPage);
};