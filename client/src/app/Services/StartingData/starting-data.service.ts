import { Injectable, OnInit } from '@angular/core';
import { DefaultTableBuilder } from 'src/app/Helpers/DefaultTableBuilder';
import { IEmployee } from 'src/app/models/IEmployee';
import { ISector } from 'src/app/models/ISector';
import { ITableCell } from 'src/app/models/ITableCell';
import { TimeConfigurator } from 'src/app/Helpers/TimeConfigurator';

//G1
let g1r: ISector = { name: 'G1R', ifDividable: false };
let g1p: ISector = { name: 'G1P', ifDividable: false };

//G2
let g2r: ISector = { name: 'G2R', ifDividable: false };
let g2p: ISector = { name: 'G2P', ifDividable: false };
//G3
let g3r: ISector = { name: 'G3R', ifDividable: false };
let g3p: ISector = { name: 'G3P', ifDividable: false };
//G4
let g4r: ISector = { name: 'G4R', ifDividable: false };
let g4p: ISector = { name: 'G4P', ifDividable: false };

//G5
let g5r: ISector = { name: 'G2R', ifDividable: false };
let g5p: ISector = { name: 'G2P', ifDividable: false };

//G12
let g12r: ISector = { name: 'G12R', ifDividable: true, childSectors: [g1r, g2r] };
let g12p: ISector = { name: 'G12P', ifDividable: true, childSectors: [g1p, g2p] };

//G345
let g345r: ISector = { name: 'G345R', ifDividable: true, childSectors: [g3r, g4r, g5r] };
let g345p: ISector = { name: 'G345P', ifDividable: true, childSectors: [g3p, g4p, g5p] };


let selectedSectors: ISector[] = [g12r, g12p];

let e1: IEmployee = {
  id: 1,
  name: 'Filipchuk',
  totalTime: 0,
  sectorPermits: [g12r, g12p, g345r, g345p],
  color: 'red',
};

let e2: IEmployee = {
  id: 2,
  name: 'Egorov',
  totalTime: 0,
  sectorPermits: [g12r, g12p, g345r, g345p],
  color: 'green',
};

let e3: IEmployee = {
  id: 3,
  name: 'Gallyamov',
  totalTime: 0,
  sectorPermits: [g12r, g12p, g345r, g345p],
  color: 'yellow',
};

let e4: IEmployee = {
  id: 4,
  name: 'Nosenko',
  totalTime: 0,
  sectorPermits: [g12r, g12p, g345r, g345p],
  color: 'orange',
};

let e5: IEmployee = {
  id: 5,
  name: 'Mozjuhin',
  totalTime: 0,
  sectorPermits: [g12r, g12p, g345r, g345p],
  color: 'Chocolate',
};

let e6: IEmployee = {
  id: 6,
  name: 'Boiko',
  totalTime: 0,
  sectorPermits: [g12r, g12p, g345r, g345p],
  color: 'Aqua',
};

let e7: IEmployee = {
  id: 7,
  name: 'Fomin',
  totalTime: 0,
  sectorPermits: [g12r, g12p, g345r, g345p],
  color: 'DarkMagenta ',
};

let e8: IEmployee = {
  id: 8,
  name: 'Ignanin',
  totalTime: 0,
  sectorPermits: [g12r, g12p, g345r, g345p],
  color: 'DarkBlue',
};

let e9: IEmployee = {
  id: 9,
  name: 'Chiglyakov',
  totalTime: 0,
  sectorPermits: [g12r, g12p, g345r, g345p],
  color: 'Crimson ',
};

let employees: IEmployee[] = [e1, e2, e3, e4, e5, e6, e7, e8, e9];

let todayDate: Date = new Date();

let shiftStartHour: number = 9;
let shiftStartMinutes: number = 0;
let shiftEndHour: number = 10;
let shiftEndMinutes: number = 0;


let shiftStartTime: Date = new Date(
  todayDate.getDate(),
  todayDate.getMonth(),
  todayDate.getDate(),
  9,
  0
);
let shiftEndTime: Date = new Date(
  todayDate.getDate(),
  todayDate.getMonth(),
  todayDate.getDate(),
  10,
  0
);

let timeIntervalInMinutes = 10;
let maxWorkTimeInMinutes = 120;
let minRestTimeInMinutes = 20;

@Injectable({
  providedIn: 'root',
})
export class StartingDataService
{
  public fullTableAs2DArray!: ITableCell[][];
  public actualTable!: ITableCell[][];
  public headingRow!: string[];

  public timeColumnAsDateArray!: Date[][];
  public timeColumnAsStringArray!: string[];

  public employees: IEmployee[] = employees;
  public sectors: ISector[] = selectedSectors;
  public timeIntervalInMinutes: number = timeIntervalInMinutes;
  public maxWorkTimeInMinutes: number = maxWorkTimeInMinutes;
  public minRestTimeInMinutes: number = minRestTimeInMinutes;

  constructor ()
  {
    this.configureInitialValues(
      selectedSectors,
      shiftStartHour,
      shiftStartMinutes,
      shiftEndHour,
      shiftEndMinutes,
      todayDate,
      timeIntervalInMinutes,
      maxWorkTimeInMinutes,
      minRestTimeInMinutes
    );
  }

  public configureInitialValues(
    selectedSectors: ISector[],
    shiftStartHour: number,
    shiftStartMinutes: number,
    shiftEndHour: number,
    shiftEndMinutes: number,
    todayDate: Date,
    timeIntervalInMinutes: number,
    maxWorkTimeInMinutes: number,
    minRestTimeInMinutes: number
  )
  {
    let timeConfigurator = new TimeConfigurator(shiftStartHour, shiftStartMinutes, shiftEndHour, shiftEndMinutes, todayDate, timeIntervalInMinutes, maxWorkTimeInMinutes, minRestTimeInMinutes);

    this.timeColumnAsDateArray = timeConfigurator.timeColumnAsDateArray;
    this.timeColumnAsStringArray = timeConfigurator.timeColumnAsStringArray;

    let defaultTableBuilder = new DefaultTableBuilder(selectedSectors, this.timeColumnAsStringArray);

    this.fullTableAs2DArray = defaultTableBuilder.emptyFullTable;
    this.actualTable = defaultTableBuilder.emptyActualTable;
    this.headingRow = defaultTableBuilder.headingRow;
  }
}
