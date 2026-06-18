import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:5000/api/tasks';

    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.apiUrl);
    }

    createTask(task: Omit<Task, 'id' | 'is_done'>): Observable<Task> {
        return this.http.post<Task>(this.apiUrl, task);
    }

    updateTask(id: number): Observable<Task> {
        return this.http.put<Task>(`${this.apiUrl}/${id}`, {});
    }

    deleteTask(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
