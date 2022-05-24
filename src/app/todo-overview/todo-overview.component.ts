import { Component, OnInit } from '@angular/core';
import {TodoService} from "../_services/todo.service";
import {first} from "rxjs";
import { Todo } from '../_models/todo';

//Todo
@Component({
  selector: 'app-todo-overview',
  templateUrl: './todo-overview.component.html',
  styleUrls: ['./todo-overview.component.css']
})
export class TodoOverviewComponent implements OnInit {
  allTodos: any;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getAll()
      .pipe(first())
      .subscribe(products =>{
        this.allTodos = products
      })
  }

  delete(id: number) {
    this.todoService.deleteTodo(id).pipe().subscribe()
    this.allTodos = this.allTodos.filter( (item: { id: number; }) => item.id != id)
  }

  changed(event: any, todo: Todo) {
    console.log(event.target.value)
    todo.complete = event.target.value === 'true' ? true: false;
    this.todoService.updateTodo(todo).pipe().subscribe()
  }

}
