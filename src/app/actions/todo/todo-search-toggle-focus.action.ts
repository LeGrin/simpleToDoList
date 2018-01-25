import { Injectable } from '@angular/core';
import { IAction } from 'app/actions/i-action';
import { SearchTodoFilterService } from 'app/services/filters/search-todo-filter.service';
import { Store } from 'app/store/store';

@Injectable()
export class TodoSearchToggleFocusAction implements IAction {
  constructor(private store: Store, private searchTodoFilterService: SearchTodoFilterService) {}

  execute() {
    if (this.searchTodoFilterService.previousFilterSaved) {
      this.searchTodoFilterService.searchQuery = '';
      this.searchTodoFilterService.previousFilterSaved = false;
      this.store.toDoListStore.filter$.next(this.searchTodoFilterService.previousFilter);
    } else {
      this.searchTodoFilterService.previousFilter = this.store.toDoListStore.filter$.getValue();     
      this.searchTodoFilterService.previousFilterSaved = true; 
    }
    this.store.toDoListStore.updateVisibleItems();
  }
}
