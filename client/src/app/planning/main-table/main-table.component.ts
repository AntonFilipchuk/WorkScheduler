import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MainTableService } from 'src/app/Services/MainTable/main-table.service';
import { ITable } from 'src/app/models/ITable';
import { ITableCell } from 'src/app/models/ITableCell';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})
export class MainTableComponent implements OnInit
{

  public headingRow: string[] = [];
  //public table: ITableCell[][] = [];
  public $table! : Observable<ITableCell[][]>;
  constructor (private mainTableService: MainTableService)
  {
  }
  ngOnInit(): void
  {
    // let dataForTable: ITable = this.mainTableService.dataForTable;
    // this.headingRow = dataForTable.headingRow;
    this.$table = this.mainTableService._$actualTable;
    this.headingRow= this.mainTableService.headingRow;
  }
}
