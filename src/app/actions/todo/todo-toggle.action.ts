import { Injectable } from '@angular/core';
import { IDataAction } from 'app/actions/i-data-action';
import { TodoItem } from 'app/components/todo/to-do-item';
import { Store } from 'app/store/store';

@Injectable()
export class TodoToggleAction implements IDataAction<TodoItem> {
  constructor(private store: Store) {}

  execute(item: TodoItem) {
    let updatedItem = this.store.toDoListStore.items$.getValue().find(i => i.id === item.id);
    if (updatedItem) {
      updatedItem.isChecked = !updatedItem.isChecked;
    }
    this.store.toDoListStore.updateVisibleItems();
  }
}
