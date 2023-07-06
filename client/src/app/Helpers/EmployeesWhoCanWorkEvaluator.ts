import { IEmployee } from "../models/IEmployee";
import { ISector } from "../models/ISector";
import { ITableCell } from "../models/ITableCell";
import { IWorkAndRestTimeInfo } from "../models/IWorkAndRestTimeInfo";

export class EmployeesWhoCanWorkEvaluator
{
    public getEmployeesWhoCanWork(
        selectedCell: ITableCell,
        employeesForShift: IEmployee[],
        table: ITableCell[][],
        maxWorkTimeInMinutes: number,
        minRestTimeInMinutes: number,
        timeIntervalInMinutes: number): IEmployee[]
    {
        //Get all employees with sector permit
        let employeeWhoHaveSectorPermit = this.getEmployeesWithSectorPermit(employeesForShift, selectedCell.sector);
        let employeesForSelection: IEmployee[] = [];
        //Check which employees can be set in selected cell

        employeeWhoHaveSectorPermit.forEach((e) => 
        {
            if (this.ifEmployeeCanBeAddedForSelection(
                e,
                selectedCell.rowNumber,
                table,
                maxWorkTimeInMinutes,
                minRestTimeInMinutes,
                timeIntervalInMinutes))
            {
                employeesForSelection.push(e);
            }
        });

        return employeesForSelection;
    }

    private getEmployeesWithSectorPermit(employeesForShift: IEmployee[], sector: ISector): IEmployee[]
    {
        let employeeWhoHaveSectorPermit: IEmployee[] = [];

        employeesForShift.forEach((employee) =>
        {
            if (employee.sectorPermits.some((s) => s.name === sector.name))
            {
                employeeWhoHaveSectorPermit.push(employee);
            };
        });

        return employeeWhoHaveSectorPermit;
    }

    private ifEmployeeCanBeAddedForSelection(
        employee: IEmployee,
        rowNumber: number,
        table: ITableCell[][],
        maxWorkTimeInMinutes: number,
        minRestTimeInMinutes: number,
        timeIntervalInMinutes: number
    ): boolean
    {
        if (this.ifRowHasEmployee(employee, table[rowNumber]))
        {
            return false;
        }

        let previousRow = rowNumber - 1;
        let nextRow = rowNumber + 1;

        //Adding to the top of work session
        if (nextRow < table.length && this.ifRowHasEmployee(employee, table[nextRow]))
        {
            let nextWorkTimeInfo: IWorkAndRestTimeInfo = this.getWorkAndRestTimeInfo(
                employee,
                nextRow,
                table,
                timeIntervalInMinutes
            );
            let currentWorkTimeInfo: IWorkAndRestTimeInfo =
                this.getWorkAndRestTimeInfo(
                    employee,
                    rowNumber,
                    table,
                    timeIntervalInMinutes
                );

            if (
                nextWorkTimeInfo.currentWorkTimeInMinutes < maxWorkTimeInMinutes &&
                currentWorkTimeInfo.lastRestTimeInMinutes >= minRestTimeInMinutes
            )
            {
                return true;
            }
        }
        //Adding to the bottom of work session
        else if (previousRow >= 0 && this.ifRowHasEmployee(employee, table[previousRow]))
        {
            let workTimeInfo: IWorkAndRestTimeInfo = this.getWorkAndRestTimeInfo(
                employee,
                rowNumber,
                table,
                timeIntervalInMinutes
            );
            if (
                workTimeInfo.currentWorkTimeInMinutes < maxWorkTimeInMinutes &&
                workTimeInfo.nextRestTimeInMinutes >= minRestTimeInMinutes
            )
            {
                return true;
            }
        } else
        {
            let workTimeInfo: IWorkAndRestTimeInfo = this.getWorkAndRestTimeInfo(
                employee,
                rowNumber,
                table,
                timeIntervalInMinutes
            );
            if (
                workTimeInfo.lastRestTimeInMinutes >= minRestTimeInMinutes &&
                workTimeInfo.nextRestTimeInMinutes >= minRestTimeInMinutes
            )
            {
                return true;
            }
        }

        return false;
    }

    private getWorkAndRestTimeInfo(
        employee: IEmployee,
        rowNumber: number,
        table: ITableCell[][],
        timeIntervalInMinutes: number)
    {
        let currentWorkTime: number = 0;

        let totalWorkTime: number = 0;
        let lastWorkTime: number = 0;

        let totalRestTime: number = 0;
        let lastRestTime: number = 0;

        let nextWorkTime: number = 0;
        let nextRestTime: number = 0;
        //Total Work and Rest Time
        [totalWorkTime, totalRestTime] = this.calculateTotalWorkAndRestTime(
            employee,
            table,
            timeIntervalInMinutes
        );

        //Last Work and Rest Time
        [lastWorkTime, lastRestTime] = this.calculateLastWorkAndRestTime(
            employee,
            rowNumber,
            table,
            timeIntervalInMinutes
        );

        //CurrentWorkTime
        currentWorkTime = this.calculateCurrentWorkTime(
            employee,
            rowNumber,
            table,
            timeIntervalInMinutes
        );

        [nextWorkTime, nextRestTime] = this.calculateNextWorkTime(
            employee,
            rowNumber,
            table,
            timeIntervalInMinutes
        );

        let workAndRestInfo: IWorkAndRestTimeInfo = {
            lastRestTimeInMinutes: lastRestTime,
            lastWorkTimeInMinutes: lastWorkTime,
            totalRestTimeInMinutes: totalRestTime,
            totalWorkingTimeInMinutes: totalWorkTime,
            currentWorkTimeInMinutes: currentWorkTime,
            nextWorkTimeInMinutes: nextWorkTime,
            nextRestTimeInMinutes: nextRestTime,
        };
        return workAndRestInfo;
    }


    private calculateNextWorkTime(
        employee: IEmployee,
        rowNumber: number,
        table: ITableCell[][],
        timeIntervalInMinutes: number
    ): [number, number]
    {
        let nextWorkTime: number = 0;
        let nextRestTime: number = 0;
        let nextRow = rowNumber + 1;
        //Check if we are not the last row, if it is
        //future work is always 0
        if (nextRow >= table.length)
        {
            return [0, 20];
        }

        //To correctly calculate *future* time of work and rest
        //We need to get original table, put an employee into row in witch it *might* be put, and calculate time
        let alternateRealityTable = structuredClone(table);
        alternateRealityTable[rowNumber][0].employee = employee;

        while (nextRow < table.length)
        {
            //Check if the next row has employee
            //if does, check next
            if (this.ifRowHasEmployee(employee, alternateRealityTable[nextRow]))
            {
                nextRow += 1;
            } else
            {
                //If it doesn't have
                while (nextRow < alternateRealityTable.length)
                {
                    //Skip all rows that don't have an employee (rest rows)
                    if (!this.ifRowHasEmployee(employee, alternateRealityTable[nextRow]))
                    {
                        nextRow += 1;
                    }
                    //Find the row that has, and get it's current time of work
                    //And last rest time
                    else
                    {
                        nextWorkTime = this.calculateCurrentWorkTime(
                            employee,
                            nextRow,
                            alternateRealityTable,
                            timeIntervalInMinutes
                        );
                        nextRestTime = this.calculateLastWorkAndRestTime(
                            employee,
                            nextRow,
                            alternateRealityTable,
                            timeIntervalInMinutes
                        )[1];
                        return [nextWorkTime, nextRestTime];
                    }
                }
            }
        }
        return [nextWorkTime, 20];
    }

    private calculateTotalWorkAndRestTime(
        employee: IEmployee,
        table: ITableCell[][],
        timeIntervalInMinutes: number
    ): [number, number]
    {
        let totalWorkTime: number = 0;
        let totalRestTime: number = 0;

        table.forEach((tableRow) =>
        {
            //if row has an employee
            if (this.ifRowHasEmployee(employee, tableRow))
            {
                totalWorkTime += timeIntervalInMinutes;
            } else
            {
                totalRestTime += timeIntervalInMinutes;
            }
        });

        return [totalWorkTime, totalRestTime];
    }

    private calculateCurrentWorkTime(
        employee: IEmployee,
        rowNumber: number,
        table: ITableCell[][],
        timeIntervalInMinutes: number
    ): number
    {
        //0 [e1, e2]
        //1 [e1, e2]
        //2 [e1, e2]
        //3 [e1, e2] <-- start here
        //4 [e1, e2]
        //5 [e3, e2]
        let currentWorkTime: number = 0;
        let rowWithLastTimeOfWork = rowNumber;

        //0 [e1, e2]
        //1 [e1, e2]
        //2 [e1, e2]
        //3 [e1, e2]
        //4 [e1, e2]
        //5 [e3, e2] <-- end here
        while (
            rowWithLastTimeOfWork < table.length &&
            this.ifRowHasEmployee(employee, table[rowWithLastTimeOfWork])
        )
        {
            rowWithLastTimeOfWork += 1;
        }

        //0 [e1, e2]
        //1 [e1, e2]
        //2 [e1, e2]
        //3 [e1, e2]
        //4 [e1, e2] <-- back here
        //5 [e3, e2]
        rowWithLastTimeOfWork -= 1;

        //0 [e1, e2] <-- end here
        //1 [e1, e2]
        //2 [e1, e2]
        //3 [e1, e2]
        //4 [e1, e2] <--start here
        //5 [e3, e2]
        while (
            rowWithLastTimeOfWork >= 0 &&
            this.ifRowHasEmployee(employee, table[rowWithLastTimeOfWork])
        )
        {
            currentWorkTime += timeIntervalInMinutes;
            rowWithLastTimeOfWork -= 1;
        }

        return currentWorkTime;
    }

    private ifFirstWorkSession(
        employee: IEmployee,
        rowNumber: number,
        table: ITableCell[][]
    ): boolean
    {
        // This method checks for the edge case
        // The problem - can not calculate last work and rest time
        // if it's the fist work session

        //First check if it's the first row
        if (rowNumber === 0)
        {
            return true;
        }

        //Else we need to check rows that are above
        rowNumber -= 1;

        //Then we need to find if row, where we want to set an employee
        //is the row of first time session
        //If the row above has employee and the rowNumber is greater or equal to 0
        //then check the next row
        //0 [e3, e2]
        //1 [e3, e2]
        //2 [e1, e2] <-- end here
        //3 [e1, e2]
        //4 [e1, e2] <-- start here
        //5 [e3, e2]

        while (
            rowNumber >= 0 &&
            this.ifRowHasEmployee(employee, table[rowNumber])
        )
        {
            if (rowNumber === 0)
            {
                return true;
            }
            rowNumber -= 1;
        }

        //if the row is not 0, we might have
        //another row, where the employee is set
        //0 [e1, e2] <-- like this
        //1 [e3, e2]
        //2 [e1, e2] <-- ended here
        //3 [e1, e2]
        //4 [e1, e2]
        //5 [e3, e2]
        //So we need to confirm that there are no more rows with employee
        while (
            rowNumber >= 0 &&
            !this.ifRowHasEmployee(employee, table[rowNumber])
        )
        {
            if (rowNumber === 0)
            {
                return true;
            }
            rowNumber -= 1;
        }

        //Else if have a row with employee - that means it's not the first work session
        return false;
    }

    private calculateLastWorkAndRestTime(
        employee: IEmployee,
        rowNumber: number,
        table: ITableCell[][],
        timeIntervalInMinutes: number
    ): [number, number]
    {
        //Check for edge case
        if (this.ifFirstWorkSession(employee, rowNumber, table))
        {
            return [0, 20];
        }

        let lastWorkTime: number = 0;
        let lastRestTime: number = 0;

        //Last Work time
        //If an employee worked on previous time period
        //Decrement row to find when was the last rest time period
        //0 [e1, e2]
        //1 [e3, e2] <-- end here (for e1)
        //2 [e1, e2]
        //3 [e1, e2]
        //4 [e1, e2] <-- start here
        let row: number = rowNumber - 1;
        //1-1 = 0
        //skip
        if (
            row > 0 &&
            this.ifRowHasEmployee(employee, table[row])
        )
        {
            while (this.ifRowHasEmployee(employee, table[row]) && row > 0)
            {
                row = row - 1;
            }
        }

        //Then skip all the rest time periods
        //But for the each rest time period add rest time
        //0 [e1, e2] <-- end here
        //1 [e3, e2]
        //2 [e3, e2]
        //3 [e3, e2] <-- start here
        //4 [e1, e2]
        //skip
        while (row >= 0 && !this.ifRowHasEmployee(employee, table[row]))
        {
            lastRestTime += timeIntervalInMinutes;
            row = row - 1;
        }

        //Now count the previous time work
        //0 [e1, e2] <-- end here
        //1 [e1, e2]
        //2 [e1, e2]
        //3 [e1, e2]
        //4 [e1, e2] <-- start here
        while (row >= 0 && this.ifRowHasEmployee(employee, table[row]))
        {
            lastWorkTime += timeIntervalInMinutes;
            row = row - 1;
        }

        return [lastWorkTime, lastRestTime];
    }

    private ifRowHasEmployee(
        employee: IEmployee,
        tableRow: ITableCell[]
    ): boolean
    {
        return tableRow.filter((cell) => cell.employee?.id === employee.id).length >= 1;
    }
}
