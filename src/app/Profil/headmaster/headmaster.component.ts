import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-headmaster',
  templateUrl: './headmaster.component.html',
  styleUrls: ['./headmaster.component.css']
})
export class HeadmasterComponent implements OnInit{
  kepalaSekolah: any;

  constructor(private dataService: getdataService, private router: Router) {}

  ngOnInit()  {
    this.dataService.loadDataKepalaSekolah().subscribe((data: any) => {
      this.kepalaSekolah = data;
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

  isScrolled = false;
  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }
}
