import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MainTableService } from 'src/app/Services/MainTable/main-table.service';
import { ITableCell } from 'src/app/models/ITableCell';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})
export class MainTableComponent implements OnInit
{

  public headingRow: string[] = [];
  public $table! : Observable<ITableCell[][]>;
  constructor (private mainTableService: MainTableService)
  {
  }
  ngOnInit(): void
  {
    this.$table = this.mainTableService._$actualTable;
    this.headingRow= this.mainTableService.headingRow;
  }
}
