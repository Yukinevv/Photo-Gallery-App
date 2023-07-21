import { Injectable } from '@angular/core';
import { Task } from '../Models/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks: Array<Task> = [];
  taskId: number = 1;

  getTasks() {
    return this.tasks;
  }

  addTask(taskName: string) {
    this.tasks.push({ id: this.taskId, name: taskName, completed: false });
    this.taskId += 1;
  }

  removeTask(index: number) {
    this.tasks = this.tasks.filter(el => el.id !== index);
  }

  toggleTask(index: number) {
    //const task = this.tasks.find(el => el.id === index);

    //task!.completed = !task!.completed;

    //this.removeTask(index);
    //this.addTask(task!.name);

    //this.tasks[this.tasks.indexOf(task!)].completed = !this.tasks[this.tasks.indexOf(task!)].completed;

    //this.tasks[index - 1].completed = !this.tasks[index - 1].completed;

    this.tasks = this.tasks.map(el => {
      if (el.id === index) {
        el.completed = !el.completed;
      }
      return el;
    });
  }
}
