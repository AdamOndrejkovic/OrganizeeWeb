import { Component, OnInit } from '@angular/core';
import {TodoService} from "../_services/todo.service";
import {first} from "rxjs";

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
      .subscribe(products => this.allTodos = products)
  }

}
