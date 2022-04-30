import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Todo} from "../_models/todo";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class TodoService {
  constructor(private http: HttpClient) {
  }

  create(todo: Todo){
    return this.http.post<Todo>(`${environment.apiUrl}/Todo`, todo);
  }

  getAll() {
    return this.http.get<Todo>(`${environment.apiUrl}/Todo`);
  }

  getById(id: number) {
    return this.http.get<Todo>(`${environment.apiUrl}/Todo/${id}`);
  }

  updateTodo(todo: Todo) {
    return this.http.put<Todo>(`${environment.apiUrl}/Todo`, todo);
  }

  deleteTodo(id: number) {
    return this.http.delete(`${environment.apiUrl}/Todo/${id}`);
  }
}
