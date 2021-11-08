import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from 'src/app/providers/api.service';
// import { bindCallback } from 'rxjs';
// import { map } from 'rxjs/operators';
import { TAB_ID } from 'src/app/providers/tab-id.provider';
import { Event } from 'src/app/modules/popup/models/event';

@Component({
  selector: 'app-popup',
  templateUrl: 'popup.component.html',
  styleUrls: ['popup.component.scss']
})
export class PopupComponent implements OnInit {
  name: string;
  location: string;
  date: Date;
  description: string;
  // message: string;

  // validation properties
  MIN_DATE: Date = null;

  constructor(@Inject(TAB_ID) readonly tabId: number, private api: ApiService) { }

  ngOnInit(): void {
    const now = new Date();
    this.MIN_DATE = new Date(now.getFullYear(), now.getMonth(), now.getDay());
  }

  public sayHello() {
    this.api.getHello().subscribe(out => console.log('out', out));

    
    if (this.name) {

      this.api.createEvent({
        name: this.name,
        location: this.location,
        date: this.date,
        description: this.description
      }).subscribe(e => {
        console.log('done', e);
      });
    }
  }

  public isValid(): boolean {
    return this.name && this.location && this.date != null;
  }

  // async onClick(): Promise<void> {
  //   this.message = await bindCallback<string>(chrome.tabs.sendMessage.bind(this, this.tabId, 'request'))()
  //     .pipe(
  //       map(msg =>
  //         chrome.runtime.lastError
  //           ? 'The current page is protected by the browser, goto: https://www.google.nl and try again.'
  //           : msg
  //       )
  //     )
  //     .toPromise();
  // }
}
