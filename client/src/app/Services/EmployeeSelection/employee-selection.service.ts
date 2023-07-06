import { Injectable } from '@angular/core';
import { MainTableService } from '../MainTable/main-table.service';
import { Observable } from 'rxjs';
import { ITableCell } from 'src/app/models/ITableCell';
import { IEmployee } from 'src/app/models/IEmployee';
import { StartingDataService } from '../StartingData/starting-data.service';
import { EmployeesWhoCanWorkEvaluator } from 'src/app/Helpers/EmployeesWhoCanWorkEvaluator';

@Injectable({
  providedIn: 'root'
})
export class EmployeeSelectionService
{
  public employeesForSelection: IEmployee[] = [];
  private table!: ITableCell[][];
  constructor (
    private mainTableService: MainTableService,
    private startingDataService: StartingDataService)
  {
    this.table = this.getTable(this.mainTableService._$actualTable);
  }

  private getTable($table: Observable<ITableCell[][]>): ITableCell[][]
  {
    let table: ITableCell[][] = [];
    $table.subscribe(
      {
        next: (t) => 
        {
          table = t;
        },
        error: (e) =>
        {
          console.log(e);
          throw new Error(e);
        }
      }
    );
    return table;
  }

  public getEmployeesForSelection(cell: ITableCell)
  {
    let employeesWhoCanWorkEvaluator = new EmployeesWhoCanWorkEvaluator();
    let employeesForShift = this.startingDataService.employees;
    let maxWorkTimeInMinutes = this.startingDataService.maxWorkTimeInMinutes;
    let minRestTimeInMinutes = this.startingDataService.minRestTimeInMinutes;
    let timeIntervalInMinutes = this.startingDataService.timeIntervalInMinutes;

    return employeesWhoCanWorkEvaluator.getEmployeesWhoCanWork(
      cell,
      employeesForShift,
      this.table,
      maxWorkTimeInMinutes,
      minRestTimeInMinutes,
      timeIntervalInMinutes
    );
  }

  // private getColumnNumberWhereSelectionIsActive()
  // {
  //   this.mainTableService
  //     .getColumnNumberWhereSelectionIsActiveObservable()
  //     .subscribe({
  //       next: (columnNumber: number) =>
  //       {
  //         this.checkIfCellShouldBeActive(columnNumber);
  //       },
  //       error: (e) =>
  //       {
  //         console.log(e);
  //       },
  //     });
  // }
}
