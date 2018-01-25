import { Injectable } from '@angular/core';
import { IAction } from 'app/actions/i-action';
import { TodoItem } from 'app/components/todo/to-do-item';
import { RandomTasksService } from 'app/services/random-tasks.service';
import { Store } from 'app/store/store';

@Injectable()
export class TodoRandomFillAction implements IAction {
  constructor(private store: Store, private randomTasks: RandomTasksService) {}

  execute() {
    const tasks = this.randomTasks.getRandTasks();
    for (let task of tasks) {
      let todoItem: TodoItem = {
        id: this.store.toDoListStore.getNextId(),
        title: task,
        isChecked: false,
        createdDate: Date.now()
      };
      this.store.toDoListStore.pushNewItem(todoItem);
      this.store.toDoListStore.updateVisibleItems();
    }
  }
}
