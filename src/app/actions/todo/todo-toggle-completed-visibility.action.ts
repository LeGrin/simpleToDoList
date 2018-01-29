import { Injectable } from '@angular/core';
import { IAction } from 'app/actions/i-action';
import { DefaultTodoFilterService } from 'app/services/filters/default-todo-filter.service';
import { HideVisibleTodoFilterService } from 'app/services/filters/hide-visible-todo-filter.service';
import { TodoListService } from 'app/services/todo-list.service';
import { Store } from 'app/store/store';

@Injectable()
export class TodoToggleCompletedVisibilityAction implements IAction {
  constructor(
    private store: Store,
    private defaultTodoFilter: DefaultTodoFilterService,
    private hideVisibleTodoFilter: HideVisibleTodoFilterService,
    private todoService: TodoListService
  ) {}

  execute() {
    let todoStore = this.store.toDoListStore;
    todoStore.isCompletedVisible$.next(
      !todoStore.isCompletedVisible$.getValue()
    );
    todoStore.filter$.next(
      todoStore.isCompletedVisible$.getValue()
        ? this.defaultTodoFilter
        : this.hideVisibleTodoFilter
    );
    this.todoService.updateVisibleItems(todoStore);
  }
}
