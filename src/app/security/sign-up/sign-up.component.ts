import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PATH_NAMES, ID_LOCAL_STORAGE } from '../../constants'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  private _form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  })

  constructor(private _router: Router) { }

  async signIn() {
    const { email, password } = this.form.value
    if (email !== "admin@admin.com" && password !== "123") {
      alert("Email and Password incorrect")
      return
    }

    localStorage.setItem(ID_LOCAL_STORAGE.USER, JSON.stringify(this.form.value));
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

  get isValidForma() {
    return this.form.valid
  }

}
