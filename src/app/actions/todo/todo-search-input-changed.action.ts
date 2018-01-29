import { Injectable } from '@angular/core';
import { IDataAction } from 'app/actions/i-data-action';
import { SearchTodoFilterService } from 'app/services/filters/search-todo-filter.service';
import { TodoListService } from 'app/services/todo-list.service';
import { Store } from 'app/store/store';

@Injectable()
export class TodoSearchInputChangedAction implements IDataAction<string> {
  constructor(
    private store: Store,
    private searchTodoFilterService: SearchTodoFilterService,
    private todoService: TodoListService
  ) {}

  execute(item: string) {
    let todoStore = this.store.toDoListStore;
    this.searchTodoFilterService.searchQuery = item;
    todoStore.filter$.next(this.searchTodoFilterService);
    this.todoService.updateVisibleItems(todoStore);
  }
}
