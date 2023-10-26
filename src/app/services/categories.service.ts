import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TasksService } from './tasks.service';

@Injectable({ providedIn: 'root' })
export class CategoriesService {

  private baseUrl: string = 'http://localhost:3000/categories';
  constructor(
    private _http: HttpClient,
    private _tasksService: TasksService
  ) { }

  getCategories(): Observable<Category[]> {
    return this._http.get<Category[]>(this.baseUrl);
  }

  getCategoryById(id: number): Observable<Category> {
    return this._http.get<Category>(`${this.baseUrl}/${id}`);
  }

  insertCategory(category: Category): Observable<Category> {
    this.getCategories()
      .subscribe((categories) => {
        category.id = this.generateNewId(categories)
        return this._http.post<Category>(this.baseUrl, category)
      })

    return this._http.post<Category>(this.baseUrl, category)
  }

  updateCategory(category: Category): Observable<Category> {
    return this._http.put<Category>(`${this.baseUrl}/${category.id}`, category);
  }

  deleteCategory(id: number): Observable<Category> {
    this._tasksService
      .getTaskByCategoryId(id)
      .subscribe((tasks) => {
        console.log(tasks)
        if (tasks.length > 0) {
          alert('No se puede eliminar la categoría porque tiene tareas asociadas.')
          return
        } else {
          return this._http.delete<Category>(`${this.baseUrl}/${id}`);
        }
      })

    return this._http.get<Category>(`${this.baseUrl}/${id}`);
  }

  generateNewId(categories: Category[]) {
    return (categories.length > 0) ? (categories[categories.length - 1]['id'] + 1) : 1
  }

}
