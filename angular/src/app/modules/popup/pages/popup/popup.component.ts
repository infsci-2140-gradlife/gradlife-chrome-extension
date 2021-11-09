import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/providers/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Event } from '../../models/event';
import { ChromeService } from 'src/app/providers/chrome.service';

@Component({
  selector: 'app-popup',
  templateUrl: 'popup.component.html',
  styleUrls: ['popup.component.scss']
})
export class PopupComponent implements OnInit {
  // validation properties
  MIN_DATE: Date = null;

  // display management
  eventForm: FormGroup = null;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private chrome: ChromeService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    const now = new Date();
    this.MIN_DATE = new Date(now.getFullYear(), now.getMonth(), now.getDay());

    this.eventForm = this.formBuilder.group({
        name: "",
        description: "",
        location: "",
        date: now,
        time: now.toTimeString().substring(0, 5),
    });

    this.chrome.getCachedEvent().then(e => {
      if(e) {
        this.setFormFromEvent(e);
      }
      else {
        this.initForm();
      }
    });

    this.eventForm.valueChanges.subscribe(f => {
      const event = this.buildEvent()
      this.chrome.storeCachedEvent(event);
    });
  }

  public click() {
    this.isLoading = true;

    this.api.createEvent(this.buildEvent()).subscribe(e => {
      this.runSnackbar();
      this.initForm();
      this.isLoading = false;
    });
  }

  public getHelp() {
    this.chrome.openTab('mailto:ben.s.stein@gmail.com');
  }

  private setFormFromEvent(event: Event) {
    this.eventForm.controls.name.setValue(event.name);
    this.eventForm.controls.description.setValue(event.description);
    this.eventForm.controls.location.setValue(event.location);
    this.eventForm.controls.date.setValue(event.date);
    this.eventForm.controls.time.setValue(event.date.toTimeString().substring(0,5));
  }

  private buildEvent(): Event {
    const raw = this.eventForm.value;
    const originalDate: Date = raw.date;

    // for some reason, the raw form data has an incorrect value for the time value?
    const realDate = new Date(`${originalDate.toDateString()} ${this.eventForm.controls.time.value}:00`);
    raw.date = realDate;
    delete raw.time;
    
    return raw;
  }

  private initForm() {    
    this.setFormFromEvent(new Event());
  }

  private runSnackbar() {
    const ref = this.snackbar.open("Event created! Thanks!", "OK", { duration: 3000 });

    ref.onAction().subscribe(a => ref.dismiss());
  }
}
