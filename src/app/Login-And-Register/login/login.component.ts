import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {  Tokens, User, Usertype } from 'src/Model/Model';
import { Router } from '@angular/router';
import { interval, Observable, of, Subscription } from 'rxjs';
import { ApiService } from 'src/Services/api.service';
import { NotifyService } from 'src/Notifservice/notify.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginform: FormGroup;
  responsemsg: any;
  hide = true;
  hasError = false;
  isHovered: boolean = false;
currentUser$: Observable<Tokens | null>=of(null)
  private cooldownSubscription: Subscription | undefined;
  private cooldownTimeInSeconds: number = 60;
  private invalidAttemptCount: number = 0;
  cooldownTime: Date = new Date(0);

  constructor(private Api: ApiService, private fb: FormBuilder, private router: Router,private notif: NzNotificationService) {
    this.loginform = fb.group({
      usernameOrEmail: fb.control('', [Validators.required]),
      Password: fb.control('', [Validators.required]),
    });
  }

  ngOnInit() {

    const savedCooldownEndTime = localStorage.getItem('cooldownEndTime');
    if (savedCooldownEndTime) {
      const cooldownEndTime = new Date(savedCooldownEndTime);
      const currentTime = new Date();

      if (currentTime < cooldownEndTime) {

        this.startCooldownTimer((cooldownEndTime.getTime() - currentTime.getTime()) / 1000);
      }
    }
  }

  ngOnDestroy() {

    this.cooldownSubscription?.unsubscribe();
  }

  toggleHover() {
    this.isHovered = !this.isHovered;
  }

  Logins() {

    if (this.isCooldownActive) {
      return;
    }

    this.hasError = this.loginform.invalid;

    if (!this.hasError) {
      let user: User = {
        id: 0,
        Username: this.loginform.get('usernameOrEmail')?.value,
        Email: this.loginform.get('usernameOrEmail')?.value,
        Password: this.loginform.get('Password')?.value,
        newPassword: '',
        kode: '',
        Image: '',
        usertype: Usertype.USER,
      };

      this.Api.Logins(user).subscribe({
        next: (res: any) => {

          this.notif.success('Success :', 'Anda berhasil login')
          
          this.responsemsg = res.toString();
          const tak = this.Api.getLevelFromToken();
          if (tak === '81nPYdU4y2Apde6fNLoecuuypc05bKvn') {
            this.router.navigate(['admin/Dashboard']);
          } else if (tak === 'USER') {
            this.router.navigate(['Blogger/Home']);
        } else {
          this.router.navigate(['NotFound']);
        }
      },
      error: (err: any) => {
        if (err.error) {
            this.notif.error('error :', err.error)
            this.handleInvalidLoginAttempt();
          }

        },
      });
    } else {
      this.handleInvalidLoginAttempt();
    }
  }




  private handleInvalidLoginAttempt() {

    this.invalidAttemptCount++;

    if (this.invalidAttemptCount >= 3) {
      this.startCooldownTimer(this.cooldownTimeInSeconds);
    }


  }


  private startCooldownTimer(cooldownTimeInSeconds: number) {

    this.cooldownSubscription?.unsubscribe();

    const cooldownEndTime = new Date();
    cooldownEndTime.setSeconds(cooldownEndTime.getSeconds() + cooldownTimeInSeconds);


    localStorage.setItem('cooldownEndTime', cooldownEndTime.toISOString());


    let count = 0;
    this.cooldownSubscription = interval(1000)
      .subscribe(() => {
        if (count < cooldownTimeInSeconds) {

          const remainingTimeInSeconds = cooldownTimeInSeconds - count;
          this.cooldownTime = new Date(remainingTimeInSeconds * 1000);
          count++;
        } else {

          this.cooldownSubscription?.unsubscribe();
          this.cooldownSubscription = undefined;
          this.resetInvalidAttemptCount();
          this.cooldownTime = new Date(0);
          localStorage.removeItem('cooldownEndTime');
        }
      });
  }


  private resetInvalidAttemptCount() {
    this.invalidAttemptCount = 0;
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  getButtonStyle() {
    const hasErrorMessage = this.loginform.get('usernameOrEmail')?.hasError('required') || this.loginform.get('Password')?.hasError('required');

    return { 'cursor': (this.isHovered && hasErrorMessage && !this.isCooldownActive) ? 'not-allowed' : 'pointer' };
  }


  get isCooldownActive(): boolean {
    return !!this.cooldownSubscription;
  }
}
