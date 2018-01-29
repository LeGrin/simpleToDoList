import { Injectable } from '@angular/core';
import { IAction } from 'app/actions/i-action';
import { SearchTodoFilterService } from 'app/services/filters/search-todo-filter.service';
import { TodoListService } from 'app/services/todo-list.service';
import { Store } from 'app/store/store';

@Injectable()
export class TodoSearchToggleFocusAction implements IAction {
  constructor(
    private store: Store,
    private searchTodoFilterService: SearchTodoFilterService,
    private todoService: TodoListService
  ) {}

  execute() {
    let todoStore = this.store.toDoListStore;
    if (this.searchTodoFilterService.previousFilterSaved) {
      this.searchTodoFilterService.searchQuery = '';
      this.searchTodoFilterService.previousFilterSaved = false;
      todoStore.filter$.next(this.searchTodoFilterService.previousFilter);
    } else {
      this.searchTodoFilterService.previousFilter = todoStore.filter$.getValue();
      this.searchTodoFilterService.previousFilterSaved = true;
    }
    this.todoService.updateVisibleItems(todoStore);
  }
}
