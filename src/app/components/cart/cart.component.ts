import { fackPrduct } from './../../model/cart';
import { Cart, fackCart } from 'src/app/model/cart';
import { ApiService } from './../../services/api.service';
import { CartService } from './../../services/cart.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProdType } from 'src/app/model/prod-type';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

cartitems:Cart[];
items:Cart[];
// fackcart:fackCart;
// fackprduct:fackPrduct[];


  constructor(private cartService:CartService,private apiService:ApiService) {
    this.cartitems=[]
    this.items=[]
  //   this.fackprduct=[{
  //     id:10,
  //     title : 'hema'
  //     ,price:1234,
  //     description:'yalabena ',
  //     category:'clothis',
  //     image:'https://fakeimg.pl/300/'
  //         }]
  //   this.fackcart={userId:2,products:this.fackprduct
  // }
   }

  ngOnInit(): void {
    this.updateCartValues();
    // this.fackcart={userId:101,products:this.fackprduct    }
    // this.apiService.CreateNewCart(this.fackcart).subscribe({
    //   next:(value)=>{
    //     console.log('fack cart ::: ',value)
    //   }
    // })

  }
  remove(idToRemove:number){
  this.cartService.remove(idToRemove);//remve from local storage
  // this.cartitems.splice(idIndexToRemove,1)//remove imediatly from cart component to avoid relode the component in all removing click
this.updateCartValues();
  }
  updateCartValues(){
    console.log('cart commponent', this.cartitems=this.cartService.items)

  }
  updateQuantity(index:number,addValue:number){
this.cartService.cartitems[index].quantity=addValue;
this.cartService.syncItems();
  }

}
