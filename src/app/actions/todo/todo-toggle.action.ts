import { Injectable } from '@angular/core';
import { IDataAction } from 'app/actions/i-data-action';
import { TodoItem } from 'app/components/todo/to-do-item';
import { TodoListService } from 'app/services/todo-list.service';
import { Store } from 'app/store/store';

@Injectable()
export class TodoToggleAction implements IDataAction<TodoItem> {
  constructor(private store: Store, private todoService: TodoListService) {}

  execute(item: TodoItem) {
    let todoStore = this.store.toDoListStore;
    let updatedItem = todoStore.items$.getValue().find(i => i.id === item.id);
    if (updatedItem) {
      updatedItem.isChecked = !updatedItem.isChecked;
    }
    this.todoService.updateVisibleItems(todoStore);
  }
}
