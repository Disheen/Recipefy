import {elements, elementStr} from './base';

export const getInput=()=>elements.searchInput.value;

export const clearInput=()=>{
    elements.searchInput.value='';
};

export const clearRL=()=>{
    elements.searchResultList.innerHTML='';
    elements.searchResPages.innerHTML='';
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
};



const wordLimit=(rec,limit=17)=>{
    const new_arr=[];
    if(rec.length>limit){
        let acc=0;
        const arr=rec.split(' ');
        arr.forEach( x=>{
            if(acc+x.length<limit){
                new_arr.push(x);
                acc=acc+x.length;
            }
        });
        return `${new_arr.join(' ')} ...`;
    }
    return rec;
};

const createB=(page,type)=>`
        <button class="btn-inline results__btn--${type}" data-goto=${type=='next'?page+1:page-1}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type==='next'?'right':'left'}"></use>
        </svg>
        <span>Page ${type==='next'?page+1:page-1}</span>
        </button>
`;
 
const Buttons=(page,total,respp)=>{
    const num=Math.ceil(total/respp);
    let button;
    if(page===1 && num>1){
        button=createB(page,'next');

    }
    else if(page<num ){
        button=`${createB(page,'next')}
                ${createB(page,'prev')}        
        `;
    }
    else if(page===num && num>1){
        button=createB(page,'prev');
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin',button);

}
export const renderRecipes= (recipe,page=1,respp=10)=>{
    const start=(page-1)*respp;
    const end=page*respp    ;
    recipe.slice(start,end).forEach(x => {
        const markup=`
        <li>
        <a class="results__link " href="#${x.recipe_id}">
            <figure class="results__fig">
                <img src="${x.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${wordLimit(x.title)}</h4>
                <p class="results__author">${x.publisher}</p>
            </div>
        </a>
    </li>
        `;
        elements.searchResultList.insertAdjacentHTML('beforeend',markup);   
    });
    
    Buttons(page,recipe.length,respp);


}