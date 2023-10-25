import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PATH_NAMES } from '../constants'

import { CirclePlusIconComponent } from '../assets/circle-plus-icon/circle-plus-icon.component';
import { CheckIconComponent } from '../assets/check-icon/check-icon.component';
import { TodoListComponent } from '../assets/todo-list/todo-list.component';
import { ListComponent } from './list/list.component';
import { CreateUpdateComponent } from './create-update/create-update.component';
import { NodeCommunicationComponent } from '../services/node-comunication.component';

const components = [
  CirclePlusIconComponent,
  CheckIconComponent,
  TodoListComponent,
  ListComponent,
  CreateUpdateComponent
]

const routes: Routes = [
  {
    path: PATH_NAMES.TASKS,
    component: ListComponent
  },
  {
    path: PATH_NAMES.TASKS_CREATE,
    component: CreateUpdateComponent
  },
  {
    path: `${PATH_NAMES.TASKS_UPDATE}/:id`,
    component: CreateUpdateComponent
  },
  { path: 'node-communication', component: NodeCommunicationComponent }
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
export class TaskModule { }
