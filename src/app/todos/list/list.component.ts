import { Component, OnInit } from '@angular/core';
import {TodoService} from '../../service/todo.service';
import {ITodo} from '../../ITodo';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  todos: ITodo[] = [];
  getAll() {
    this.todoService.getAll().subscribe(result => {
      if (result.status === 'success') {
        this.todos = result.data;
      }
    });
  }
  constructor(private todoService: TodoService) { }
  ngOnInit() {
   this.getAll();
  }
  delete(id) {
    const check = confirm('Are you sure?');
    if (check === true) {
      this.todoService.delete(id).subscribe(() => {
        return this.getAll();
      });
    }
  }
}
