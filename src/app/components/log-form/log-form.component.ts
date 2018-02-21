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
  private inputLevel: boolean = false;
  private inputApp: boolean = false;
  private logItems: any[];
  private copyList: any[];
  private status: string = 'ALL';
  private levelsList: Object = {
    'DEBUG': true,
    'ERROR': true,
    'INFO': true,
    'WARN': true
  }

  constructor(private formBuilder: FormBuilder, private logsService: LogsService) {
    this.reactiveForm = formBuilder.group({
      'level': [null],
      'app_code': [null],
      'event': [null],
      'company_id': [null],
      'site_id': [null],
      'order_id': [null]
    });
  }

  onSwitchInputApp(event: Event) {
    event.preventDefault;
    this.inputApp = !this.inputApp;
  }

  onSwitchInputLevel(event: Event) {
    event.preventDefault;
    this.inputLevel = !this.inputLevel;
  }

  onGetLogs(data, more) {
    this.logsService.generateLink(data, more)
      .subscribe(items => {
        this.logItems = (!more) ? items : this.logItems.concat(items);
        this.logItems.forEach(item => {
          for(let key in this.levelsList){
            if(item.level == key) {
              this.levelsList[key] = false;
            }
          }
        });
        this.copyList = this.logItems;
      }, err => console.log(err));
  }

  onExportLogs(data) {
    this.logsService.exportLogs(data).subscribe(items => {}, 
      err => console.log(err));;
  }

  onSortByLevel(event: Event) {

    if (event.srcElement.classList.contains('disabled')) {
      return;
    }
    const val: string = event.srcElement.innerHTML;
    let filtered: any[] = [];
    this.logItems = this.copyList;
    this.status = 'ALL';
    
    if(val === 'WARN') {
      this.status = val;
      this.logItems.forEach(item => {
        if(item.level === val || item.level ==='WARNING') {filtered.push(item)}
        this.levelsList['WARN'] = false;
      });
      this.logItems = filtered;
    } else if(val !== 'ALL') {
      this.status = val;
      this.logItems.forEach(item => {
        if(item.level === val) {filtered.push(item)}
        this.levelsList[val] = false;
      });
      this.logItems = filtered;
    }
  }

}
