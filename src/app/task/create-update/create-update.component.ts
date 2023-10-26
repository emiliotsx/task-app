import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { STATUS, PATH_NAMES } from '../../constants'
import {
  getTasksInStorage, createTasksInStorage, updateTasksInStorage,
  formatInputDate, getCategoriesInStorage
} from '../../utils'
import { CategoriesService } from '../../services/categories.service';
import { TasksService } from '../../services/tasks.service';


@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css']
})
export class CreateUpdateComponent implements OnInit {

  private _id!: number
  private _categories!: Category[]
  private _form = new FormGroup({
    id: new FormControl(0),
    description: new FormControl('', Validators.required),
    details: new FormControl(''),
    dateStart: new FormControl('', Validators.required),
    dateEnd: new FormControl('', Validators.required),
    status: new FormControl(''),
    category: new FormControl('', Validators.required)
  })

  constructor(
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _categoriesService: CategoriesService,
    private _tasksService: TasksService
  ) { }

  ngOnInit(): void {
    this._categoriesService
      .getCategories()
      .subscribe((categories) => {
        this._categories = categories;
      });

    const id = this._activeRoute.snapshot.paramMap.get('id')
    if (!!id) {
      this._tasksService
        .getTaskById(+id)
        .subscribe((task) => this.fillTask(task));
    }
  }

  fillTask(task: Task) {
    if (!task) return

    this._id = task.id
    this._form.patchValue({
      id: task.id,
      description: task.description,
      details: task.details,
      dateStart: formatInputDate(task.dateStart as any),
      dateEnd: formatInputDate(task.dateEnd as any),
      status: `${task.status}`,
      category: `${task.category}`
    })
  }

  async create() {
    const { description, details, dateStart, dateEnd, category } = this.form.value
    const task: Task = {
      id: this.id || 0,
      description: description!,
      details: details!,
      dateStart: new Date(dateStart!),
      dateEnd: new Date(dateEnd!),
      category: +category!,
      status: STATUS.PENDING,
    }

    if (!this.id) {
      this._tasksService
        .insertTask(task)
        .subscribe(() => this.redirectPage())
    } else {
      this._tasksService
        .updateTask(task)
        .subscribe(() => this.redirectPage())
    }

  }

  redirectPage() {
    this._router.navigate([PATH_NAMES.TASKS])
      .then(() => {
        window.location.reload()
      })
  }

  get form() {
    return this._form
  }

  set form(form) {
    this._form = form
  }

  get id() {
    return this._id
  }

  set id(id) {
    this._id = id
  }

  get categories() {
    return this._categories
  }

  set categories(categories) {
    this._categories = categories
  }

  get isValidForma() {
    return this.form.valid
  }
}
