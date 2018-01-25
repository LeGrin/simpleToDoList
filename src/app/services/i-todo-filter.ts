import { TodoItem } from 'app/components/todo/to-do-item';

export interface ITodoFilter {
  filter: (value: TodoItem, index: number, array: TodoItem[]) => {};
}