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

  generateLink(data, more): Observable<any[]> {

    this.skip = (more === 'more') ? this.skip + 20 : 0;
    this.path = `https://xenial-log-reader-dev-1575566368.us-east-1.elb.amazonaws.com/es?$skip=${this.skip}&$top=20&$filter=created_at gt \'${this.dateFrom}\' and created_at le \'${this.dateTill}\'`
    for(let key in data) {
      if(data[key]) {
        this.path += ` and ${key} eq \'${data[key]}\'`;
      }
    }
    return this.getLogs(this.path);
  }

  getLogs(src): Observable<any[]> {
    return this.http.get(src)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  setDateFrom(date) {
    this.dateFrom = date;
  }

  setDateTill(date) {
    this.dateTill = date;
  }

}