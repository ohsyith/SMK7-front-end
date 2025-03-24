import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getdataService } from 'src/app/_service/getdata.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css']
})
export class StructureComponent implements OnInit {
  isScrolled = false;
  strukturData: any[] = [];
  tahun: string = '';

  constructor(private dataService: getdataService, private router: Router) {}

  ngOnInit() {
    this.dataService.loadStrukturOrganisasi().subscribe((data: any[]) => {
        if (data.length > 0) {
          this.strukturData = data;
          this.tahun = data[0].tahun;
        }
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
  onScroll() {
    this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }
}
