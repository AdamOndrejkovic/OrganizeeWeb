import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Login} from "../_models/login";
import {environment} from "../../environments/environment";
import {Register} from "../_models/register";
import {BehaviorSubject, Observable, of, take, tap} from "rxjs";
import {User} from "../_models/user";
import {map} from "rxjs/operators";
import {RegisterDto} from "../dto/register.dto";
import {LoginDto} from "../dto/login.dto";

const userStorage = "user";

@Injectable({providedIn: 'root'})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<User|null>(this.getUser());
  constructor(private http: HttpClient) {
  }

  login(login: LoginDto) {
    return this.http.post<User>(`${environment.apiUrl}/Auth/Login`, login)
      .pipe(
        tap(user => {
          if (user) {
            localStorage.setItem(userStorage, JSON.stringify(user))
            this.isLoggedIn$.next(user)
          } else {
            this.logout();
          }
        })
      )
  }

  register(register: RegisterDto) {
    return this.http.post<any>(`${environment.apiUrl}/Auth/Register`, register)
      .pipe(map(user => user))
  }

  getUser():User | null {
    const objectStored = localStorage.getItem(userStorage);
    if (objectStored) {
      return JSON.parse(objectStored)
    }
    return null;
  }

  logout(): Observable<boolean> {
    localStorage.removeItem(userStorage);
    this.isLoggedIn$.next(null);
    return of(true).pipe(take(1));
  }
}
