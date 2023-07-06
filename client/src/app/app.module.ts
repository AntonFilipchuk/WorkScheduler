import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainTableComponent } from './planning/main-table/main-table.component';
import { SelectableCellComponent } from './planning/main-table/selectable-cell/selectable-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    MainTableComponent,
    SelectableCellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
