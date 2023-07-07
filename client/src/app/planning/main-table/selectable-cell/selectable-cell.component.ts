import { Component, Input, OnInit } from '@angular/core';
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


  public ifShowSelector: boolean = false;
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

  public setSelectedEmployee(selectedEmployee: IEmployee | undefined)
  {
    if (selectedEmployee)
    {
      this.mainTableService.setEmployeeAndUpdateTables(this.cell, selectedEmployee);
      this.cellColor = selectedEmployee.color;
    }
  }

  onEmployeeSelection(selectedEmployee: IEmployee | undefined)
  {
    this.ifShowBorder = false;
    this.ifSelectorActive = false;
    this.employeeSelectionService._$employeeWhoWasChosenForSelection.next(selectedEmployee);
    this.setSelectedEmployee(selectedEmployee);
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
    this.ifShowBorder = !this.ifShowBorder;
    this.ifShowSelector = !this.ifShowSelector;
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
    this.employeeSelectionService._$sectorWhereSelectionIsActive.next(this.cell.sector);
  }

  public selectionNotActive()
  {
    this.ifSelectorActive = false;
  }

  public onSelectorClose()
  {
    if (!this.ifEmployeeWhoWasChosenShouldBeSet)
    {
      this.employeeSelectionService._$sectorWhereSelectionIsActive.next(undefined);
    }
  }


  private getColumnNumberWhereSelectionIsActive()
  {
    this.employeeSelectionService._$sectorWhereSelectionIsActive
      .subscribe({
        next: (sector: ISector | undefined) =>
        {
          this.checkIfCellShouldBeActive(sector);
        },
        error: (e) =>
        {
          console.log(e);
        },
      });
  }

  private checkIfCellShouldBeActive(sector: ISector | undefined)
  {
    this.ifCellDisabled = Boolean(sector) && (this.cell.sector.name !== sector!.name);
    this.setCellColor();
  }

  private setCellColor()
  {
    let employee = this.cell.employee;
    if (employee)
    {
      this.cellColor = employee.color;
    }
    else if (this.ifCellDisabled)
    {
      this.cellColor = 'lightGrey';
    }
    else
    {
      this.cellColor = 'grey';
    }
  }


  public onSelectCloseTest()
  {
    console.log('Selection closed');
    
  }
}
