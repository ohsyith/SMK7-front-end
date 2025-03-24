import { Component, Output, EventEmitter, ViewChild, ElementRef, HostListener, Renderer2, OnInit } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { Observable, of } from 'rxjs';
import { Tokens } from 'src/Model/Model';
import { ApiService } from 'src/Services/api.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit  {
  isScrolled = false;
  navbarElement: HTMLElement;
  isLoggedIn = false;
  isAdmin = false;
  isUser = false;

  constructor(private el: ElementRef, private renderer: Renderer2,private apiService: ApiService) {
    this.navbarElement = this.el.nativeElement;
  }



  ngOnInit() {
    const views = this.apiService.getLevelFromToken();

    if(views == "81nPYdU4y2Apde6fNLoecuuypc05bKvn"){
      this.isAdmin = true;

    }else {
      this.isAdmin = false;
    }

    if(views == "USER"){
      this.isUser = true;
    }else{
      this.isUser = false;
    }

    this.isLoggedIn = this.apiService.checkLoggedIn();
  }


  logout(){
    this.apiService.Logout();
    this.isLoggedIn = false;
    window.location.reload();
  }



  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;

    // Dapatkan elemen navbar
    const navbar = this.navbarElement.querySelector('.navbar');

    if (navbar) {
      if (!this.isScrolled) {
        // Scrolling dimulai, tambahkan kelas "navbar-dark"
        navbar.classList.remove('navbar-light');
        navbar.classList.add('navbar-dark');
      } else {
        // Scrolling kembali ke posisi awal, menghapus kelas "navbar-dark"
        navbar.classList.remove('navbar-dark');
        navbar.classList.add('navbar-light');
      }
    }
  }


}
