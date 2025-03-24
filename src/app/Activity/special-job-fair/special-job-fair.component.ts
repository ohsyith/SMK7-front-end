import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-special-job-fair',
  templateUrl: './special-job-fair.component.html',
  styleUrls: ['./special-job-fair.component.css'],
})
export class SpecialJobFairComponent implements OnInit {
  isScrolled = false;
  tahun!: string;
  foto!: string;
  data: any[] = []; // Variabel untuk menyimpan data dari API

  constructor(private dataService: getdataService) {}

  ngOnInit(): void {
    //get Struktur
    this.dataService.loadStrukturBursa().subscribe((response: any) => {
      if (response && response.length > 0) {
        this.tahun = response[0].tahun;
        this.foto = response[0].foto;
      }
    });

    //get data BursaKerja
    this.dataService.loadDataBursaKerja().subscribe((response: any) => {
      if (response && response.length > 0) {
        this.data = response; // Menyimpan data dari API ke dalam variabel 'data'
      }
    });
  }

  findMainFoto(fotos: any[]): string {
    const mainFoto = fotos.find((foto) => foto.isMain);
    return mainFoto ? mainFoto.url : '';
  }

  getNonMainFotos(entry: any): any[] {
    return entry.foto.filter((foto: any) => !foto.isMain);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled =
      window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }
}
