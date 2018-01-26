import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, HammerGestureConfig } from '@angular/platform-browser';
import { ActionsModule } from 'app/actions/actions.module';
import { AppRoutingModule } from 'app/app-routing.module';
import { AppComponent } from 'app/components/app.component';
import { TodoModule } from 'app/components/todo/todo.module';
import { RepositoriesModule } from 'app/repositories/repositories.module';
import { ServicesModule } from 'app/services/services.module';
import { StoreModule } from 'app/store/store.module';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: { velocity: 0.4, threshold: 20 } // override default settings
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    TodoModule,
    AppRoutingModule,
    ActionsModule,
    StoreModule,
    ServicesModule,
    RepositoriesModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
