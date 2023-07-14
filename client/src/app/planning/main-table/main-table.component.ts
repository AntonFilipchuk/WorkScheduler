import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MainTableService } from 'src/app/Services/MainTable/main-table.service';
import { StartingDataService } from 'src/app/Services/StartingData/starting-data.service';
import { ISector } from 'src/app/models/ISector';
import { ITableCell } from 'src/app/models/ITableCell';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})
export class MainTableComponent implements OnInit, AfterViewInit
{

  public headingRow: string[] = [];
  public sectors: ISector[] = [];
  public $table!: Observable<ITableCell[][]>;
  constructor (private mainTableService: MainTableService, private staringDataService: StartingDataService)
  {
  }
  ngAfterViewInit(): void
  {
    const firstTimeCell = document.getElementById('time-cell');
    if (firstTimeCell)
    {
      let width : number = firstTimeCell.getBoundingClientRect().width;
      const timeHeading = document.getElementById('time');
     if(timeHeading)
     {
      timeHeading.style.width = `${width}px`;
     }
    }
  }
  ngOnInit(): void
  {
    this.$table = this.mainTableService._$actualTable;
    this.headingRow = this.mainTableService.headingRow;
    this.sectors = this.staringDataService.sectors;

  }
}
