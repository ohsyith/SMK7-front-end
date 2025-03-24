import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-teaching-factory',
  templateUrl: './teaching-factory.component.html',
  styleUrls: ['./teaching-factory.component.css']
})
export class TeachingFactoryComponent implements OnInit {
  isScrolled = false;
  data: any[] = [];

  constructor(private dataService: getdataService, private router: Router) {}

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }

  ngOnInit() {
    this.dataService.loadTeachingFactory().subscribe((response) => {
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