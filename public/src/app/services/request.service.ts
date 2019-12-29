import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';


@Injectable()
export class RequestService {
    constructor(private http: HttpClient) { }

    send(method: string, url: string, data: any = {}) : Observable<any> {
        switch(method || 'get') {
            case 'get': {
                return this.http.get(url, {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
            }
            case 'post': {
                return this.http.post(url, data, {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
            }
            case 'delete': {
                return this.http.delete(url, {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
            }
            case 'put': {
                return this.http.put(url, data, {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
            }
        }
    }
}