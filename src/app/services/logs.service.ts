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

    constructor(private http:Http ) {}

    getItems(): Observable<any[]> {
        return Observable.of(logs)
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}