import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/Models/Task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent {
  @Input() task?: Task;
  @Output() removeTask: EventEmitter<number> = new EventEmitter<number>();
  @Output() toggleTask: EventEmitter<number> = new EventEmitter<number>();

  remove() {
    this.removeTask.emit(this.task?.id);
  }

  toggle() {
    this.toggleTask.emit(this.task?.id);
  }
}
