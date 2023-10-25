import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { STATUS, PATH_NAMES } from '../../constants'
import { getTasksInStorage, updateTasksInStorage, deleteTasksInStorage } from '../../utils'
import { ScriptLoaderService } from '../../services/script-loader.service'


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  private _tasks: Task[] = []

  constructor(
    private _router: Router,
    private _scriptLoaderService: ScriptLoaderService
  ) {

  }

  ngOnInit(): void {
    // this._tasks = getTasksInStorage()
    // this._scriptLoaderService.loadScript('/services/google.calendar.service.js').then((response) => {
    //   // El script se ha cargado con éxito
    //   // Puedes ejecutar código relacionado con el script aquí
    //   console.log('response', response)
    // }).catch((error) => {
    //   console.error('Error al cargar el script:', error);
    // });
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

  handleCreateEvent(task: Task) {
    // console.log('-- handleCreateEvent --', task);
    const eventDetails = {
      summary: task.description,
      description: task.details,
      start: {
        dateTime: task.date,
      },
      end: {
        dateTime: "2023-10-31T00:00:00.000Z",
      },
    };

    // this._googleCalendarService
    //   .createEvent(eventDetails)
    //   .then((response: any) => console.log('Evento creado:', response.result.htmlLink))
    //   .catch(error => console.log('== ERROR ==', error));

  }

  get tasks() {
    return this._tasks;
  }

  set tasks(tasks) {
    this._tasks = tasks;
  }

}
