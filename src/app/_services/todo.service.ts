import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Todo} from "../_models/todo";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class TodoService {
  constructor(private http: HttpClient) {
  }

  create(todo: Todo){
    return this.http.post(`${environment.apiUrl}/Todo`, todo);
  }

  getAll() {
    return this.http.get(`${environment.apiUrl}/Todo`);
  }

  getById(id: number) {
    return this.http.get(`${environment.apiUrl}/Todo/${id}`);
  }

  updateTodo(todo: Todo) {
    return this.http.put(`${environment.apiUrl}/Todo`, todo);
  }

  deleteTodo(id: number) {
    return this.http.delete(`${environment.apiUrl}/Todo/${id}`);
  }
}
