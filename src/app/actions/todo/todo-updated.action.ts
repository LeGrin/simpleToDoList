import { Injectable } from '@angular/core';
import { IDataAction } from 'app/actions/i-data-action';
import { TodoItem } from 'app/components/todo/to-do-item';
import { TodoListService } from 'app/services/todo-list.service';
import { Store } from 'app/store/store';

@Injectable()
export class TodoUpdatedAction implements IDataAction<TodoItem> {
  constructor(private store: Store, private todoService: TodoListService) {}

  execute(item: TodoItem) {
    let todoStore = this.store.toDoListStore;
    if (item.id === 0) {
      item.id = this.todoService.getNextId(todoStore);
      this.todoService.pushNewItem(todoStore, item);      
    } else {
      let updatedItem = todoStore.items$.getValue().find(i => i.id === item.id);
      if (updatedItem) {
        updatedItem.title = item.title;
      }
    }
    this.todoService.updateVisibleItems(todoStore);
  }
}
