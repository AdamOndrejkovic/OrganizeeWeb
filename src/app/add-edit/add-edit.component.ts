import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../_services/auth.service";
import {TodoDto} from "../dto/todo.dto";
import {TodoService} from "../_services/todo.service";
import {first} from "rxjs";

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  todoForm!: FormGroup;

  constructor(private _auth:AuthService, private _todo: TodoService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm =  this.formBuilder.group({
      userId: [ this._auth.getUser() , [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      complete: [false, [Validators.required]],
    })
  }

  get title() {
    return this.todoForm.get('title') as FormControl
  }

  get description() {
    return this.todoForm.get('description') as FormControl
  }

  get complete() {
    return this.todoForm.get('complete') as FormControl
  }

  onSubmit() {
    if (this.todoForm.invalid) {
      return
    }

    const todo = this.todoForm.value as TodoDto
    this._todo.create(todo)
      .pipe(first())
      .subscribe({

      })
  }
}
