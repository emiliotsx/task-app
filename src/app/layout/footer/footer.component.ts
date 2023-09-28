import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { PATH_NAMES } from '../../constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  @Output() readonly addTask: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private _router: Router) { }

  async handleAddTask() {
    this._router.navigate([PATH_NAMES.TASKS_CREATE])
  }

  get currentYear() {
    return new Date().getFullYear()
  }
}
