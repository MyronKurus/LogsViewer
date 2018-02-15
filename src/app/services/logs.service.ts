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

    constructor(private http:Http) {}

    getItems(): Observable<any[]> {
        return Observable.of(logs)
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    setDateFrom(date) {
        this.dateFrom = date;
    }

    setDateTill(date) {
        this.dateTill = date;
    }

    generatePath(data) {
      let path = `/es?$skip=2&$top=2&$filter=created_at le ${this.dateFrom} and created_at gt ${this.dateTill}`
      for(let key in data) {
        if(data[key]) {
          path += ` and ${key} eq \'${data[key]}\'`;
        }
      }
      console.log(path);
    }

}