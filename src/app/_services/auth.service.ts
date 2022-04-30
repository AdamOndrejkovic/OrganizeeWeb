import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Login} from "../_models/login";
import {environment} from "../../environments/environment";
import {Register} from "../_models/register";

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(login: Login) {
    return this.http.post(`${environment.apiUrl}/Auth/Login`, login)
  }

  register(register: Register) {
    return this.http.post(`${environment.apiUrl}/Auth/Register`, register)
  }
}
