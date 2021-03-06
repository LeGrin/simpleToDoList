import { TodoItem } from 'app/components/todo/to-do-item';
import { DefaultTodoFilterService } from 'app/services/filters/default-todo-filter.service';
import { ITodoFilter } from 'app/services/i-todo-filter';
import { SortingService } from 'app/services/sorting.service';
import { BehaviorSubject } from 'rxjs';

export class ToDoListStore {
  readonly items$ = new BehaviorSubject<TodoItem[]>([]);
  readonly visibleItems$ = new BehaviorSubject<TodoItem[]>([]);
  readonly filter$ = new BehaviorSubject<ITodoFilter>(
    DefaultTodoFilterService.prototype
  );
  readonly sorting$ = new BehaviorSubject<SortingService>(
    SortingService.prototype
  );
  readonly length$ = new BehaviorSubject<number>(0);
  readonly sortQuery$ = new BehaviorSubject<string>('title#1');
  readonly isCompletedVisible$ = new BehaviorSubject<boolean>(true);
  getNextId = (): number => {
    return (
      (this.items$
        .getValue()
        .map((i: TodoItem) => i.id)
        .sort((a: number, b: number) => {
          return a > b ? -1 : 1;
        })[0] || 0) + 1
    );
  };

  pushNewItem = (newItem: TodoItem) => {
    this.items$.next([newItem].concat(this.items$.getValue()));
    this.length$.next(this.length$.getValue() + 1);
    this.updateVisibleItems();
  };

  updateVisibleItems = () => {
    const visibleItems = this.items$
      .getValue()
      .filter(this.filter$.getValue().filter)
      .sort(this.sorting$.getValue().getSorting(this.sortQuery$.getValue()));
    this.visibleItems$.next(this.moveCheckedToEnd(visibleItems));
  };

  private moveCheckedToEnd(items: TodoItem[]): TodoItem[] {
    const checked = items.filter(i => i.isChecked);
    const unChecked = items.filter(i => !i.isChecked);
    return unChecked.concat(checked);
  }
}
