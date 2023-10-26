import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { PATH_NAMES } from '../../constants'
import { getCategoriesInStorage, createCategoriesInStorage, updateCategoriesInStorage } from '../../utils'
import { CategoriesService } from '../../services/categories.service';


@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css']
})
export class CreateUpdateComponent implements OnInit {

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
    const id = this._activeRoute.snapshot.paramMap.get('id')
    if (!!id) {
      this._categoriesService
        .getCategoryById(+id)
        .subscribe((category) => this.fillCategory(category));
    }
  }

  fillCategory(category: Category) {
    if (!category) return

    this._id = category.id
    this._form.patchValue({
      id: category.id,
      description: category.description,
    })
  }

  async create() {
    const { description } = this.form.value
    const category: Category = {
      id: this.id || 0,
      description: description!
    }

    if (!this.id) {
      this._categoriesService
        .insertCategory(category)
        .subscribe(() => this.redirectPage())
    } else {
      this._categoriesService
        .updateCategory(category)
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

  get isValidForma() {
    return this.form.valid
  }

}
