import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Event } from 'src/app/modules/popup/models/event';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private API_ROOT = 'https://us-central1-gradlife-505dc.cloudfunctions.net/';
  
  constructor(private httpClient: HttpClient) { }

  public getHello() {
    return this.httpClient.get(`${this.API_ROOT}createEvent`);
  }

  public createEvent(event: Event): Observable<Object> {
    return this.httpClient.post(`${this.API_ROOT}createEvent`, event);
  }
}