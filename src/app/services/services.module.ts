import { NgModule } from '@angular/core';
import { DefaultTodoFilterService } from 'app/services/filters/default-todo-filter.service';
import { HideVisibleTodoFilterService } from 'app/services/filters/hide-visible-todo-filter.service';
import { SearchTodoFilterService } from 'app/services/filters/search-todo-filter.service';
import { RandomTasksService } from 'app/services/random-tasks.service';

@NgModule({
  providers: [
    RandomTasksService,
    HideVisibleTodoFilterService,
    DefaultTodoFilterService,
    SearchTodoFilterService
  ]
})
export class ServicesModule {}
