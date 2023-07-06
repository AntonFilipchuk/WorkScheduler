import { Component, Input } from '@angular/core';
import { MainTableService } from 'src/app/Services/MainTable/main-table.service';
import { StartingDataService } from 'src/app/Services/StartingData/starting-data.service';
import { IEmployee } from 'src/app/models/IEmployee';
import { ITableCell } from 'src/app/models/ITableCell';

@Component({
  selector: 'app-selectable-cell',
  templateUrl: './selectable-cell.component.html',
  styleUrls: ['./selectable-cell.component.scss']
})
export class SelectableCellComponent {

  @Input() cell! : ITableCell;

  constructor(private mainTableService: MainTableService,
    private startingDataService : StartingDataService)
  {

  }

  public setTestEmployee()
  {
    let employees = this.startingDataService.employees;
    let randomEmployee: IEmployee = employees[Math.floor(Math.random() * employees.length)];
    let t: ITableCell[][] = [];
    this.mainTableService._$actualTable.subscribe(
      {
        next: (table: ITableCell[][]) =>
        {
          t = table;
        }
      }
    );

    this.mainTableService.setEmployeeAndUpdateTables(this.cell, randomEmployee);

    console.log('Set');
    
  }
}
