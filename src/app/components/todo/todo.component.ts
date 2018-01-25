import { Component } from '@angular/core';
import { TodoDeletedAction } from 'app/actions/todo/todo-deleted.action';
import { TodoRandomFillAction } from 'app/actions/todo/todo-random-fill.action';
import { TodoSearchInputChangedAction } from 'app/actions/todo/todo-search-input-changed.action';
import { TodoSearchToggleFocusAction } from 'app/actions/todo/todo-search-toggle-focus.action';
import { TodoToggleCompletedVisibilityAction } from 'app/actions/todo/todo-toggle-completed-visibility.action';
import { TodoToggleAction } from 'app/actions/todo/todo-toggle.action';
import { TodoUpdatedAction } from 'app/actions/todo/todo-updated.action';
import { Store } from 'app/store/store';
import { Observable } from 'rxjs/Observable';
import { TodoItem } from './to-do-item';

@Component({
  selector: 'todo-component',
  templateUrl: 'todo.component.html',
  styleUrls: ['todo.component.scss']
})
export class TodoComponent {
  items$: Observable<TodoItem[]>;
  length$: Observable<number>;
  isCompletedVisible$: Observable<boolean>;

  constructor(
    store: Store,
    private todoUpdatedAction: TodoUpdatedAction,
    private todoToggleAction: TodoToggleAction,
    private todoDeletedAction: TodoDeletedAction,
    private todoRandomFillAction: TodoRandomFillAction,
    private todoToggleCompletedVisibilityAction: TodoToggleCompletedVisibilityAction,
    private todoSearchInputChangedAction: TodoSearchInputChangedAction,
    private todoSearchToggleFocusAction: TodoSearchToggleFocusAction
  ) {
    const todo = store.toDoListStore;

    this.items$ = todo.visibleItems$;
    this.isCompletedVisible$ = todo.isCompletedVisible$;
  }

  update(item: TodoItem) {
    this.todoUpdatedAction.execute(item);
  }

  toggle(item: TodoItem) {
    this.todoToggleAction.execute(item);
  }

  delete(item: TodoItem) {
    this.todoDeletedAction.execute(item);
  }

  inspire() {
    this.todoRandomFillAction.execute();
  }

  hideCompleted() {
    this.todoToggleCompletedVisibilityAction.execute();
  }

  searchChanged(query: string) {
    this.todoSearchInputChangedAction.execute(query);
  }

  searchFocusToggled() {
    this.todoSearchToggleFocusAction.execute();
  }
}
