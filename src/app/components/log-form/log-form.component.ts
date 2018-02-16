import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Levels } from '../../enums/request-levels.enum';
import { LogsService } from '../../services/logs.service';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AppCodes } from '../../enums/app-codes.enum';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent {

  private reactiveForm: FormGroup;
  private levels = Levels;
  private appCodes = AppCodes;
  private titleAlert: string = 'This field is required';
  private input: boolean = false;
  private logItems: any[];

  constructor(private formBuilder: FormBuilder, private logsService: LogsService) {
    this.reactiveForm = formBuilder.group({
      'level': [null],
      'appCode': [null],
      'event': [null],
      'company_id': [null],
      'site_id': [null],
      'order_id': [null]
    });
  }

  onSwitchInput(event: Event) {
    event.preventDefault;
    this.input = !this.input;
  }

  onGetLogs(data, more) {
    this.logsService.generateLink(data, more)
      .subscribe(items => this.logItems = (!this.logItems) ? items : this.logItems.concat(items), 
                err => console.log(err));
  }

  onSortByLevel(event: Event) {
    event.preventDefault;
    const val: string = event.srcElement.innerHTML;
    const tempList = this.logItems;

    if(val !== 'Remove filter') {
      this.logItems = this.logItems.map(item => item.level === val);
    } else {
      this.logItems = tempList;
    }
  }

}
