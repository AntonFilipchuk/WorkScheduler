import { ITableCell } from "./ITableCell";

export interface ITable
{
    headingRow : string[];
    table : ITableCell[][];
}