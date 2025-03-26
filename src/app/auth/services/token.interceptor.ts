import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor( private cookieService : CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token =this.cookieService.get('authToken')

    console.log('interceptor')
    if (token ) {
      console.log('token',token)
      const clonedRequest = request.clone({
        setHeaders : {
        Authorization : `Bearer ${token}`
        }
      })
      console.log("clone interceptor")
      return next.handle(clonedRequest);

    }
    return next.handle(request);
  }
}
