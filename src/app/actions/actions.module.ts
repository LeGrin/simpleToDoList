import { NgModule } from '@angular/core';
import { TodoDeletedAction } from 'app/actions/todo/todo-deleted.action';
import { TodoRandomFillAction } from 'app/actions/todo/todo-random-fill.action';
import { TodoSearchInputChangedAction } from 'app/actions/todo/todo-search-input-changed.action';
import { TodoSearchToggleFocusAction } from 'app/actions/todo/todo-search-toggle-focus.action';
import { TodoSortingChangedAction } from 'app/actions/todo/todo-sorting-changed.action';
import { TodoToggleCompletedVisibilityAction } from 'app/actions/todo/todo-toggle-completed-visibility.action';
import { TodoToggleAction } from 'app/actions/todo/todo-toggle.action';
import { TodoUpdatedAction } from 'app/actions/todo/todo-updated.action';

@NgModule({
  providers: [
    TodoUpdatedAction,
    TodoToggleAction,
    TodoDeletedAction,
    TodoRandomFillAction,
    TodoToggleCompletedVisibilityAction,
    TodoSearchInputChangedAction,
    TodoSearchToggleFocusAction,
    TodoSortingChangedAction
  ]
})
export class ActionsModule {}
