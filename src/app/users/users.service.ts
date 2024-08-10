import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user.model';
import { API_URL } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly apiUrl = `${API_URL}/users`;

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<User[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.httpClient.get<User>(`${this.apiUrl}/${id}`);
  }

  add(user: User) {
    return this.httpClient.post<User>(this.apiUrl, user);
  }

  update(user: User) {
    return this.httpClient.put<User>(`${this.apiUrl}/${user.id}`, user);
  }
}
