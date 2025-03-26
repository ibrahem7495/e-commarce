import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthReturnGuard implements CanActivate {
  constructor(private authService:AuthService,private router : Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
if(this.authService.isAuthenticated()){
  return true;
}
else{
  this.router.navigate(['/login'],{queryParams:{returnURL:state.url}})
  return false

}
  }

}
