import {Component, OnInit} from '@angular/core';
import {HttpResult} from '../../core/http-result';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TodoService} from '../../service/todo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ITodo} from '../../ITodo';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  todos: ITodo;
  todoEditForm: FormGroup;

  constructor(private todoService: TodoService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.todoEditForm = this.fb.group({
      name: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  findById() {
    const id = this.route.snapshot.paramMap.get('id');
    return this.todoService.findById(id).subscribe(
      res => {
        return this.todoEditForm.patchValue({
          name: res.name,
          content: res.content,
        });
      });
  }

  Onsubmit() {
    if (this.todoEditForm.valid) {
      const value = this.todoEditForm.value;
      const id = this.route.snapshot.paramMap.get('id');
      this.todoService.edit(value, id).subscribe(
        next => {
          this.router.navigate(['']);
        },
      );
    }
  }
}
