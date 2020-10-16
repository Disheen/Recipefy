import Sea from './models/Search';
import Recipe from './models/Recipe'; 
import {elements,renderLoader,removeLoader } from './views/base';
import * as searchview from './views/searchView';
import * as listview from './views/listView';
import * as likesview from './views/likesView';
import * as recipeview from './views/recipeViews';
import List from './models/List';
import Likes from './models/Likes';
const state={};
const controlSearch=async()=>{
    const query=searchview.getInput();

    if(query){
        state.search=new Sea(query);
       
        searchview.clearInput();
        searchview.clearRL();
        renderLoader(elements.searchRes);
         
        

        await state.search.getR();
        removeLoader()
        

        //console.log(state.search.rec);
        searchview.renderRecipes(state.search.rec);

    }
}

elements.searchButton.addEventListener('click',e=>{
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click',e=>{
    const btn=e.target.closest('.btn-inline');
    if(btn){
        const gotoPage=parseInt(btn.dataset.goto);
        searchview.clearRL();
        searchview.renderRecipes(state.search.rec,gotoPage);

    }
});


//Recipe

 
const controlRecipe=async()=>{
    
    const id= window.location.hash.replace('#','');
    if (id){
        try{
        recipeview.clearRecipe();
        renderLoader(elements.Recipe);
        state.recipe=new Recipe(id);
       // console.log(state.recipe);
        await state.recipe.getRec();
        state.recipe.parseIngredients();    
        //testing
      //  console.log(state.recipe);
      //  const IL=state.like.isliked(id);
        //console.log(IL);
        removeLoader();
        recipeview.renderRecipe(state.recipe,state.like.isliked(id));
        if (state) searchview.highlightSelected(id)
        

    }
    catch(error){
       // alert(error);
    }
  }
  
}


['load','hashchange'].forEach(event=>window.addEventListener(event,controlRecipe));


elements.Recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeview.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase button is clicked
        state.recipe.updateServings('inc');
        recipeview.updateServingsIngredients(state.recipe);
    }
    else if (e.target.matches('.recipe__btn-add,.recipe__btn-add *')){
        Shop(); 
    }
    else if (e.target.matches('.recipe__love,.recipe__love *')){
        like();
    }
});

//List
const  Shop=()=>{
    if(!state.list){
        state.list=new List();
        }

    state.recipe.ingredients.forEach(e=>{
    const item=state.list.addItem(e.count,e.unit,e.ingredient);
    listview.addItem(item);
    });
};

elements.ShopList.addEventListener('click',e=>{
    const Id=e.target.closest('.shopping__item').dataset.id;
    if(e.target.matches('.shopping__delete,.shopping__delete *')) {
     state.list.deleteItem(Id);
    listview.removeItem(Id);
    }
    else if(e.target.matches('.shopping__count-value')){
        const Id=e.target.closest('.shopping__item').dataset.id;
        const newValue=parseFloat(e.target.value);
        state.list.updateCount(Id,newValue);
        //console.log(state.list);
       
    }
    

});

//LIKE
state.like=new Likes();
likesview.likesToggle(state.like.getnum())
const like=()=>{
    //document.querySelector('.')
    const hash=window.location.hash;
    if(!state.like) state.like=new Likes();
    if(!state.like.isliked(state.recipe.id)){
    likesview.addLike(state.recipe.id,state.recipe);
    state.like.addLike(state.recipe.id);
    likesview.toggleB(true);
    }
    else{
        state.like.removeLike(state.recipe.id);
        likesview.remove(state.recipe.id);
        likesview.toggleB(false);
    }
    likesview.likesToggle(state.like.getnum())

    
//console.log(state.like);
}









