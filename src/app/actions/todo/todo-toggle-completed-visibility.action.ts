import { Injectable } from '@angular/core';
import { IAction } from 'app/actions/i-action';
import { DefaultTodoFilterService } from 'app/services/filters/default-todo-filter.service';
import { HideVisibleTodoFilterService } from 'app/services/filters/hide-visible-todo-filter.service';
import { Store } from 'app/store/store';

@Injectable()
export class TodoToggleCompletedVisibilityAction implements IAction {
  constructor(
    private store: Store,
    private defaultTodoFilter: DefaultTodoFilterService,
    private hideVisibleTodoFilter: HideVisibleTodoFilterService
  ) {}

  execute() {
    this.store.toDoListStore.isCompletedVisible$.next(
      !this.store.toDoListStore.isCompletedVisible$.getValue()
    );
    this.store.toDoListStore.filter$.next(
      this.store.toDoListStore.isCompletedVisible$.getValue()
        ? this.defaultTodoFilter
        : this.hideVisibleTodoFilter
    );
    this.store.toDoListStore.updateVisibleItems();
  }
}
