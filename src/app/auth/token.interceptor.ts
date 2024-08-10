import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor (
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = this.authService.token;
    const modifiedReq = req.clone({ 
      headers: userToken ? req.headers.set('Authorization', `Bearer ${userToken}`) : req.headers,
    });
    return next.handle(modifiedReq);
  }
}