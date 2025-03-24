import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-axioo',
  templateUrl: './axioo.component.html',
  styleUrls: ['./axioo.component.css'],
})
export class AxiooComponent implements OnInit {
  rombel: any;
  constructor(private router: Router, private dataService: getdataService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();
      }
    });

    //jumlahrombel
    this.dataService.loadDataJumlah().subscribe((data: any) => {
      this.rombel = data.rombel;
    });
  }

  isScrolled = false;

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled =
      window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }
}
