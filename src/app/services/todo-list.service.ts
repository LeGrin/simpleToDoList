import { Injectable } from '@angular/core';
import { TodoItem } from 'app/components/todo/to-do-item';
import { ToDoListStore } from 'app/store/todo-list/to-do-list-store';

@Injectable()
export class TodoListService {
  public getNextId = (store: ToDoListStore): number => {
    return (
      (store.items$
        .getValue()
        .map((i) => i.id)
        .sort((a: number, b: number) => {
          return a > b ? -1 : 1;
        })[0] || 0) + 1
    );
  };

  pushNewItem = (store: ToDoListStore, newItem: TodoItem) => {
    store.items$.next([newItem].concat(store.items$.getValue()));
    store.length$.next(store.length$.getValue() + 1);
    this.updateVisibleItems(store);
  };

  updateVisibleItems = (store: ToDoListStore) => {
    const visibleItems = store.items$
      .getValue()
      .filter(store.filter$.getValue().filter)
      .sort(store.sorting$.getValue().getSorting(store.sortQuery$.getValue()));
      store.visibleItems$.next(this.moveCheckedToEnd(visibleItems));
  };

  private moveCheckedToEnd(items: TodoItem[]): TodoItem[] {
    const checked = items.filter(i => i.isChecked);
    const unChecked = items.filter(i => !i.isChecked);
    return unChecked.concat(checked);
  }
}
