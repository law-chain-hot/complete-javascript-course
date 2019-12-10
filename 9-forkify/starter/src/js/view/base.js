export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResList: document.querySelector('.results__list'),
    searchRes: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list'),
};

const elementsString = {
    loader: 'loader',
};

export const renderLoader = parent => {
    const loader = `
    <div class="${elementsString.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;
    console.log('renderLoader Done!');

    parent.insertAdjacentHTML('afterbegin', loader); 
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementsString.loader}`);
    if (loader) loader.parentNode.removeChild(loader);
}