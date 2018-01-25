import { ToDoListStore } from './todo-list/to-do-list-store';

export class Store {
  readonly toDoListStore = new ToDoListStore();
}
