import { Injectable } from '@angular/core';
import { IDataAction } from 'app/actions/i-data-action';
import { SearchTodoFilterService } from 'app/services/filters/search-todo-filter.service';
import { Store } from 'app/store/store';

@Injectable()
export class TodoSearchInputChangedAction implements IDataAction<string> {
  constructor(private store: Store, private searchTodoFilterService: SearchTodoFilterService) {}

  execute(item: string) {
    this.searchTodoFilterService.searchQuery = item;
    this.store.toDoListStore.filter$.next(this.searchTodoFilterService);
    this.store.toDoListStore.updateVisibleItems();
  }
}
