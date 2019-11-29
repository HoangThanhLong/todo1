import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResult} from '../core/http-result';
import {HttpClient} from '@angular/common/http';
import {ITodo} from '../ITodo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private url = 'http://127.0.0.1:8000/api/todos/';
  constructor(private http: HttpClient) { }
  getAll(): Observable<HttpResult> {
    return this.http.get<HttpResult>(this.url);
  }
  create(data) {
    return this.http.post(this.url + 'create', data);
  }

  findById(id: string): Observable<ITodo> {
    return this.http.get<ITodo>(this.url + id);
  }

  edit(data: ITodo[], id: string): Observable<any> {
    return this.http.put(this.url + 'edit/' + id , data);
  }
  delete(id: number): Observable<HttpResult> {
    // @ts-ignore
    return this.http.delete(this.url + id);
  }
}
