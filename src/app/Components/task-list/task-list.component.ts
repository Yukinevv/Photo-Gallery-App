import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../Services/task-service.service';
import { Task } from '../../Models/Task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Array<Task> = [];

  newTask: string = '';

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  addTask() {
    if (this.newTask.trim().length === 0) {
      return;
    }

    this.taskService.addTask(this.newTask);
    this.newTask = '';
    this.tasks = this.taskService.getTasks();
  }

  removeTask(index: number) {
    this.taskService.removeTask(index);
    this.tasks = this.taskService.getTasks();
  }

  toggleTask(index: number) {
    this.taskService.toggleTask(index);
    this.tasks = this.taskService.getTasks();
  }
}
