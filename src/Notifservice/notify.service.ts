import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';



@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  private notyf: Notyf;

  constructor() {


    this.notyf = new Notyf({
      position: { x: 'center', y: 'top' },


      types: [
        {
          type: 'success',
          background: '#28a745',
          icon: false,
        },
        {
          type: 'error',
      background: 'indianred',
      duration: 2000,
      dismissible: true
        },
      ],
    });
  }


  success(message: string) {
    this.notyf.success(message);
  }

  error(message: string) {
    this.notyf.error(message);
  }
 }



