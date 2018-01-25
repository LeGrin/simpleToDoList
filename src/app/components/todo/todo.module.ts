import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActionRibbonComponent } from 'app/components/todo/action-ribbon.component/action-ribbon.component';
import { TodoItemComponent } from 'app/components/todo/todo-item.component/todo-item.component';
import { SharedModule } from '../shared/shared.module';
import { TodoComponent } from './todo.component';

@NgModule({
  imports: [SharedModule, FormsModule],
  exports: [TodoComponent],
  declarations: [TodoComponent, TodoItemComponent, ActionRibbonComponent]
})
export class TodoModule {}
