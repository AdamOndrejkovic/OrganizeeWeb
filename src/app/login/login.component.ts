import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../_services/auth.service";
import {LoginDto} from "../dto/login.dto";
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private _router:Router, private _auth: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get name() {
    return this.loginForm.get('name') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const login = this.loginForm.value as LoginDto;

    this._auth.login(login).pipe(
      catchError(err => {
        if (err.error) {

        }
        return throwError(err)
      })
    )
  }

}
