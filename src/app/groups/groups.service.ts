import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Group } from './group.model';
import { API_URL } from '../../constants';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private _groups$ = new BehaviorSubject<Group[]>([]);
  private readonly apiUrl = `${API_URL}/groups`;

  get groups$() {
    return this.getAll().pipe(
      switchMap(() => this._groups$.asObservable()),
    );
  }

  constructor(private httpClient: HttpClient) {
    this.getAll().subscribe(_ => { })
  }

  getAll() {
    return this.httpClient.get<Group[]>(`${this.apiUrl}`).pipe(
      tap(groups => {
        this._groups$.next(groups);
      })
    );
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`).pipe(
      switchMap(_ => this.getAll()),
    );
  }

  add(name: string) {
    return this.httpClient.post<Group>(`${this.apiUrl}`, { name }).pipe(
      switchMap(_ => this.getAll()),
    );
  }

  edit(id: number, name: string) {
    return this.httpClient.put<Group>(`${this.apiUrl}/${id}`, { name }).pipe(
      switchMap(_ => this.getAll()),
    );
  }

  getById(id: number) {
    return this._groups$.pipe(
      map(data => data.find(e => e.id === id))
    );
  }

}
