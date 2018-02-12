import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

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
    model;
    private dateNow = new Date();
    private dateFrom: any;
    hoveredDate: NgbDateStruct;
    fromDate: NgbDateStruct;
    toDate: NgbDateStruct;
    show: boolean = false;

    inputDate: string;
  
    constructor(calendar: NgbCalendar) {
      this.fromDate = calendar.getPrev(calendar.getToday(), 'd', 10);
      this.toDate = calendar.getToday();
      // console.log(this.toDate);
      this.inputDate = formatDate(this.fromDate, this.toDate);
    }
  
    onDateChange(date: NgbDateStruct) {
      if (!this.fromDate && !this.toDate) {
        this.fromDate = date;
      } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
        this.toDate = date;
      } else {
        this.toDate = null;
        this.fromDate = date;
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

    switch(val) {
      case '5 min':
        this.dateFrom = setSeconds()- (1000*60*5);
        break;
      case '1 hour':
        this.dateFrom = setSeconds() - (1000*60*60);
        break;
      case '6 hours':
        this.dateFrom = setSeconds() - (1000*60*60*6);
        break;
      case '1 day':
        this.dateFrom = setHours() - (1000*60*60*24);
        break;
      case '1 week':
        this.dateFrom = setHours() - (1000*60*60*24*7);
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
  return 'From: ' + from.year + '-' + from.month + '-' + from.day +
        ' | To: ' + till.year + '-' + till.month + '-' + till.day
}

