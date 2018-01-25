import { TodoItem } from 'app/components/todo/to-do-item';
import { ITodoFilter } from 'app/services/i-todo-filter';

export class HideVisibleTodoFilterService implements ITodoFilter {
  public filter(value: TodoItem, index: number, array: TodoItem[]) {
    return value.isChecked === false;
  }
}