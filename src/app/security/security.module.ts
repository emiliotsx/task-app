import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PATH_NAMES } from '../constants'

import { SignInComponent } from './sign-in/sign-in.component';
import { ForwotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { GoogleComponent } from '../assets/google/google.component';


const components = [
  SignInComponent,
  ForwotPasswordComponent,
  SignUpComponent,
  GoogleComponent
]

const routes: Routes = [
  {
    path: PATH_NAMES.SIGN_IN,
    component: SignInComponent
  },
  {
    path: PATH_NAMES.SIGN_UP,
    component: SignUpComponent
  },
  {
    path: PATH_NAMES.FORGOT_PASSWORD,
    component: ForwotPasswordComponent
  },
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [...components]
})
export class SecurityModule { }
