import { Component, OnInit } from '@angular/core';
import { ISector } from '../models/ISector';
import { Observable } from 'rxjs';
import { ITableCell } from '../models/ITableCell';
import { MainTableService } from '../Services/MainTable/main-table.service';
import { StartingDataService } from '../Services/StartingData/starting-data.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  public headingRow: string[] = [];
  public sectors: ISector[] = [];
  public $table!: Observable<ITableCell[][]>;
  constructor (private mainTableService: MainTableService, private staringDataService: StartingDataService)
  {
  }
  ngOnInit(): void
  {
    this.$table = this.mainTableService._$actualTable;
    this.headingRow = this.mainTableService.headingRow;
    this.sectors = this.staringDataService.sectors;
  }
}
