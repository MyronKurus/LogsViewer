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


  onGetLogs() {
    this.logsService.getItems('https://xenial-log-reader-dev-1575566368.us-east-1.elb.amazonaws.com/es?$skip=0&$top=10&$filter=created_at%20gt%20%272018-02-08T13:25:32.000Z%27%20and%20created_at%20le%20%272018-02-15T13:25:32.367Z%27')
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

  onGenerateLink(data) {
    this.logsService.generatePath(data);
  }

}
