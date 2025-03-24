import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { getdataService } from 'src/app/_service/getdata.service';

interface NewsItem {
  id: number;
  category: string;
  judul: string;
  tanggal: string;
  isi: string;
  foto: { id: number, url: string, isMain: boolean }[];
  
}
@Component({
  selector: 'app-schoozl-news',
  templateUrl: './school-announcement.component.html',
  styleUrls: ['./school-announcement.component.css']
})
export class SchoolAnnouncementComponent implements OnInit{

  listOfDataPengumuman: { id:number, judul: string, tanggal: string, isi: string, foto: string | undefined }[] = [];
  listOfDataBerita: { id:number, judul: string, tanggal: string, isi: string, foto: string | undefined }[] = [];
  searchKeyword: string = '';
  originalListPengumuman: { id:number, judul: string, tanggal: string, isi: string, foto: string | undefined }[] = [];
  showTerbaru: boolean = true;
  showBerita: boolean = true;


  constructor(private dataService : getdataService){}

  ngOnInit(): void {
    this.GetPengumuman()
    this.GetBerita()
  }


  GetPengumuman() {
    this.dataService.LoadPengumuman().subscribe((data: NewsItem[]) => {
      const pengumumanData = data.map((item: NewsItem) => ({
        id : item.id,
        judul: item.judul,
        tanggal: item.tanggal,
        isi: item.isi,
        foto: item.foto.find((foto) => foto.isMain)?.url,
      }));
      this.listOfDataPengumuman = pengumumanData;
      this.originalListPengumuman = pengumumanData; // Salin data asli ke originalListBerita
    });
  }
  

  GetBerita(){
    this.dataService.LoadBeritas().subscribe((data: NewsItem[]) => {
      this.listOfDataBerita = data.map((item: NewsItem) => ({
        id : item.id,
        judul: item.judul,
        tanggal: item.tanggal,
        isi: item.isi,
        foto: item.foto.find((foto) => foto.isMain)?.url,
      }));
    });
  }

  searchData() {
    if (this.searchKeyword.trim() === '') {
      this.showTerbaru = true;
      this.showBerita = true;
      this.GetPengumuman(); // Kembalikan ke data asli
    } else {
      this.showTerbaru = false;
      this.showBerita = false;
      this.listOfDataPengumuman = this.originalListPengumuman.filter(item => {
        return item.judul.toLowerCase().includes(this.searchKeyword.toLowerCase());
      });
    }
  }
  
  
  
  
  clearSearch() {
    this.searchKeyword = '';
    this.showTerbaru = true;
  this.showBerita = true;
    this.GetBerita(); // Kembalikan ke data asli
  }
  
  

  
  
  isScrolled = false;
  @HostListener('window:scroll')
  onScroll(): void {
      this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }
  
}
