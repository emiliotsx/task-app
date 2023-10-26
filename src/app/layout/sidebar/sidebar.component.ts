import { Component, OnInit, DoCheck, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { PATH_NAMES, PATH_NAMES_WHITOUT_LAYOUT, PATH_NAMES_WHITOUT_SIDEBARD } from '../../constants'
import { getCategoriesInStorage, deleteCategoriesInStorage } from '../../utils';
import { CategoriesService } from '../../services/categories.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, DoCheck {

  private _categories: Category[] = []

  constructor(
    private _router: Router,
    private _categoriesService: CategoriesService
  ) { }

  ngDoCheck(): void {
    if (this.categories.length <= 0) {
      this._categoriesService
        .getCategories()
        .subscribe((categories) => this._categories = categories);
    }
  }

  ngOnInit(): void {
    this._categoriesService
      .getCategories()
      .subscribe((categories) => this._categories = categories);
  }

  handleDelete(category: Category) {
    this._categoriesService
      .deleteCategory(category.id)
      .subscribe(() => {
        this._categoriesService
          .getCategories()
          .subscribe((categories) => this._categories = categories);
      })
  }

  handleUpdate(category: Category) {
    this._router.navigate([PATH_NAMES.CATEGORIES_UPDATE, category.id])
  }

  get categories() {
    return this._categories;
  }

  set categories(categories) {
    this._categories = categories;
  }

  get pagesWithoutSidebard(): boolean {
    const pathsnames = Object.values(PATH_NAMES_WHITOUT_SIDEBARD)
    const pathname = window.location.pathname.split('/')
    return pathsnames.includes(`${pathname[1]}/${pathname[2]}`)
  }

  get pagesWithoutLayout(): boolean {
    const pathsnames = Object.values(PATH_NAMES_WHITOUT_LAYOUT)
    const pathname = window.location.pathname.split('/')[1] ?? ''
    return pathsnames.includes(pathname)
  }

}
