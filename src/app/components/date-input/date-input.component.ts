import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';

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
    // model;
    private dateTill;
    private dateFrom;
    private hoveredDate: NgbDateStruct;
    private fromDate: NgbDateStruct;
    private toDate: NgbDateStruct;
    private show: boolean = false;
    private inputDate: string;
  
    constructor(calendar: NgbCalendar) {
      // this.fromDate = calendar.getPrev(calendar.getToday(), 'd', 10);
      // this.toDate = calendar.getToday();
      // this.inputDate = formatDate(this.fromDate, this.toDate);
    }
  
    onDateChange(date: NgbDateStruct) {
      if (!this.fromDate && !this.toDate) {
        this.fromDate = date;
        this.dateFrom = convertDate(this.fromDate);
      } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
        this.toDate = date;
        this.dateTill = convertDate(this.toDate);
      } else {
        this.toDate = null;
        this.fromDate = date;
        this.dateFrom = convertDate(this.fromDate);
      }
      this.inputDate = formatDate(this.fromDate, this.toDate);
      console.log(this.dateFrom, this.dateTill);
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

    switch(val) {
      case '5 min':
        this.dateTill = new Date().toISOString();
        this.dateFrom = new Date(setSeconds() - (1000*60*5)).toISOString();
        this.inputDate = 'last 5 min';
        break;
      case '1 hour':
        this.dateTill = new Date().toISOString();
        this.dateFrom = new Date(setSeconds() - (1000*60*60)).toISOString();
        this.inputDate = 'last hour';
        break;
      case '6 hours':
        this.dateTill = new Date().toISOString();
        this.dateFrom = new Date(setSeconds() - (1000*60*60*6)).toISOString();
        this.inputDate = 'last 6 hours';
        break;
      case '1 day':
        this.dateTill = new Date().toISOString();
        this.dateFrom = new Date(setHours() - (1000*60*60*24)).toISOString();
        this.inputDate = 'last day';
        break;
      case '1 week':
        this.dateTill = new Date().toISOString();
        this.dateFrom = new Date(setHours() - (1000*60*60*24*7)).toISOString();
        this.inputDate = 'last week';
        break;
    }
  }
}

function  setHours() {
  return new Date().setHours(0, 0, 0, 0);
}

function setSeconds() {
  return new Date().setSeconds(0, 0);
}

function formatDate(from: NgbDateStruct, till: NgbDateStruct) {

  if (!from || !till) {
    return;
  } else {
    return 'From: ' + from.year + '-' + from.month + '-' + from.day +
          ' | To: ' + till.year + '-' + till.month + '-' + till.day
  }
}

function convertDate(obj: NgbDateStruct) {
  let dateArr: number[] = [];
  for(let key in obj) {
    dateArr.push(obj[key]);
  }
  return new Date(dateArr[0], dateArr[1]-1, dateArr[2]).toISOString();
}

