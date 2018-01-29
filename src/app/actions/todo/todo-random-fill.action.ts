import { Injectable } from '@angular/core';
import { IAction } from 'app/actions/i-action';
import { TodoItem } from 'app/components/todo/to-do-item';
import { RandomTasksService } from 'app/services/random-tasks.service';
import { TodoListService } from 'app/services/todo-list.service';
import { Store } from 'app/store/store';

@Injectable()
export class TodoRandomFillAction implements IAction {
  constructor(
    private store: Store,
    private randomTasks: RandomTasksService,
    private todoService: TodoListService
  ) {}

  execute() {
    let todoStore = this.store.toDoListStore;
    const tasks = this.randomTasks.getRandTasks();
    for (let task of tasks) {
      let todoItem: TodoItem = {
        id: this.todoService.getNextId(todoStore),
        title: task,
        isChecked: false,
        createdDate: Date.now()
      };
      this.todoService.pushNewItem(todoStore, todoItem);
      this.todoService.updateVisibleItems(todoStore);
    }
  }
}
