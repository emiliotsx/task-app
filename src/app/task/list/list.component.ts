import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { STATUS, PATH_NAMES } from '../../constants'
import { getTasksInStorage, updateTasksInStorage, deleteTasksInStorage } from '../../utils'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  private _tasks: Task[] = []

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this._tasks = getTasksInStorage()
  }

  handleChangeStatus(task: Task) {
    const newStatus = (task.status)
      ? STATUS.DONE
      : STATUS.PENDING

    task.status = newStatus
    updateTasksInStorage(task)
    this._tasks = getTasksInStorage()
  }

  handleDelete(task: Task) {
    deleteTasksInStorage(task)
    this._tasks = getTasksInStorage()
  }

  handleUpdate(task: Task) {
    this._router.navigate([PATH_NAMES.TASKS_UPDATE, task.id])
  }

  get tasks() {
    return this._tasks;
  }

  set tasks(tasks) {
    this._tasks = tasks;
  }

}
