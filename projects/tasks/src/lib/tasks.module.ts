import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TasksComponent } from './tasks.component';



@NgModule({
  declarations: [TasksComponent],
  imports: [
    BrowserModule
  ],
  exports: [TasksComponent]
})
export class TasksModule { }
