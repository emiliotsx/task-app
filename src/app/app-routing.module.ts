import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PATH_NAMES } from './constants';

const routes: Routes = [{
  path: '',
  redirectTo: PATH_NAMES.SIGN_IN,
  pathMatch: 'full'
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
