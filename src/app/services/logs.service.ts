import {Injectable } from '@angular/core';
import {Http,Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {logs} from '../data/logs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/from';

@Injectable()
export class LogsService {

  dateFrom;
  dateTill;
  private path: string;
  private skip: number = 0;


  constructor(private http:Http) {}

  generateLink(data): Observable<any[]> {
    this.path = `https://xenial-log-reader-dev-1575566368.us-east-1.elb.amazonaws.com/es?$skip=${this.skip}&$top=20&$filter=created_at gt \'${this.dateFrom}\' and created_at le \'${this.dateTill}\'`
    for(let key in data) {
      if(data[key]) {
        this.path += ` and ${key} eq \'${data[key]}\'`;
      }
    }
    return this.getLogs();
  }

  getLogs() {
    return this.http.get(this.path)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  setSkip() {
    this.skip += 10;
  }

  setDateFrom(date) {
    this.dateFrom = date;
  }

  setDateTill(date) {
    this.dateTill = date;
  }

}