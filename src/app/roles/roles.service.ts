import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_URL } from '../../constants';
import { Role } from './role.model';
import { Roles } from './roles.enum';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private readonly apiUrl = `${API_URL}/roles`;

  constructor(private httpClient: HttpClient) { }

  
  add(role: Role) {
    return this.httpClient.post<Role>(`${this.apiUrl}`, role);
  }

  getById(id: number) {
    return this.httpClient.get<Role>(`${this.apiUrl}/${id}`);
  }

  getAllRoles() {
    return Object.entries(Roles).map(([key, value]) => value);
  }
}
