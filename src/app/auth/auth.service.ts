import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

import { API_URL } from '../../constants';
import { User } from '../users/user.model';
import { MessagesService } from '../utilities/services/messages.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user$ = new BehaviorSubject<User | null>(null);
  get user$() {
    return this._user$.asObservable();
  }

  get isLoggedin() {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const user = JSON.parse(storedUser);
      const storedToken = localStorage.getItem('token');
      const { exp, iat } = jwtDecode(storedToken!);
      const expiration = new Date(+exp!*1000);
      const currentDate = new Date();
      
      if(currentDate < expiration) {
        this._user$.next(user);
        return true;
      }

      this.messagesService.error('Session expired. Please login again.');
      this.logout();
      return false;
    }

    return false;
  }

  get token() {
    return localStorage.getItem('token');
  }

  constructor(
    private http: HttpClient,
    private messagesService: MessagesService,
  ) { }

  login(email: string, password: string) {
    
    return this.http.post<{ ['access_token']: string }>(`${API_URL}/auth/login`, { email, password })
    .pipe<User | null>(
      map(data => {
        if (data.access_token) {
          const { access_token } = data;
          const { user } = jwtDecode<{ 'user': User }>(access_token);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', access_token);
          this._user$.next(user);
          return user;
        }
        return null;
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this._user$.next(null);
  }
}
