import {elements, elementStr} from './base';
export const addLike= (hash,recipe)=>{

    const markup=`
    <li>
    <a class="likes__link" href="#${hash}">
        <figure class="likes__fig">
            <img src="${recipe.img}" alt="${recipe.title}">
        </figure>
        <div class="likes__data">
            <h4 class="likes__name">${recipe.title}</h4>
            <p class="likes__author">${recipe.author}</p>
        </div>
    </a>
</li>
    `;
    elements.likes.insertAdjacentHTML('beforeend',markup); 
}
export const remove=id=>{
    document.querySelector(`.likes__link[href="#${id}"]`).remove();
}

export const toggleB=isliked=>{
    //icons.svg#icon-heart-outlined
    const IS=isliked?'icon-heart':'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${IS}`);
}

export const likesToggle=numLikes=>{
    if(numLikes!=0){
    document.querySelector('.likes__field').style.visibility='visible';
  }
    else{
        document.querySelector('.likes__field').style.visibility='hidden ';
       
    }
}