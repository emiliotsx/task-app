import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { PATH_NAMES } from '../../constants'
import { getCategoriesInStorage, createCategoriesInStorage, updateCategoriesInStorage } from '../../utils'


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
    private _activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fillCategory()
  }

  fillCategory() {
    const id = this._activeRoute.snapshot.paramMap.get('id')

    if (!id) return

    this._id = +id
    const categories = getCategoriesInStorage();
    const category = categories.find((category: Category) => category.id === +id)

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

}
