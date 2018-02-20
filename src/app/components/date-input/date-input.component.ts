import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { LogsService } from '../../services/logs.service';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css']
})
export class DateInputComponent {
    private dateTill;
    private dateFrom;
    private hoveredDate: NgbDateStruct;
    private fromDate: NgbDateStruct;
    private toDate: NgbDateStruct;
    private show: boolean = false;
    private inputDate: string = '1 day';
    private doc = document;
  
    constructor(
      private calendar: NgbCalendar, 
      private logsService: LogsService
    ) {}
  
    onDateChange(date: NgbDateStruct) {
      if (!this.fromDate && !this.toDate) {
        this.fromDate = date;
        this.toDate = date;
        this.dateFrom = new Date(convertDate(this.fromDate).setUTCHours(0, 0, 0)).toISOString();
        this.dateTill = new Date(convertDate(this.toDate).setUTCHours(23, 59, 59, 999)).toISOString();
        this.inputDate = formatDate(this.fromDate, this.toDate);
        this.logsService.setDateFrom(this.dateFrom);
        this.logsService.setDateTill(this.dateTill);
      } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
        this.toDate = date;
        this.dateTill = new Date(convertDate(this.toDate).setUTCHours(23, 59, 59, 999)).toISOString();
        this.inputDate = formatDate(this.fromDate, this.toDate);
        this.logsService.setDateFrom(this.dateFrom);
        this.logsService.setDateTill(this.dateTill);
        this.onShowCalendar();
      } else {
        this.toDate = null;
        this.fromDate = date;
        this.dateFrom = new Date(convertDate(this.fromDate).setUTCHours(0, 0, 0)).toISOString();
      }
    }
  
  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  onShowCalendar() {
    this.show = !this.show;
  }

  onSetRange(event: Event) {
    event.preventDefault;
    const val: string = event.srcElement.innerHTML;
    this.inputDate = 'last ' + val;

    let period;
    switch(val) {
      case '5 min':
        period = (1000*60*5);
        break;
      case '1 hour':
        period = (1000*60*60);
        break;
      case '6 hours':
        period = (1000*60*60*6);
        break;
      case '1 day':
        period = (1000*60*60*24);
        break;
      case '1 week':
        period = (1000*60*60*24*7);
        break;
    }
    this.dateTill = new Date().toISOString();
    this.dateFrom = new Date(setSeconds() - period).toISOString();
    this.logsService.setDateFrom(this.dateFrom);
    this.logsService.setDateTill(this.dateTill);
  }
}

function setSeconds() {
  return new Date().setMilliseconds(0);
}

function formatDate(from: NgbDateStruct, till: NgbDateStruct) {
  if (!from || !till) {
    return;
  } else {
    return 'From: ' + from.year + '-' + from.month + '-' + from.day + ' 00:00:00' +
          ' | To: ' + till.year + '-' + till.month + '-' + till.day + ' 23:59:59';
  }
}

function convertDate(day: NgbDateStruct) {
  let dateArr: number[] = [];
  for(let key in day) {
    dateArr.push(day[key]);
  }
  return new Date(dateArr[0], dateArr[1]-1, dateArr[2]+1);
}

