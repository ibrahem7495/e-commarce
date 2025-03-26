import { HttpClient, HttpHeaders } from '@angular//common/http';
import { ProdType } from 'src/app/model/prod-type';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cart } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartitems:ProdType[];
constructor(){
this.cartitems=[]
}
addToCart(prod:ProdType){
this.cartitems.push(prod);
}
}
