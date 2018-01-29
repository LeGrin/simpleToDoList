import { async } from '@angular/core/testing';
import { TodoItem } from '../../components/todo/to-do-item';
import { ToDoListStore } from './to-do-list-store';
describe('ToDoListStore', () => {
  let todoStore: ToDoListStore;  
  beforeEach(
    async(() => {
      todoStore = new ToDoListStore();
    })
  );
  
  it(
    'should create the store',
    async(() => {
      expect(todoStore).toBeTruthy();
    })
  );

  describe('getNextId', () => {
    it('should return 0 at first call', () => {
      const id = todoStore.getNextId();
      expect(id).toEqual(0);
    });

    it('should return new id when list of todos is not empty', () => {
      const item: TodoItem = {
        id: 0,
        title: '',
        isChecked: false,
        createdDate: 0
      };
      todoStore.pushNewItem(items);
      // tslint:disable-next-line:no-console
      console.log(todoStore.items$.getValue());
      const id = todoStore.getNextId();
      expect(id).toEqual(2);
    });
  });
});
