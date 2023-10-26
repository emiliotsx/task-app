import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CategoriesService {

  private baseUrl: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getCategories():Observable<Category[]> {
    return this.http.get<Category[]>(`${ this.baseUrl }/categories`);
  }

}
