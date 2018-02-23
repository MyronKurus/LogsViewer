import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Levels } from '../../enums/request-levels.enum';
import { LogsService } from '../../services/logs.service';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AppCodes } from '../../enums/app-codes.enum';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent {

  public reactiveForm: FormGroup;
  public levels = Levels;
  public appCodes = AppCodes;
  public titleAlert: string = 'This field is required';
  public inputApp: boolean = false;
  public logItems: any[];
  public copyList: any[];
  public status: string = 'ALL';
  public showMessage: boolean = false;
  public noLogsMessage: string = 'There is no logs available with selected params. Please, try to change query.';
  public downloadLogs: any;
  public levelsList: Object = {
    'DEBUG': true,
    'ERROR': true,
    'INFO': true,
    'WARN': true
  }
  public initialData: Object = {
    app_code: null,
    company_id: null,
    event: null,
    level: null,
    order_id: null,
    site_id: null
  }

  constructor(
    private formBuilder: FormBuilder, 
    private logsService: LogsService, 
    private modalService: NgbModal
  ) {
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
    this.reactiveForm['level'] = null;
    this.reactiveForm.controls['app_code'];
  }

  onGetLogs(data, more) {
    this.logsService.generateLink(data, more)
      .subscribe(items => {
        if (more) {
          this.copyList = this.copyList.concat(items);
          if (this.status === 'ALL') {
            this.logItems = this.logItems.concat(items);
          } else if (this.status === 'WARN') {
            items.forEach(item => {
              if(item.level === this.status || item.level ==='WARNING') {this.logItems.push(item);}
            });
          } else {
            items.forEach(item => {
              if(item.level === this.status) {this.logItems.push(item);}
            });
          }
        } else {
          this.showMessage = (items.length === 0) ? true : false;
          this.logItems = items;
          this.copyList = this.logItems;
        }
        this.copyList.forEach(item => {
          for(let key in this.levelsList){
            if(item.level == key) {this.levelsList[key] = false;}
          }
        });
      }, err => alert(err));
  }

  onExportLogs(data) {
    this.logsService.exportLogs(data).subscribe((str) => {this.downloadLogs = str; console.log(this.downloadLogs);}, 
      err => alert(err));
  }

  onSortByLevel(event: Event) {

    if (event.srcElement.classList.contains('disabled')) {return;}
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
