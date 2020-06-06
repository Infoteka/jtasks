import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
import { TaskSettings, Data } from './models';
import * as moment_ from 'moment';
const moment = moment_;

@Component({
  selector: 'aks-tasks',
  templateUrl: './tasks.component.html', 
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  @Input() settings: any;
  @Input() data: any;

  months: any;
  days: any[] = [];
  hours: any[] = [];
  daysOfMonth: any;
  now: any;
  minutes_cell: number = 0;

  numColumn: number = 0;
  backButton: boolean = false;
  errors: string = null;

  taskSettings: TaskSettings;
  taskData = [new Data];
  
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {

    console.log(changes);
    this.taskSettings =  (changes.settings) ? 
                          Object.assign(new TaskSettings(), changes.settings.currentValue) 
                          : this.taskSettings;
    this.taskData = (changes.data) ? 
                    Object.assign([new Data], changes.data.currentValue) 
                    : this.taskData;
    moment.locale(this.taskSettings['locale']);
    this.init();
  }

  ngOnInit(): void {}

  public init(){
    this.errors = null;
    if(this.taskSettings.timeLine == 'hours'){
      this.getHours();
      this.minutes_cell = 1440;
    }else{
      this.getDays();
      this.minutes_cell = moment(this.taskSettings.startDate)
                          .diff(this.taskSettings.endDate, 'minutes', true) * -1;
      this.getMonths();
    }
  }

  // get hours
  getHours(){
    console.log('loadCalendarHours');
    this.hours = [];
    for(let i = 0; i <= 24; i++ ){
      let date = moment(this.taskSettings.dateActive).add(i, 'hours').format();
      let hour = moment(date).format('HH:mm');
      this.hours.push({
        'date': date, 
        'hour': hour,
      });
    }
    this.numColumn = this.hours.length;
  }

  // calendar days generate
  getDays(){
    console.log('loadCalendarDays');
    this.validateRange(this.taskSettings.startDate, this.taskSettings.endDate);
    // get difference
    this.days = [];
    let diff = moment(this.taskSettings.startDate).diff(this.taskSettings.endDate, 'days') * -1;
    // generate matrix
    for(let i=0; i <= diff; i++){

      let date = moment(this.taskSettings.startDate).add(i, 'day').format();
      let day_week = moment(date).format('dddd');
      let day = moment(date).format('DD');

      this.days.push({
                      'date': date, 
                      'day': day,
                      'day_week': day_week
                    });
    }
    this.numColumn = this.days.length;
  }

  // mount list generate
  getMonths(){
    let months = [];
    for(let item in this.days){
      months.push(moment(this.days[item]['date']).format('MMMM YYYY'));
    }
    this.daysOfMonth = _.groupBy(months);
    this.months = _.intersection(months);
  }
  
  timeline(start: any = null, end: any = null, tasks: any[] = []){
    let css = {};
    let endDate = this.taskSettings.endDate;
    // if timeline is hours type
    let isInRange = false;
    let dateSearch = '';
    let startDateRange = '';
    let endDateRange = '';
    if(this.taskSettings.timeLine == 'hours'){
      endDate = moment(this.taskSettings.dateActive)
                      .set({'hour': 23, 'minute': 59, 'second': 59}).format();
      dateSearch = endDate;
      startDateRange = start;
      endDateRange = end;
    }else{
      dateSearch = end;
      startDateRange = this.taskSettings.startDate;
      endDateRange = this.taskSettings.endDate;
    }
    // filter out the of range
    isInRange = moment(dateSearch).set({'hour': 0, 'minute': 1, 'second': 0})
                    .isBetween(moment(startDateRange).set({'hour': 0, 'minute': 0, 'second': 0}), 
                                moment(endDateRange).set({'hour': 23, 'minute': 59, 'second': 59}),
                                'minute'
                                );
    if(isInRange){
      if(start){
        let minutes_element = moment(start).diff(endDate, 'minutes', true) * -1;
        let position_minutes = this.minutes_cell - minutes_element;
        // maximum number to not leave the grid.
        position_minutes = (position_minutes < 0 ) ? 0 : position_minutes;
        // % position for timeline
        let porcent_position = (position_minutes * 100) / this.minutes_cell;
        // get width
        let percent_width = 0;
        let diff = 0;
        let position_minutes_end = 0;
        if(end){
          let minutes_element_end = (moment(end).diff(endDate, 'minutes', true) * -1) ;
          position_minutes_end = this.minutes_cell - minutes_element_end;
          // maximum number to not leave the grid (right).
          position_minutes_end = (position_minutes_end > this.minutes_cell) ? this.minutes_cell : position_minutes_end;
          diff = position_minutes_end - position_minutes;
          percent_width = diff * 100 / this.minutes_cell;
        }
        let color = this.taskSettings.randomColor ? this.getRandomColor() : '';
        color = this.taskSettings.barColor ? this.taskSettings.barColor : color;
        let num_task = 75 / tasks.length;
        // console.log(num_task);
        css = {
          'left': porcent_position + '%',
          'width': percent_width + '%',
          'background-color': color,
          'visibility': 'visible',
          'height': num_task + '%'
        }
        // console.log('minutes cell', this.minutes_cell, ' => 100%');
        // console.log('element minutes 1', minutes_element);
        // console.log('position', position_minutes);
        // console.log('position end', position_minutes_end);
        // console.log('diff start-end (diff)', diff);
        // console.log('percent width', percent_width);
        // console.log('porcent_position', porcent_position);
      }

    }
    
    return css;
  }

  validateRange(startDate: string, endDate: string){
    if(moment(startDate) > moment(endDate)){
      this.errors = "error in the date range, please check and try again.";
    }
    console.log(startDate, endDate);
  }

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  /* use in html */

  toggleTimeLine(timeline: string, day: any = null){
    if(timeline=='hours'){
      this.taskSettings.dateActive = day;
      this.backButton = true;
    }
    this.taskSettings.timeLine = timeline;
    this.init();
  }

  getDateFormat(date: any, format: string = null){
    return moment(date).format(this.taskSettings.displayDate);
  }

  // style grid days head.
  getDaysLength(){
    let numColumns = this.taskSettings.numberColumnSidebar + this.numColumn;
    return 'repeat('+ numColumns + ', 1fr)'
  }

  // style grid months head.
  getMonthsLength(month: any){
    return 'span ' + this.daysOfMonth[month].length;
  }

  getColumnSiderbarLength(){
    return 'span ' + this.taskSettings.numberColumnSidebar;
  }

  getColumnsLength(){
    let numColumns = this.taskSettings.numberColumnSidebar + this.numColumn;
    return 'span ' + numColumns;
  }

  getColumnItemsLength(){
    return 'span ' + this.numColumn;
  }

  isNow(initialDate: string, secondDate: string = null){
    let diff = false;
    if(!secondDate){
      diff = (moment(initialDate).format('DDMMYYYY') == moment().format('DDMMYYYY')) ? true : false;
    }
    return diff;
  }


}
