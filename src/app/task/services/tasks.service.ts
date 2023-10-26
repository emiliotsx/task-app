import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TasksService {

  private baseUrl: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getTask(): Observable<Task[]> {
    console.log('entre')
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`);
  }

}
