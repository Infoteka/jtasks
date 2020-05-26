import { Component, enableProdMode } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jgantt';

  startDate1: string = moment().add(-3, 'day').set({'hour': 0, 'minute': 0, 'second': 0}).format();
  endDate1:string = moment().add(+3, 'day').set({'hour': 23, 'minute': 59, 'second': 59}).format();

  settings1 = {
    locale: 'es',
    timeLine: 'days',
    randomColor: false
  }

  settings2 = {
    locale: 'es',
    timeLine: 'hours',
    projectName: 'En Horas',
    displayDate: 'dddd DD MMMM YYYY'
  }

  data: any[] = [
    { key: 1, value: 'JLMJ89'},
    { key: 2, value: 'HGTR76', tasks : [{start_date: '2020-05-26T00:00:00-04:00', end_date: '2020-05-26T03:50:21-04:00'}, {start_date: '2020-05-25T00:00:00-04:00', end_date: '2020-05-27T03:50:21-04:00'}]},
    { key: 3, value: 'BHGT56'},
    { key: 4, value: 'VTUH55'},
    { key: 5, value: 'CDRT67', tasks : [{start_date: '2020-05-01T00:00:00-04:00', end_date: '2020-05-15T03:50:21-04:00'}, {start_date: '2020-05-23T03:50:21-04:00', end_date: '2020-05-28T06:50:21-04:00'}]},
    { key: 6, value: 'BCTR45'},
    { key: 7, value: 'PARV10'},
  ]

  // data: any[] = [
  //   { key: 1, value: 'JLMJ89'},
  //   { key: 2, value: 'HGTR76', tasks : [{start_date: '2020-05-25T00:01:00-04:00', end_date: '2020-05-25T03:50:21-04:00'}]},
  //   { key: 3, value: 'BHGT56'},
  //   { key: 4, value: 'VTUH55'},
  //   { key: 5, value: 'CDRT67'},
  //   { key: 6, value: 'BCTR45'},
  //   { key: 7, value: 'PARV10'},
  // ]

  constructor(){
    
  }

}
