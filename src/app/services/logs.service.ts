import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/from';
import { logsData } from '../data/logs-data';

@Injectable()
export class LogsService {

  private dateFrom: string;
  private dateTill: string;
  private skip: number = 0;
  private top: number = 20;
  private total: number = 20;
  private token;

  constructor(private http:Http) {}

  generateLink(data, more): Observable<any[]> {

    let headers = new Headers();
    headers.append('Authorization',`Bearer ${this.token}`);
    if (more === 'more') {
      this.skip += 20;
      this.total += 20;
    }
    let src = `https://xenial-log-reader-dev-1575566368.us-east-1.elb.amazonaws.com/es?$skip=${this.skip}&$top=${this.top}&$filter=created_at gt \'${this.dateFrom}\' and created_at le \'${this.dateTill}\'`
    for(let key in data) {
      if(data[key]) {
        src += ` and ${key} eq \'${data[key]}\'`;
      }
    }
    // return this.getLogs(src, {headers: headers});
    return this.getLogs();
  }

  exportLogs(data): Observable<any[]> {
    let headers = new Headers();
    headers.append('Authorization',`Bearer ${this.token}`);
    this.skip = 0;
    let src = `https://xenial-log-reader-dev-1575566368.us-east-1.elb.amazonaws.com/es?$skip=${this.skip}&$top=${this.total}&$filter=created_at gt \'${this.dateFrom}\' and created_at le \'${this.dateTill}\'`
    for(let key in data) {
      if(data[key]) {
        src += ` and ${key} eq \'${data[key]}\'`;
      }
    }
    src += `&export=true`;
    // return this.getLogs(src, {headers: headers});
    return this.getLogs();

  }

  // getLogs(src, headers): Observable<any[]> {
  //   return this.http.get(src, headers)
  //     .map((res: Response) => res.json())
  //     .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  // }

  getLogs() {
    return Observable.of(logsData).map(items => items)
  }

  getUserToken(payload) {
    return this.http.post('https://dev-xprtbackend.heartlandcommerce.com/v1/token', payload)
      .map((res:any) => this.token = res._body);
  }


  setPeriod(dateStart, dateEnd) {
    this.dateFrom = dateStart;
    this.dateTill = dateEnd;
  }
}
