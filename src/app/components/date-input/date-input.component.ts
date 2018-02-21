import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { LogsService } from '../../services/logs.service';
import {IMyDrpOptions, IMyDateRangeModel} from 'mydaterangepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css']
})
export class DateInputComponent {
  private startDate: any;
  private endDate: any;
  private displayTime: string;
    
  myDateRangePickerOptions: IMyDrpOptions = {
    width: '402px'
  };

  // For example initialize to specific date (09.10.2018 - 19.10.2018). It is also possible
  // to set initial date range value using the selDateRange attribute.
  // private model: any = {beginDate: {year: 2018, month: 10, day: 9},
  //                          endDate: {year: 2018, month: 10, day: 19}};
  
  constructor(private logsService: LogsService) { }

  ngOnInit() {
    const mom = moment();
    this.endDate = moment().toISOString();
    this.startDate = mom.subtract(1, 'day').toISOString();
    this.displayTime = displayTime(this.startDate, this.endDate);
    this.logsService.setPeriod(this.startDate, this.endDate);
  }


  onDateRangeChanged(event: IMyDateRangeModel) {
    if (event.beginDate.year === 0) {
      return;
    }

    this.startDate = event.beginJsDate.toISOString();
    this.endDate = moment(event.endJsDate).endOf('day').toISOString();
    this.logsService.setPeriod(this.startDate, this.endDate);
    this.displayTime = displayTime(this.startDate, this.endDate);
  }

  onSetRange(event: Event) {
    const val: string = event.srcElement.innerHTML;
    this.endDate = moment().toISOString();
    const mom = moment();
    switch(val) {
      case '5 min':
        this.startDate = mom.subtract(5, 'minutes').toISOString();
        break;
      case '1 hour':
        this.startDate = mom.subtract(1, 'hour').toISOString();
        break;
      case '6 hours':
        this.startDate = mom.subtract(6, 'hours').toISOString();
        break;
      case '1 day':
        this.startDate = mom.subtract(1, 'day').toISOString();
        break;
      case '1 week':
        this.startDate = mom.subtract(7, 'days').toISOString();
        break;
    }
    this.displayTime = displayTime(this.startDate, this.endDate);
    this.logsService.setPeriod(this.startDate, this.endDate);
  }
}

function displayTime(start, end) {
  return moment(start).format('DD-MMM-YYYY HH:mm:ss') + ' | ' + moment(end).format('DD-MMM-YYYY HH:mm:ss');
}
