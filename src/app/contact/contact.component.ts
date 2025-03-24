import { Component, HostListener, OnInit } from '@angular/core';
import { getdataService } from '../_service/getdata.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/Services/api.service';
import { Email } from 'src/Model/Model';


interface Contact {
  telp: string;
  instagram:string;
  facebook:string;
}
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{

  isHovered= false;
  hasError = false;
constructor(private dataService : getdataService, private fb: FormBuilder,private Api: ApiService,private goes: Router){
  this.Emails = fb.group({
    body: fb.control('',[Validators.required]),
    fromEmail: fb.control('',[Validators.required,Validators.email]),
    subject: fb.control('',[Validators.required]),
  });
}
Emails: FormGroup;
  responsemsg: any;
con: Contact[] = [];

toggleHover() {
  this.isHovered = !this.isHovered;
}


     getButtonStyle() {
  const hasErrorMessage = this.Emails.get('body')?.hasError('required') || this.Emails.get("fromEmail")?.hasError('email') || this.Emails.get('fromEmail')?.hasError('required') || this.Emails.get('subject')?.hasError('required')
  return { 'cursor': (this.isHovered && hasErrorMessage) ? 'not-allowed' : 'pointer' };
}


SendEmail() {
this.hasError = this.Emails.invalid
if(!this.hasError){
  
  let email: Email = {

body : this.Emails.get('body')?.value,
fromEmail : this.Emails.get('fromEmail')?.value,
subject: this.Emails.get('subject')?.value


  };
  this.Api.ReceiveEmail(email).subscribe({
    next: (res: any) => {
      console.log(res)
      alert("Successfully send Email ^-^");

    },
    error: (err: any) => {
      console.log(err)
      alert("Trouble Register x-x")
    },
  });
}
}

  ngOnInit(): void {
    this.dataService.getDataKontak().subscribe({
      next: (res: any) => {
        this.con = res;
      }
    });
  
  }


  isScrolled = false;
  @HostListener('window:scroll')
  onScroll(): void {
      this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }
}
