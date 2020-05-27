import { Component, enableProdMode } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jgantt';

  settings1 = {
    startDate: moment().add(-12, 'day').format(),
    endDate: moment().add(12, 'day').format(),
    locale: 'es',
    timeLine: 'days',
    projectName: '14 días',
    randomColor: true
  }

  settings2 = {
    locale: 'es',
    timeLine: 'hours',
    projectName: 'En Horas',
    displayDate: 'dddd DD MMMM YYYY',
    dateActive: moment().add(1, 'day').format(),
    
  }

  data: any[] = [
    { key: 1, value: 'JLMJ89'},
    { key: 2, value: 'HGTR76', tasks : [{ id: 1, start_date: '2020-05-26T00:00:00-04:00', end_date: '2020-05-29T03:50:21-04:00'}, { id: 2, start_date: '2020-05-25T00:00:00-04:00', end_date: '2020-05-27T03:50:21-04:00'}]},
    { key: 3, value: 'BHGT56'},
    { key: 4, value: 'VTUH55'},
    { key: 5, value: 'CDRT67', tasks : [  { id: 4, start_date: '2020-05-23T03:50:21-04:00', end_date: '2020-05-28T06:50:21-04:00'}]},
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
