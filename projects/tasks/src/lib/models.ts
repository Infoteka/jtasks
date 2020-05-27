import * as moment_ from 'moment';
const moment = moment_;

/**
 * clas TaskSettings
 */
export class TaskSettings {

    private _projectName: string = '';
    private _taskName: string = 'Tasks';
    private _startDate: string = moment().add(-10, 'day').set({'hour': 0, 'minute': 0, 'second': 0}).format();
    private _endDate:string = moment().add(+10, 'day').set({'hour': 23, 'minute': 59, 'second': 59}).format();
    private _timeLine: string = 'days';
    private _numberColumnSidebar: number = 2;
    private _locale: string = 'es';
    private _noDataError: string = 'No data';
    private _displayDate: string = 'L';
    private _randomColor: boolean = true;
    private _dateActive: string =  moment().set({'hour': 0, 'minute': 0, 'second': 0}).format();
    private _barColor: string = null;

    constructor(){}

    get projectName(): string {
        return this._projectName;
    }
    set projectName(value: string) {
        this._projectName = value;
    }

    get taskName(): string {
        return this._taskName;
    }
    set taskName(value: string) {
        this._taskName = value;
    }

    get startDate(): string {
        return this._startDate;
    }
    set startDate(value: string) {
        value = moment(value).set({'hour': 0, 'minute': 0, 'second': 0}).format();
        this._startDate = value;
    }

    get endDate(): string {
        return this._endDate;
    }
    set endDate(value: string) {
        value = moment(value).set({'hour': 23, 'minute': 59, 'second': 59}).format();
        this._endDate = value;
    }

    get timeLine(): string {
        return this._timeLine;
    }
    set timeLine(value: string) {
        this._timeLine = value;
    }

    get numberColumnSidebar(): number {
        return this._numberColumnSidebar;
    }
    set numberColumnSidebar(value: number) {
        this._numberColumnSidebar = value;
    }

    get locale(): string {
        return this._locale;
    }
    set locale(value: string) {
        this._locale = value;
    }

    get noDataError(): string {
        return this._noDataError;
    }

    set noDataError(value: string) {
        this._noDataError = value;
    }

    get displayDate(): string {
        return this._displayDate;
    }
    
    set displayDate(value: string) {
        this._displayDate = value;
    }

    get randomColor(): boolean {
        return this._randomColor;
    }
    
    set randomColor(value: boolean) {
        this._randomColor = value;
    }

    get dateActive(): string {
        return this._dateActive;
    }
    set dateActive(value: string) {
        value = moment(value).set({'hour': 0, 'minute': 0, 'second': 0}).format();
        this._dateActive = value;
    }

    get barColor(): string {
        return this._barColor;
    }
    
    set barColor(value: string) {
        this._barColor = value;
    }
}

/**
 * class Task
 */
export class Task {
    id: any = '';
    startDate: string = '';
    endDate: string = '';
}

/**
 * class Data
 */
export class Data {
    key: any = '';
    value: any = '';
    tasks: Task[] = [];
}

export class DataList {
    data: Data[];
}


