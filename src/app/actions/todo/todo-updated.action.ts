import { Injectable } from '@angular/core';
import { IDataAction } from 'app/actions/i-data-action';
import { TodoItem } from 'app/components/todo/to-do-item';
import { Store } from 'app/store/store';

@Injectable()
export class TodoUpdatedAction implements IDataAction<TodoItem> {
  constructor(private store: Store) {}

  execute(item: TodoItem) {
    if (item.id === 0) {
      item.id = this.store.toDoListStore.getNextId();
      this.store.toDoListStore.pushNewItem(item);      
    } else {
      let updatedItem = this.store.toDoListStore.items$.getValue().find(i => i.id === item.id);
      if (updatedItem) {
        updatedItem.title = item.title;
      }
    }
    this.store.toDoListStore.updateVisibleItems();
  }
}
