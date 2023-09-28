import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

import { PATH_NAMES, PATH_NAMES_WHITOUT_LAYOUT, PATH_NAMES_WHITOUT_SIDEBARD } from '../../constants'
import { getCategoriesInStorage, deleteCategoriesInStorage } from '../../utils';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, DoCheck {

  private _categories: Category[] = []

  constructor(private _router: Router) { }

  ngDoCheck(): void {
    this._categories = getCategoriesInStorage()
  }

  ngOnInit(): void {
    this._categories = getCategoriesInStorage()
  }

  handleDelete(category: Category) {
    deleteCategoriesInStorage(category)
    this._categories = getCategoriesInStorage()
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
