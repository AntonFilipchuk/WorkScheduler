import { Component, Input, OnInit } from '@angular/core';
import { EmployeeSelectionService } from 'src/app/Services/EmployeeSelection/employee-selection.service';
import { MainTableService } from 'src/app/Services/MainTable/main-table.service';
import { StartingDataService } from 'src/app/Services/StartingData/starting-data.service';
import { IEmployee } from 'src/app/models/IEmployee';
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

  public ifShowBorder: boolean = false;
  public ifSelectorActive: boolean = false;
  public ifCellDisabled: boolean = false;

  public ifEmployeeWhoWasChosenShouldBeSet: boolean = false;

  constructor (
    private mainTableService: MainTableService,
    private startingDataService: StartingDataService,
    private employeeSelectionService: EmployeeSelectionService) { }

  ngOnInit(): void
  {
  }

  private getTable()
  {

  }

  public setSelectedEmployee(employee: IEmployee | undefined)
  {
    if (employee)
    {
      this.mainTableService.setEmployeeAndUpdateTables(this.cell, employee);
      this.cellColor = employee.color;
    }
  }

  onEmployeeSelection(selectedEmployee: IEmployee | undefined)
  {
    this.ifShowBorder = false;
    this.ifSelectorActive = false;
    // this.planningTableService.setEmployeeWhoWasChosenForSelection(employee);
    // this.planningTableService.setRowNumberOfSelectedEmployee(this.rowNumber);
    // this.planningTableService.setEmployeeInRow(
    //   employee,
    //   this.rowNumber,
    //   this.columnNumber
    // );
  }

  public getEmployeesForSelection()
  {
    this.employeesForSelection = this.employeeSelectionService.getEmployeesForSelection(this.cell);
  }

  public toggleBorderAndSelectorVisibility()
  {

  }

  mouseHasTouchedCellWhereEmployeeWasSelected()
  {

  }

  // setSelectedEmployee()
  // {

  // }

  disableSelectionOfSelectedEmployee()
  {

  }

  public selectionActive()
  {
    this.ifSelectorActive = true;
    //this.planningTableService.setColumnNumberWhereSelectionIsActive(this.columnNumber);
  }

  public selectionNotActive()
  {
    this.ifSelectorActive = false;
  }

  public onSelectorClose()
  {
    if (!this.ifEmployeeWhoWasChosenShouldBeSet)
    {
      //this.planningTableService.setColumnNumberWhereSelectionIsActive(-1);
    }
  }



}
