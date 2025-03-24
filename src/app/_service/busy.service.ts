import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  busyRequestCount = 0;

  constructor(private spinnerService: NgxSpinnerService) {}

  busy() {
    this.busyRequestCount++;
    this.spinnerService.show(undefined, {
      bdColor: 'rgba(255, 255, 255, 0)',
      color: '#333333',
    });
    this.setBodyOverflow('hidden');
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinnerService.hide();
      this.setBodyOverflow('auto');
    }
  }

  private setBodyOverflow(value: string) {
    document.body.style.overflow = value;
  }
}
