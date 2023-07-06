import { Injectable } from '@angular/core';
import { ITableCell } from 'src/app/models/ITableCell';
import { ReplaySubject } from 'rxjs';
import { IEmployee } from 'src/app/models/IEmployee';
import { ISector } from 'src/app/models/ISector';
import { StartingDataService } from '../StartingData/starting-data.service';
import { ITable } from 'src/app/models/ITable';

@Injectable({
  providedIn: 'root'
})

//Service for *only* changing the main table
//
export class MainTableService
{
  public _$fullTable: ReplaySubject<ITableCell[][]> = new ReplaySubject<ITableCell[][]>();
  private _fullTable: ITableCell[][];

  public _$actualTable: ReplaySubject<ITableCell[][]> = new ReplaySubject<ITableCell[][]>();
  private _actualTable: ITableCell[][];

  public headingRow!: string[];


  constructor (private startingData: StartingDataService)
  {
    this._fullTable = startingData.fullTableAs2DArray;
    this._actualTable = startingData.actualTable;
    this.headingRow = startingData.headingRow;

    this._$actualTable.next(this._actualTable);
    this._$fullTable.next(this._fullTable);


  }

  public setEmployeeAndUpdateTables(cell: ITableCell, employee: IEmployee)
  {
    //Need to update 2 tables:
    //Full table and actual table
    this.setEmployeeAndUpdateFullTable(this._fullTable, cell, employee);
    this._$fullTable.next(this._fullTable);
    this.setEmployeeAndUpdateTable(this._actualTable, cell, employee);
    this._$actualTable.next(this._actualTable);
  }


  private setEmployeeAndUpdateFullTable(table: ITableCell[][], cell: ITableCell, employee: IEmployee)
  {
    let childSectors: ISector[] | undefined = cell.sector.childSectors;
    //If sector has any children
    //We must change all child sectors in full table at the same row
    if (childSectors)
    {
      childSectors.forEach((sector) => 
      {
        table
          .flat()
          .find(c => (c.rowNumber === cell.rowNumber) && (c.sector.name === sector.name))!
          .employee = employee;
      });
    }
    else
    {
      this.setEmployeeAndUpdateTable(table, cell, employee);
    }
  }

  private setEmployeeAndUpdateTable(table: ITableCell[][], cell: ITableCell, employee: IEmployee)
  {
    console.log(table);
    table.flat().find(c => c.id === cell.id)!.employee = employee;
  }
}
