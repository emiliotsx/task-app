import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TasksService {

  private baseUrl: string = 'http://localhost:3000/tasks';
  constructor(private _http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this._http.get<Task[]>(this.baseUrl);
  }

  getTaskById(id: number): Observable<Task> {
    return this._http.get<Task>(`${this.baseUrl}/${id}`);
  }

  getTaskByCategoryId(id: number): Observable<Task[]> {
    return this._http.get<Task[]>(`${this.baseUrl}?category=${id}`);
  }

  insertTask(task: Task): Observable<Task> {
    this.getTasks()
      .subscribe((taks) => {
        task.id = this.generateNewId(taks)
        return this._http.post<Task>(this.baseUrl, task)
      })

    return this._http.post<Task>(this.baseUrl, task)
  }

  updateTask(task: Task): Observable<Task> {
    return this._http.put<Task>(`${this.baseUrl}/${task.id}`, task);
  }

  deleteTask(id: number): Observable<Task> {
    return this._http.delete<Task>(`${this.baseUrl}/${id}`);
  }

  generateNewId(tasks: Task[]) {
    return (tasks.length > 0) ? (tasks[tasks.length - 1]['id'] + 1) : 1
  }

}
