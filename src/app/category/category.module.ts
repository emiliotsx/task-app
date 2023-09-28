import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PATH_NAMES } from '../constants'

import { ListComponent } from './list/list.component';
import { CreateUpdateComponent } from './create-update/create-update.component';

const components = [
  ListComponent,
  CreateUpdateComponent
]

const routes: Routes = [
  {
    path: PATH_NAMES.CATEGORIES,
    component: ListComponent
  },
  {
    path: PATH_NAMES.CATEGORIES_CREATE,
    component: CreateUpdateComponent
  },
  {
    path: `${PATH_NAMES.CATEGORIES_UPDATE}/:id`,
    component: CreateUpdateComponent
  }
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [...components]
})
export class CategoryModule { }
