import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getdataService } from 'src/app/_service/getdata.service';
import { NavigationEnd, Router } from '@angular/router';

interface Literasi {
  id: number;
  foto: string;
}

@Component({
  selector: 'app-entrepreneurship',
  templateUrl: './entrepreneurship.component.html',
  styleUrls: ['./entrepreneurship.component.css']
})
export class EntrepreneurshipComponent implements OnInit {
  isScrolled = false;
  data: any; 
  getImage: Literasi[] = [];

  constructor(private dataService: getdataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.loadDataPkk().subscribe({
      next: (res: any) => {
        this.getImage = res;
      },
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
  
  @HostListener('window:scroll')
    onScroll(): void {
      this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
    }
}
