import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {AuthService} from "../_services/auth.service";
import {Router} from "@angular/router";
import {RegisterDto} from "../dto/register.dto";
import {first} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private _auth:AuthService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  get name() {
    return this.registerForm.get('name') as FormControl
  }

  get password() {
    return this.registerForm.get('password') as FormControl
  }

  onSubmit() {
    if (this.registerForm.invalid){
      return
    }

    const register = this.registerForm.value as RegisterDto
    this._auth.register(register)
      .pipe(first())
      .subscribe({

      })
  }

}
