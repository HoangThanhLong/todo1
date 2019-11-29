import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TodoService} from '../../service/todo.service';
import {Router, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpResult} from '../../core/http-result';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  todoCreateForm: FormGroup;
  constructor(private totoService: TodoService,
              private fb: FormBuilder,
              private router: Router
              ) { }

  ngOnInit() {
    this.todoCreateForm = this.fb.group({
      name: ['', Validators.required],
      content: ['', Validators.required ]
    });
  }
  OnSubmit() {
      this.totoService.create(this.todoCreateForm.value).subscribe((response: HttpResult) => {
        this.router.navigate(['/']);
      });
    }
}
