import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css']
})
export class DateInputComponent {
  model;
  private dateNow = new Date();
  private dateFrom: any;

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

