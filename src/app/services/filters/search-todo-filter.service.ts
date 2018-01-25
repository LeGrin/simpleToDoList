import { TodoItem } from 'app/components/todo/to-do-item';
import { ITodoFilter } from 'app/services/i-todo-filter';

export class SearchTodoFilterService implements ITodoFilter {
  public searchQuery: string = '';
  public previousFilter: ITodoFilter;
  public previousFilterSaved: boolean;
  public filter = (value: TodoItem, index: number, array: TodoItem[]) => {
    return value.title.toUpperCase().indexOf(this.searchQuery.toUpperCase()) !== -1;
  }
}