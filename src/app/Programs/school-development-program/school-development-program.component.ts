import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-school-development-program',
  templateUrl: './school-development-program.component.html',
  styleUrls: ['./school-development-program.component.css']
})
export class SchoolDevelopmentProgramComponent implements OnInit{
  rombel: any;
  constructor(private router: Router, private dataService : getdataService){}
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();
      }
    });



     //jumlahrombel
     this.dataService.loadDataJumlah().subscribe((data: any) => {
      this.rombel = data.rombel;
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
  onScroll(): void {
    this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }
}
