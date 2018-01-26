import { Injectable } from '@angular/core';
import { IDataAction } from 'app/actions/i-data-action';
import { Store } from 'app/store/store';

@Injectable()
export class TodoSortingChangedAction implements IDataAction<string> {
  constructor(private store: Store) {}

  execute(query: string) {
    this.store.toDoListStore.sortQuery$.next(query);
    this.store.toDoListStore.updateVisibleItems();
  }
}
