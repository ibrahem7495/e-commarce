import { ApiService } from 'src/app/services/api.service';
import { ProdType } from 'src/app/model/prod-type';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartitems:Cart[];
  cartLength = new BehaviorSubject<number>(0);
  cartLength$=this.cartLength.asObservable();
constructor(private apiService:ApiService){
  //initialy set vlaue stored in local storage in cartitems array but if it null set as empty array
  //JSON.parse is to convert from json to an type script opject
this.cartitems=JSON.parse( localStorage.getItem('cartItemsId') || '[]')
  this.updateCartLength();
}
addToCart(product:ProdType){
  const idString=product.id.toString()
  let isItemExist:number | null;
    // console.log('if cart items ');
    isItemExist = this.cartitems.findIndex(ids=>ids.id===idString) ; console.log('isItemExist',isItemExist)
  if(isItemExist!=-1) {
    //find index return -1 if the element is not exist in the array
   const existingItemIndex:number=this.cartitems.findIndex(ids=>ids.id===idString);
  this.cartitems[existingItemIndex].quantity++
    // console.log('existing ',this.cartitems[existingItemIndex])
    // console.log('quantity',this.cartitems[existingItemIndex].quantity )
  }else{
    console.log('else')
    const cartitem:Cart={id :idString,quantity:1 ,product}
    console.log(' const cartitem',cartitem)
    this.cartitems.push(cartitem)

}

  // this.cartitems.push(id.toString())
  this.syncItems();
// this.apiService.getPrductById(Number(localStorage.getItem("id"))).subscribe({
//   next:(product)=>{
//     this.cartitems.push(product)

//   }
// })

}
getCartItems(){
  // localStorage.getItem("id");
}
get items(){
  return this.cartitems.slice(0)
}
syncItems(){
  localStorage.setItem('cartItemsId',JSON.stringify(this.cartitems))
  this.updateCartLength();
}
remove(removedId:number){
  const idString=removedId.toString()
 const removedIndex = this.cartitems.findIndex(ids=>ids.id===idString)
 if(this.cartitems[removedIndex].quantity>1){
  this.cartitems[removedIndex].quantity--
 }else{
  this.cartitems.splice(removedIndex,1)
 }
// const index= this.cartitems.indexOf(item);
  // this.cartitems.splice(itemIndex,1)//remve one item from index = index
  this.syncItems()
}
get numberOfCartProducts(){
return this.cartitems.length
}
updateCartLength(){
  this.cartLength.next(this.cartitems.length)
}
}
