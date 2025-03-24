import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-gtk-information',
  templateUrl: './gtk-information.component.html',
  styleUrls: ['./gtk-information.component.css']
})
export class GtkInformationComponent implements OnInit {
  positionData: { [key: string]: any } = {
    kepalasekolah: [],
    wakilkepalasekolah: [],
    ketuaprogramstudi: [],
    kepur: [],
    gurumm: [],
    gururpl: [],
    gurutitl: [],
    gurutkj: [],
    bimbingankonseling: [],
    tenagakependidikan: [],
  };

  constructor(private dataService: getdataService, private router: Router) {}

  ngOnInit() {
    this.getPositionData('Kepala Sekolah');
    this.getPositionData('Wakil Kepala Sekolah');
    this.getPositionData('Ketua Program Studi');
    this.getPositionData('Kepala Perpustakaan');
    this.getPositionData('Guru Multimedia');
    this.getPositionData('Guru RPL');
    this.getPositionData('Guru TITL');
    this.getPositionData('Guru TJAT');
    this.getPositionData('Guru TKJ');
    this.getPositionData('Guru BK');
    this.getPositionData('Tenaga Kependidikan');
  }

  getPositionData(jabatan: string) {
    this.dataService.loadDataGTK(jabatan)
      .subscribe((data) => {
        if (data && data.length > 0) {
          this.positionData[jabatan] = data;
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

  isScrolled = false;
  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }
}
