import { Injectable } from '@angular/core';
import { IDataAction } from 'app/actions/i-data-action';
import { TodoItem } from 'app/components/todo/to-do-item';
import { Store } from 'app/store/store';

@Injectable()
export class TodoDeletedAction implements IDataAction<TodoItem> {
  constructor(private store: Store) {}

  execute(item: TodoItem) {
    this.store.toDoListStore.items$.next(this.store.toDoListStore.items$.getValue().filter(i => i.id !== item.id));
    this.store.toDoListStore.updateVisibleItems();
  }
}
