import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PATH_NAMES } from '../../constants'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForwotPasswordComponent {

  private _form = new FormGroup({
    email: new FormControl('', Validators.required),
  })

  constructor(private _router: Router) { }

  async forgotPasword() {
    alert('Please follow the instructions that were sent to your email.')
    this._router.navigate([PATH_NAMES.SIGN_IN])
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
