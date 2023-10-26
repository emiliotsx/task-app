import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { STATUS, PATH_NAMES } from '../../constants'
import { getTasksInStorage, updateTasksInStorage, deleteTasksInStorage } from '../../utils'
import { TasksService } from '../../services/tasks.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  private _tasks: Task[] = []

  constructor(
    private _router: Router,
    private _tasksService: TasksService
  ) { }

  ngOnInit(): void {
    this._tasksService
      .getTasks()
      .subscribe((tasks) => this._tasks = tasks);
  }

  handleChangeStatus(task: Task) {
    const newStatus = (task.status)
      ? STATUS.DONE
      : STATUS.PENDING

    task.status = newStatus
    this._tasksService
      .updateTask(task)
      .subscribe(() => {
        this._tasksService
          .getTasks()
          .subscribe((tasks) => this._tasks = tasks)
      })
  }

  handleDelete(task: Task) {
    this._tasksService
      .deleteTask(task.id)
      .subscribe(() => {
        this._tasksService
          .getTasks()
          .subscribe((tasks) => this._tasks = tasks)
      })
  }

  handleUpdate(task: Task) {
    this._router.navigate([PATH_NAMES.TASKS_UPDATE, task.id])
  }

  async handleCreateEvent(task: Task) {
    const eventDetails = {
      summary: task.description,
      description: task.details,
      start: {
        dateTime: task.dateStart,
      },
      end: {
        dateTime: task.dateEnd,
      },
    };

    try {
      const response = await fetch('http://127.0.0.1:3001/event', {
        method: 'POST',
        body: JSON.stringify(eventDetails),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        }
      });

      const res = await response.json();
      if (res?.data?.data?.htmlLink) {
        task.htmlLink = res.data.data.htmlLink
        this._tasksService
          .updateTask(task)
          .subscribe()
        alert('EVENTO CALENDARIZADO CON EXITO')
      }

    } catch (error) {
      console.log('catch', error)
      alert('ERROR AL CALENDARIZAR EVENTO')
    }

  }

  handleShowEvent(task: Task) {
    window.open(task.htmlLink)
  }

  get tasks() {
    return this._tasks;
  }

  set tasks(tasks) {
    this._tasks = tasks;
  }

}
