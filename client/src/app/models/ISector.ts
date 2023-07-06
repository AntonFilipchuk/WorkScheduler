export interface ISector
{
    name: string;
    ifDividable: boolean;
    childSectors?: ISector[];
    parentSectors?: ISector[];
}