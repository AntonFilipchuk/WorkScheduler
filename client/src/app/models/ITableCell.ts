import { IEmployee } from "./IEmployee";
import { ISector } from "./ISector";

export interface ITableCell 
{
    sector: ISector;
    employee: IEmployee | undefined;
    timeInterval: any;
    rowNumber: number;
    id : string;
}