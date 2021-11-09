import { Injectable } from '@angular/core';
import { Event } from '../modules/popup/models/event';

@Injectable({ providedIn: 'root' })
export class ChromeService {
  public openTab(url: string) {
    chrome.tabs.create({ url: url });
  }

  public getCachedEvent(): Promise<Event> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(stored => {
        if(stored.cachedEvent) {
          const cachedEvent = stored.cachedEvent;
          cachedEvent.date = new Date(stored.cachedEventDate);

          resolve(cachedEvent);
          return;
        }
        resolve(null);
      });
    });
  }

  public storeCachedEvent(event: Event) {
    chrome.storage.local.set({ 
      cachedEvent: event,
      cachedEventDate: event.date.toString()
    });
  }
}
