import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PATH_NAMES_WHITOUT_LAYOUT, ID_LOCAL_STORAGE } from './constants'

interface User {
  email: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'task-app';

  private _userInformation!: User

  constructor(private _router: Router) { }

  ngOnInit(): void {
    const storage = localStorage.getItem(ID_LOCAL_STORAGE.USER) ?? '';
    if (!storage) {
      this._router.navigate([PATH_NAMES_WHITOUT_LAYOUT.SIGN_IN])
      return
    }

    const user = JSON.parse(storage) as User
    this._userInformation = { email: user.email || '' }
  }

  get userInformation(): User {
    return this._userInformation
  }

  set userInformation(user: User) {
    this._userInformation = user
  }

  get pagesWithoutLayout(): boolean {
    const pathsnames = Object.values(PATH_NAMES_WHITOUT_LAYOUT)
    const pathname = window.location.pathname.split('/')[1] ?? ''
    return pathsnames.includes(pathname)
  }

}
