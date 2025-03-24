import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-program-bussiness-center',
  templateUrl: './program-bussiness-center.component.html',
  styleUrls: ['./program-bussiness-center.component.css']
})
export class ProgramBussinessCenterComponent implements OnInit {
  isScrolled = false;
  data: any[] = [];

  constructor(private dataService: getdataService, private router: Router) {}

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }

  ngOnInit() {
    this.dataService.loadProgramBussinessCenter().subscribe((response) => {
      this.data = response;
    });


    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();
      }
    });
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}