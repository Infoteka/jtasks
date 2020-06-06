import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { TasksComponent } from './tasks.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule
  ],
  exports: [TasksComponent]
})
export class TasksModule { }
