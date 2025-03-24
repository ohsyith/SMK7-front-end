import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { interval } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { User, Usertype } from 'src/Model/Model';
import { ApiService } from 'src/Services/api.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  responsemsg : any
  forget:FormGroup
  forgets:FormGroup
  isHovered = false;
  private cooldownSubscription: Subscription | undefined;
  private cooldownTimeInSeconds: number = 60;
  private invalidAttemptCount: number = 0;
  cooldownTime: Date = new Date(0);

  hasError = false;


constructor(private Api : ApiService,private gogo: Router,private fb: FormBuilder,private notif: NzNotificationService){
  this.forget = fb.group({

    kode: fb.control('',[Validators.required]),
    newPassword: fb.control('',[Validators.required,Validators.minLength(8)])
  })
  this.forgets = fb.group({
    Email: fb.control('',[Validators.required,Validators.email]),

  })
}

ngOnInit() {

  const savedCooldownEndTime = localStorage.getItem('cooldownEndsTime');
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

Forgets() {

  
  if (this.isCooldownActive) {
    return;
  }


  this.hasError = this.forgets.invalid;
if(!this.hasError){
  let user: User = {
    id: 0,
    Username: '',
    kode:'',
    Email: this.forgets.get('Email')?.value,
    Password: "",
    newPassword: '',
    Image: '',
    usertype:Usertype.USER,
  };
  this.Api.Forgetpassword(user).subscribe({
    next: (res: any) => {
      this.notif.info('info :', 'We already Send a verification Email to reset your password ^-^');
      this.responsemsg = res.toString();
      this.handleInvalidLoginAttempt();
    },
    error: (err: any) => {
    if(err.error){
      this.notif.error('error :',err.error )
    }
    },
  });
}
}


private handleInvalidLoginAttempt() {

  this.invalidAttemptCount++;

  if (this.invalidAttemptCount >= 1) {
    this.startCooldownTimer(this.cooldownTimeInSeconds);
  }


}

private startCooldownTimer(cooldownTimeInSeconds: number) {

  this.cooldownSubscription?.unsubscribe();

  const cooldownEndTime = new Date();
  cooldownEndTime.setSeconds(cooldownEndTime.getSeconds() + cooldownTimeInSeconds);


  localStorage.setItem('cooldownEndsTime', cooldownEndTime.toISOString());


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
        localStorage.removeItem('cooldownEndsTime');
      }
    });
}

private resetInvalidAttemptCount() {
  this.invalidAttemptCount = 0;
}

resetPassword() {


  this.hasError = this.forget.invalid;
  if(!this.hasError){
  let user: User = {
    id: 0,
    Username: '',
    kode:this.forget.get('kode')?.value,
    Email: '',
    Password: "",
    newPassword: this.forget.get('newPassword')?.value,
    Image: '',
    usertype:Usertype.USER,
  };
  this.Api.resetpass(user).subscribe({
    next: (res: any) => {
      this.notif.success('Success :', 'Reset Password Successfully ^-^')
      this.gogo.navigate(["login"])
      this.responsemsg = res.toString();
    },
    error: (err: any) => {
      this.notif.error('error :', 'Gagal melakukan reset password' )
     
    },
  });
}
}












getButtonForgetStyle() {
  const hastErrorMessage = this.forget.get('newPassword')?.hasError('minlength') || this.forget.get('newPassword')?.hasError('required') || this.forget.get('kode')?.hasError('required');

  return { 'cursor': (this.isHovered && hastErrorMessage) ? 'not-allowed' : 'pointer' };
}
getButtonSendStyle() {
  const hasErrorMessage = this.forgets.get('Email')?.hasError('email') || this.forgets.get('Email')?.hasError('required');

  return { 'cursor': (this.isHovered && hasErrorMessage && !this.isCooldownActive) ? 'not-allowed' : 'pointer' };
}

get isCooldownActive(): boolean {
  return !!this.cooldownSubscription;
}


}
