import { Component, OnInit, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import * as moment from 'moment';
import { toString } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-log-item',
  templateUrl: './log-item.component.html',
  styleUrls: ['./log-item.component.css'],
  animations: [
    trigger('logState', [
        state('inactive', style({
            height: '75px'
        })),
        state('active', style({
            maxHeight: '100%'
        })),
        transition('inactive => active', animate('400ms ease-in-out')),
        transition('active => inactive', animate('400ms ease-in-out'))
    ]),
  ]
})
export class LogItemComponent implements OnInit {

  @Input('log') logItem: any;
  public expand: string = 'inactive';
  public printDate: string;
  public content;
  public text = true;

  constructor() {}

  ngOnInit() {
    this.printDate = moment.utc(this.logItem.created_at).local().format('HH:mm:ss DD-MMM-YYYY');
    this.content = syntaxHighlight(JSON.stringify(this.logItem, undefined, 4));
  }

  onExpandClick() {
    if(this.expand === 'inactive') {
      this.expand = 'active';
      this.text = false;
    } else {
      this.expand = 'inactive';
      setTimeout(()=>{
        this.text = true;
      }, 350);
    }
  }

}

function syntaxHighlight(json) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
      var cls = 'number';
      if (/^"/.test(match)) {
          if (/:$/.test(match)) {
              cls = 'key';
          } else {
              cls = 'string';
          }
      } else if (/true | false/.test(match)) {
          cls = 'boolean';
      } else if (/null/.test(match)) {
          cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
  });
}
