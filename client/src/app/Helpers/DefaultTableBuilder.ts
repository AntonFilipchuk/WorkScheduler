import { ISector } from '../models/ISector';
import { ITableCell } from '../models/ITableCell';

export class DefaultTableBuilder
{

    //At the start we need to build 
    //Full table - with parsed sectors 
    //Actual table to display (MatTable)
    constructor (
        private _selectedSectors: ISector[],
        private _timeColumnAsStringArray: string[],
    )
    { }

    public get emptyFullTable(): ITableCell[][]
    {
        let parsedSectors = this.parseSectors(this._selectedSectors);
        return this.buildEmptyTableAs2DArray(
            parsedSectors,
            this._timeColumnAsStringArray
        );
    }

    public get emptyActualTable(): ITableCell[][]
    {
        return this.buildEmptyTableAs2DArray(this._selectedSectors, this._timeColumnAsStringArray);
    }

    public get headingRow() : string[]
    {
        return ['Time', ...this._selectedSectors.map(sector => sector.name)];
    }


    //The ITableCell : { columnNumber: 0, rowNumber: 0, employee: undefined, sector: g1r, timeInterval: '09:00 - 09:10' }
    //The whole table should consists of such cells
    //At the start employee property in undefined, the rest is set
    private buildEmptyTableAs2DArray(sectors: ISector[], TimeColumnArray: string[] | Date[]): ITableCell[][]
    {
        let table: ITableCell[][] = [];
        TimeColumnArray.forEach((time, rowIndex) =>
        {
            let rowOfCells: ITableCell[] = [];
            sectors.forEach((sector) => 
            {
                let cell: ITableCell = { employee: undefined, sector: sector, timeInterval: time, rowNumber: rowIndex, id: crypto.randomUUID().toString() };
                rowOfCells.push(cell);
            });
            table.push(rowOfCells);
        });
        return table;
    }

    private parseSectors(sectors: ISector[]): ISector[]
    {
        let parsedSectors: ISector[] = [];
        sectors.forEach((sector) => 
        {
            if (sector.ifDividable)
            {
                sector.childSectors!.forEach((childSector) => 
                {
                    parsedSectors.push(childSector);
                });
            }
            else
            {
                parsedSectors.push(sector);
            }
        });
        return parsedSectors;
    }
}
