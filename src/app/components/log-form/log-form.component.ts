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
  private logItems: any[];
  private dateNow = new Date();
  private dateFrom: any;

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
      .subscribe(items => this.logItems = items,
                err => console.log(err));
  }

  // onGetMore() {
  //   this.logsService.setSkip();
  //   this.logsService.getLogs()
  //     .subscribe(items => this.logItems = this.logItems.concat(items),
  //               err => console.log(err));
  // }
}
