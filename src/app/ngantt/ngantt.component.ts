import { Component, OnInit, Input, enableProdMode } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { TaskSettings } from 'src/models/models';

@Component({
  selector: 'ngantt',
  templateUrl: './ngantt.component.html',
  styleUrls: ['./ngantt.component.scss']
})
export class NganttComponent implements OnInit {
  @Input() settings: any;
  @Input() data: any;

  months: any;
  days: any[] = [];
  hours: any[] = [];
  daysOfMonth: any;
  now: any;
  minutes_cell: number = 0;
  taskSettings: TaskSettings;
  numColumn: number = 0;
  dayActive: any;
  
  constructor() {
    this.dayActive = moment('2020-05-26').format();
  }

  ngOnInit(): void {
    
    this.taskSettings = Object.assign(new TaskSettings(), this.settings);
    moment.locale(this.taskSettings.locale);
    this.init();
  }

  init(){
    if(this.taskSettings.timeLine == 'hours'){
      this.loadCalendarHours();
      this.minutes_cell = 1440;
    }else{
      this.loadCalendarDays();
      this.minutes_cell = moment(this.taskSettings.startDate)
                          .diff(this.taskSettings.endDate, 'minutes', true) * -1;
      this.getMonths();
    }
  }

  loadCalendarHours(){
    console.log('loadCalendarHours');
    for(let i = 0; i <= 24; i++ ){
      let date = moment(this.dayActive).add(i, 'hours').format();
      let hour = moment(date).format('HH:mm');
      this.hours.push({
        'date': date, 
        'hour': hour,
      });
    }
    this.numColumn = this.hours.length;
    console.log(this.hours);
  
  }
  // calendar days generate
  loadCalendarDays(){
    console.log('loadCalendarDays');
    // get difference
    
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

  
  timeline(start: any = null, end: any = null){
    let css = {};

    // if timeline is hours type
    let endDate = this.taskSettings.endDate;
    if(this.taskSettings.timeLine == 'hours'){
      endDate = moment(this.dayActive).set({'hour': 23, 'minute': 59, 'second': 59}).format()
      let isActive = moment(endDate).isBetween(moment(start), moment(end), 'minute');
      if(!isActive){
        console.log('no esta en el rango', endDate, start, end, isActive);
        // return css;
      }
      
    }

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
      css = {
        'left': porcent_position + '%',
        'width': percent_width + '%',
        'background-color': color,
      }
      // console.log('minutes cell', this.minutes_cell, ' => 100%');
      // console.log('element minutes 1', minutes_element);
      // console.log('position', position_minutes);
      // console.log('position end', position_minutes_end);
      // console.log('diff start-end (diff)', diff);
      // console.log('percent width', percent_width);
      // console.log('porcent_position', porcent_position);
    }
    return css;
  }

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  /* use in html */

  toggleTimeLine(timeline: string){
    this.taskSettings.timeLine = '';
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

  compareDate(initialDate: string, secondDate: string = null){
    let diff = false;
    if(!secondDate){
      diff = (moment(initialDate).format('DDMMYYYY') == moment().format('DDMMYYYY')) ? true : false;
    }
    return diff;
  }

}
