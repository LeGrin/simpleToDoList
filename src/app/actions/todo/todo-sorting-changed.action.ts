import { Injectable } from '@angular/core';
import { IDataAction } from 'app/actions/i-data-action';
import { TodoListService } from 'app/services/todo-list.service';
import { Store } from 'app/store/store';

@Injectable()
export class TodoSortingChangedAction implements IDataAction<string> {
  constructor(private store: Store, private todoService: TodoListService) {}

  execute(query: string) {
    let todoStore = this.store.toDoListStore;
    todoStore.sortQuery$.next(query);
    this.todoService.updateVisibleItems(todoStore);
  }
}
