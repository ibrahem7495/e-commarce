import { ApiService } from './../../services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular//common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { CartService } from 'src/app/services/cart.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient, private cookieService:CookieService ,private router : Router,private cartService:CartService) { }

login(email:string,password:string,returnURL?:string){
return this.httpClient.post(`${environment.APIURL}/auth/login?`,{email,password}).subscribe({
  next : (res : any)=>{
//     this.cookieService.set(name, value, expires, path, domain, secure, sameSite);
// name – 'authToken' → The name of the cookie.

// value – res.token → The token value stored in the cookie.

// expires – 1 → Expires after 1 day.

// path – '/' → The cookie is accessible from all pages in the domain.
    this.cookieService.set('authToken',res.access_token,1,'/');
    this.router.navigate([returnURL || '/home' ]);

  },
  error:(err)=>{console.error(err)}
})
}
isAuthenticated(): boolean {
  return this.cookieService.check('authToken');
}

logout() {
  this.cookieService.delete('authToken');
  this.router.navigate(['/login']);
}
profile():Observable<User>{
 return this.httpClient.get<User>(`${environment.APIURL}/auth/profile`)
}

}
