import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-log-item',
  templateUrl: './log-item.component.html',
  styleUrls: ['./log-item.component.css']
})
export class LogItemComponent implements OnInit {

  @Input('log') logItem;
  public expand: boolean = true;
  public printDate: string;


  constructor() { }

  ngOnInit() {
    this.printDate = moment(this.logItem.created_at).format('HH:mm:ss DD-MMM-YYYY');
  }

  onExpandClick() {
    this.expand = !this.expand;
  }

}
