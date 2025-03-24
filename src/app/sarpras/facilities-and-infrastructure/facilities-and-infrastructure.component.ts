import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getdataService } from 'src/app/_service/getdata.service';
import { NavigationEnd, Router } from '@angular/router';

interface SaranaPrasarana {
  id: number;
  namaRuangan: string;
  jumlah: number;
  luasUnit: number;
  kondisi: string;
  kebutuhan: number;
  kurang: number;
}

@Component({
  selector: 'app-facilities-and-infrastructure',
  templateUrl: './facilities-and-infrastructure.component.html',
  styleUrls: ['./facilities-and-infrastructure.component.css']
})
export class FacilitiesAndInfrastructureComponent implements OnInit {
  prestasiList: any[] = [];

  isScrolled = false;

  constructor(private dataService: getdataService, private router: Router) {}

  ngOnInit(): void {
    this.fetchDataFromAPI();
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
  fetchDataFromAPI(): void {

    this.dataService.loadDataSarpras().subscribe((data) => {
      this.prestasiList = data.map((item, index) => ({
        No: index + 1,
        NamaRuangan: item.namaRuangan,
        Jumlah: item.jumlah,
        Luasunit: item.luasUnit,
        Kondisi: item.kondisi,
        Kebutuhan: item.kebutuhan,
        Kurang: item.kurang,
      }));
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }
}
