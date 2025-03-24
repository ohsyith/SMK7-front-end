import { Usertype,User } from 'src/Model/Model';
import { Component } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/Services/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerforms: FormGroup;
  isHovered= false;
  responsemsg: any;
  hasError = false;
constructor(private fb: FormBuilder,private Api: ApiService,private goes: Router,private notif: NzNotificationService){
  this.registerforms = fb.group({
    Username: fb.control('',[Validators.required]),
    Email: fb.control('',[Validators.required,Validators.email]),
    Password: fb.control('',[Validators.required,Validators.minLength(8)]),
    repeatPassword : fb.control('',[repeatpass])
  },{
  Validators : [repeatpass],
  }as AbstractControlOptions
  );
}



register() {

  this.hasError = this.registerforms.invalid;
  if(!this.hasError){
  let user: User = {
    id: 0,
    Username: this.registerforms.get('Username')?.value,
    Email: this.registerforms.get('Email')?.value,
    Password: this.registerforms.get('Password')?.value,
    newPassword: '',
    kode: '',
    Image: '',

    usertype: Usertype.USER,
  };
  this.Api.Register(user).subscribe({
    next: (res: any) => {
      this.notif.success('Success :', 'Anda Berhasil Register, Silahkan Konfirmasi Lewat Email')
      this.goes.navigate(["login"])
    },
    error: (err: any) => {
      if (err.error) {
        this.notif.error('error :',err.error )

      }
    },
  });
  }
   }

toggleHover() {
  this.isHovered = !this.isHovered;
}


     getButtonStyle() {
  const hasErrorMessage = this.registerforms.get('Username')?.hasError('required') || this.registerforms.get('Password')?.hasError('required') || this.registerforms.get('Password')?.hasError('minlength') || this.registerforms.get('Email')?.hasError('email') || this.registerforms.get('Email')?.hasError('required');

  return { 'cursor': (this.isHovered && hasErrorMessage) ? 'not-allowed' : 'pointer' };
}
}


export const repeatpass: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const pws = control.get('Password')?.value
  const pwsd = control.get('repeatPassword')?.value
  if(pws === pwsd){
    control.get('repeatPassword')?.setErrors(null);
    return null;
  }else{
    control.get('repeatPassword')?.setErrors({repeatPassword : true});
    return {repeatPassword: true}
  }
}
