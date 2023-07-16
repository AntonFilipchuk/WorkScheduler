import { Component, Input, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { EmployeeSelectionService } from 'src/app/Services/EmployeeSelection/employee-selection.service';
import { MainTableService } from 'src/app/Services/MainTable/main-table.service';
import { StartingDataService } from 'src/app/Services/StartingData/starting-data.service';
import { IEmployee } from 'src/app/models/IEmployee';
import { ISector } from 'src/app/models/ISector';
import { ITableCell } from 'src/app/models/ITableCell';

@Component({
  selector: 'app-selectable-cell',
  templateUrl: './selectable-cell.component.html',
  styleUrls: ['./selectable-cell.component.scss']
})
export class SelectableCellComponent implements OnInit
{

  @Input() cell!: ITableCell;

  cellColor: string = 'grey';

  public employeesForSelection: IEmployee[] = [];

  public selectedEmployee: IEmployee | undefined;

  public $sectorWhereSelectionIsActive!: ReplaySubject<ISector | undefined>;


  public ifShowSelector: boolean = false;
  public ifShowBorder: boolean = false;
  public ifSelectorActive: boolean = false;
  public ifCellDisabled: boolean = false;

  public ifEmployeeWhoWasChosenShouldBeSet: boolean = false;

  constructor (
    private mainTableService: MainTableService,
    private startingDataService: StartingDataService,
    private employeeSelectionService: EmployeeSelectionService)
  {

  }

  ngOnInit(): void
  {

  }

  public toggleSelectorVisibility()
  {
    this.ifShowSelector = !this.ifShowSelector;
  }

  public getEmployeesForSelection()
  {
    this.employeesForSelection = this.employeeSelectionService.getEmployeesForSelection(this.cell);
  }

  public setSelectedEmployee(selectedEmployee: IEmployee | undefined)
  {
    if (selectedEmployee)
    {
      this.mainTableService.setEmployeeAndUpdateTables(this.cell, selectedEmployee);
      this.cellColor = selectedEmployee.color;
    }
  }

  public setSelectionActive()
  {
    this.ifSelectorActive = true;
  }

  setSelectionNotActive()
  {
    this.ifSelectorActive = false;
  }
}
