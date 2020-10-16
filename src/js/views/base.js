export const elements={
    searchInput:document.querySelector('.search__field'),
    searchButton:document.querySelector('.search__btn'),
    searchResultList:document.querySelector('.results__list'),
    searchRes:document.querySelector('.results'),
    searchResPages:document.querySelector('.results__pages'),
    Recipe:document.querySelector('.recipe'),
    ShopList:document.querySelector('.shopping__list'),
    likes:document.querySelector('.likes__list')
};
 
export const elementStr={
    loader:'loader'
};

export const renderLoader=parent=>{
    const loader=`
    <div class="${elementStr.loader}">
        <svg>
            <use href='img/icons.svg#icon-cw'></use>
        <svg>
        
    </div.
    `;
    parent.insertAdjacentHTML('afterbegin',loader);
};

export const removeLoader=()=>{
    const loadsy =document.querySelector(`.${elementStr.loader}`);
    if(loadsy){
        loadsy.remove();
    }
};
