import { elements } from '../views/base';
export default class Likes{
    constructor(){
        this.hashA=[];
   
    }
            
    addLike(hash){
        
            this.hashA.push(hash);
            this.pd();
         }

    removeLike(hash){

        const index=this.hashA.findIndex(e=>e===hash);
        this.hashA.splice(index,1);
        this.pd();
         }
    isliked(hash){
        return this.hashA.findIndex(e=>e===hash)!==-1;

    }
    getnum(){
        return this.hashA.length
    }
    pd(){
        localStorage.setItem('likes',JSON.stringify(this.hashA));
    }
    rs(){
        const storage=JSON.parse(localStorage.getItem('likes'));
        if(storage)this.hashA=storage;
    }
}