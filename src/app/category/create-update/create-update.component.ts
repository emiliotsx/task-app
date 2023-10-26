import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { PATH_NAMES } from '../../constants'
import { getCategoriesInStorage, createCategoriesInStorage, updateCategoriesInStorage } from '../../utils'
import { CategoriesService } from '../../category/services/categories.service';


@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css']
})
export class CreateUpdateComponent implements OnInit {

  private _categories: Category[] = []
  private _id!: number
  private _form = new FormGroup({
    id: new FormControl(0),
    description: new FormControl('', Validators.required)
  })

  constructor(
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this._categoriesService
      .getCategories()
      .subscribe((categories) => {
        this._categories = categories;
        this.fillCategory()
      });
  }

  fillCategory() {
    const id = this._activeRoute.snapshot.paramMap.get('id')

    if (!id) return

    this._id = +id
    console.log('this.categories', this.categories)
    const category = this.categories.find((category: Category) => category.id === +id)

    if (category) {
      this._form.patchValue({
        id: category.id,
        description: category.description,
      })
    }
  }

  async create() {
    const { description } = this.form.value
    const category: Category = {
      id: this.id || 0,
      description: description!
    }

    !this.id
      ? createCategoriesInStorage(category)
      : updateCategoriesInStorage(category)

    this._router.navigate([PATH_NAMES.TASKS])
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

  get isValidForma() {
    return this.form.valid
  }

  get categories(): Category[] {
    return this._categories
  }

  set categories(value: Category[]) {
    this._categories = value
  }

}
