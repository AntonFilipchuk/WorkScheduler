import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainTableComponent } from './planning/main-table/main-table.component';
import { SelectableCellComponent } from './planning/main-table/selectable-cell/selectable-cell.component';
import { PlanningComponent } from './planning/planning.component';
import { FormsModule } from '@angular/forms';
import { TestComponent } from './test/test.component';



@NgModule({
  declarations: [
    AppComponent,
    MainTableComponent,
    SelectableCellComponent,
    PlanningComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
