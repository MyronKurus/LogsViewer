import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Levels } from '../../enums/request-levels.enum';
import { LogsService } from '../../services/logs.service';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent {

  private reactiveForm: FormGroup;
  private levels = Levels;
  private titleAlert: string = 'This field is required';
  private input: boolean = false;
  private switchBtn: string = 'Enter the value';
  private logItems: any[];
  private dateNow = new Date();
  private dateFrom: any;

  constructor(private formBuilder: FormBuilder, private logsService: LogsService) {
    this.reactiveForm = formBuilder.group({
      'timeFrom': [null],
      'level': [null],
      'appCode': [null],
      'event': [null],
      'companyId': [null],
      'siteId': [null],
      'orderId': [null]
    });
  }

  onSwitchInput(event: Event) {
    event.preventDefault;
    this.switchBtn = (this.input) ? 'Enter the value' : 'Select the value';
    this.input = !this.input;
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

  onGetLogs() {
    this.logsService.getItems()
        .subscribe(
            items => {
              this.logItems = items
              console.log(items);
            },
            err => {
                console.log(err);
            }
        );
  }

}

function  setHours() {
  return new Date().setHours(0, 0, 0, 0);
}

function setSeconds() {
  return new Date().setSeconds(0, 0);
}
