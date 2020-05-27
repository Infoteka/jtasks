import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NganttComponent } from './ngantt/ngantt.component';
import { TasksModule} from 'tasks'

@NgModule({
  declarations: [
    AppComponent,
    NganttComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TasksModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
