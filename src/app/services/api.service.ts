import { User } from './../model/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular//common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProdType } from '../model/prod-type';
import { CatType } from '../model/cat-type';
import { Cart, fackCart } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions;
  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: 'my-auth-token'
      }),
    };
  }
  // users api crud
  getAllUsers():Observable<User>{
    return this.httpClient.get<User>(`${environment.APIURL}/users`)
  }
  addNewUser(newUser:User){
    return this.httpClient.post<User>(`${environment.APIURL}/users`,JSON.stringify(newUser) ,this.httpOptions)
  }
  getUserById(id:number):Observable<User>{
    return this.httpClient.get<User>(`${environment.APIURL}/users/${id}`)
  }
editUser(id:number,UserEditValue:User){
  return this.httpClient.put<User>(`${environment.APIURL}/users/${id}`,JSON.stringify(UserEditValue) ,this.httpOptions)
}
deleteUser(id :number){
  return this.httpClient.delete(`${environment.APIURL}/users/${id}`)
}
getUserId():Observable<number>{
  return this.httpClient.get<ProdType>(`${environment.APIURL}/auth/profile`).pipe(map(value=>value.id))
}
// product api crud

getAllProduts(limit?:number,offset?:number):Observable<ProdType[]>{
  return this.httpClient.get<ProdType[]>(`${environment.APIURL}/products?limit=${limit}&offset=${offset}`)
}
getPrductById(id:number |undefined):Observable<ProdType>{
  return this.httpClient.get<ProdType>(`${environment.APIURL}/products/${id} `)
}
getProductByCatId(limit:number,offset:number,catId:number):Observable<ProdType[]>{
  return this.httpClient.get<ProdType[]>(`${environment.APIURL}/categories/${catId}/products?limit=${limit}&offset=${offset}`)
}
getAllCategory():Observable<CatType[]>{
return this.httpClient.get<CatType[]>(`${environment.APIURL}/categories?limit=10`)
}
postNewProduct(newProd:ProdType){
return this.httpClient.post<ProdType>(`${environment.APIURL}/products`,newProd,this.httpOptions)
}
editProductById(editProd:ProdType , id :number){
  return this.httpClient.put<ProdType>(`${environment.APIURL}/products`,editProd,this.httpOptions)
    }
deletProductById(id:number |undefined){
  return this.httpClient.delete(`${environment.APIURL}/products/${id}`) || null;

}
getRelatedProducts(id:number):Observable<ProdType[]>{
  return this.httpClient.get<ProdType[]>(`${environment.APIURL}/products/${id}/related`)
}
// getSearchResult(slug:string ):Observable<ProdType>{
//   return this.httpClient.get<ProdType>(`${environment.APIURL}/products/slug/${slug}`)
// }
getSearchResult(slug:string ):Observable<ProdType[]> {
   return this.httpClient.get<ProdType[]>(`${environment.APIURL}/products/`).pipe(map(value=>value.filter(filteredValue=>
    filteredValue.slug.includes(slug)
   )))
}
getAllCarts():Observable<any>{
  return this.httpClient.get<any>('https://fakestoreapi.com/carts')
}
CreateNewCart(products:fackCart){
  console.log('CreateNewCart(products:fackCart)',products)
return this.httpClient.post<fackCart>('https://fakestoreapi.com/carts',JSON.stringify(products),this.httpOptions)
}
}
