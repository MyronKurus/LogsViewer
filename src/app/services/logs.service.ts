import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/from';

@Injectable()
export class LogsService {

  private dateFrom: string;
  private dateTill: string;
  private skip: number = 0;
  private top: number = 20;
  private total: number = 20;

  constructor(private http:Http) {}

  generateLink(data, more): Observable<any[]> {
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
    return this.getLogs(src);
  }

  exportLogs(data): Observable<any[]> {
    this.skip = 0;
    let src = `https://xenial-log-reader-dev-1575566368.us-east-1.elb.amazonaws.com/es?$skip=${this.skip}&$top=${this.total}&$filter=created_at gt \'${this.dateFrom}\' and created_at le \'${this.dateTill}\'`
    for(let key in data) {
      if(data[key]) {
        src += ` and ${key} eq \'${data[key]}\'`;
      }
    }
    src += `&export=true`;
    return this.getLogs(src);
  }

  getLogs(src): Observable<any[]> {
    return this.http.get(src)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  setPeriod(dateStart, dateEnd) {
    this.dateFrom = dateStart;
    this.dateTill = dateEnd;
  }
}
