import { Injectable } from '@angular/core';
import { IDataAction } from 'app/actions/i-data-action';
import { TodoItem } from 'app/components/todo/to-do-item';
import { TodoListService } from 'app/services/todo-list.service';
import { Store } from 'app/store/store';

@Injectable()
export class TodoDeletedAction implements IDataAction<TodoItem> {
  constructor(private store: Store, private todoService: TodoListService) {}

  execute(item: TodoItem) {
    let todoStore = this.store.toDoListStore;
    todoStore.items$.next(
      this.store.toDoListStore.items$.getValue().filter(i => i.id !== item.id)
    );
    this.todoService.updateVisibleItems(todoStore);
  }
}
