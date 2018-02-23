import { Component, OnInit, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import * as moment from 'moment';

@Component({
  selector: 'app-log-item',
  templateUrl: './log-item.component.html',
  styleUrls: ['./log-item.component.css'],
  animations: [
    trigger('logState', [
        state('inactive', style({
            height: '75px',
        })),
        state('active', style({
            maxHeight: '100%'
        })),
        transition('inactive => active', animate('400ms ease-in-out')),
        transition('active => inactive', animate('400ms ease-in-out'))
    ])
]
})
export class LogItemComponent implements OnInit {

  @Input('log') logItem: any;
  public expand: string = 'inactive';
  public printDate: string;


  constructor() { }

  ngOnInit() {
    this.printDate = moment.utc(this.logItem.created_at).local().format('HH:mm:ss DD-MMM-YYYY');
  }

  onExpandClick() {
    this.expand = (this.expand === 'inactive') ? 'active' : 'inactive';
  }

}
