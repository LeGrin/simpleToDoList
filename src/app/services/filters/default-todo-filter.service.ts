import { TodoItem } from 'app/components/todo/to-do-item';
import { ITodoFilter } from 'app/services/i-todo-filter';

export class DefaultTodoFilterService implements ITodoFilter {
  public filter(value: TodoItem, index: number, array: TodoItem[]): TodoItem {
    return value;
  }
}