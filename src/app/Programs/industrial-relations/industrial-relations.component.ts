import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getdataService } from 'src/app/_service/getdata.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-industrial-relations',
  templateUrl: './industrial-relations.component.html',
  styleUrls: ['./industrial-relations.component.css'],
})
export class IndustrialRelationsComponent implements OnInit {
  isScrolled = false;
  data: any[] = [];

  constructor(private dataService: getdataService, private router: Router) {}

  ngOnInit() {
    this.dataService.loadHubunganIndustri().subscribe((response) => {
      this.data = response;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();
      }
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled =
      window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
