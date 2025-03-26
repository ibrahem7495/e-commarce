import { Cart } from 'src/app/model/cart';
import { ApiService } from './../../services/api.service';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ProdType } from 'src/app/model/prod-type';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

cartitems:ProdType[];
  constructor(private cartService:CartService,private apiService:ApiService) {
    this.cartitems=[]
   }

  ngOnInit(): void {
this.cartitems=this.cartService.cartitems
  }

}
