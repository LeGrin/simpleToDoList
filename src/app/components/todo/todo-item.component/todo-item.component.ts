import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { TodoItem } from 'app/components/todo/to-do-item';

@Component({
  selector: 'todo-item-component',
  templateUrl: 'todo-item.component.html',
  styleUrls: ['todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() item: TodoItem;
  @Output() onEdited = new EventEmitter<TodoItem>();  
  @Output() onToggled = new EventEmitter<TodoItem>();
  @Output() onDeleted = new EventEmitter<TodoItem>();  

  title: string = '';
  itemClass: string = '';
  isEditing: boolean;

  ngOnInit(): void {
    this.itemClass = this.getClass();
  }

  toggleTask() {
    this.onToggled.emit(this.item);
    this.itemClass = this.getClass();
  }

  get editing() {
    return (this.item === undefined || this.item.id === 0) || this.isEditing;
  }

  activateEditing() {
    this.isEditing = true;
    this.title = this.item.title;
  }

  stopEditing() {
    if (this.item === undefined || this.item.id === 0) {
      this.item = {id: 0, title: '', isChecked: false, createdDate: Date.now()};
      this.item.title = this.title;
      this.onEdited.emit(this.item);
      this.item = {id: 0, title: '', isChecked: false, createdDate: Date.now()};
      this.title = '';      
    } else {
      this.item.title = this.title;
      this.onEdited.emit(this.item);     
      this.isEditing = false; 
    }
  }

  deleteTask() {
    this.onDeleted.emit(this.item);
  }

  cancelEditing() {
    return;
  }

  getClass() {
    return (this.item && this.item.isChecked) ? 'todo-item_completed' : '';
  }
}