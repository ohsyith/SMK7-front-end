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
  selector: 'app-school-news',
  templateUrl: './school-news.component.html',
  styleUrls: ['./school-news.component.css']
})
export class SchoolNewsComponent implements OnInit{

  listOfDataBerita: {id:number, judul: string, tanggal: string, isi: string, foto: string | undefined }[] = [];
  listOfDataPengumuman: {id:number, judul: string, tanggal: string, isi: string, foto: string | undefined }[] = [];
  searchKeyword: string = '';
  originalListBerita: {id:number, judul: string, tanggal: string, isi: string, foto: string | undefined }[] = [];
  showTerbaru: boolean = true;
  showPengumuman: boolean = true;


  constructor(private dataService : getdataService){}

  ngOnInit(): void {
    this.GetBerita()
    this.GetPengumaman()
  }


  GetBerita() {
    this.dataService.LoadBeritas().subscribe((data: NewsItem[]) => {
      const beritaData = data.map((item: NewsItem) => ({
        id : item.id,
        judul: item.judul,
        tanggal: item.tanggal,
        isi: item.isi,
        foto: item.foto.find((foto) => foto.isMain)?.url,
      }));
      this.listOfDataBerita = beritaData;
      this.originalListBerita = beritaData; // Salin data asli ke originalListBerita
    });
  }
  

  GetPengumaman(){
    this.dataService.LoadPengumuman().subscribe((data: NewsItem[]) => {
      this.listOfDataPengumuman = data.map((item: NewsItem) => ({
        id: item.id,
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
      this.showPengumuman = true;
      this.GetBerita(); // Kembalikan ke data asli
    } else {
      this.showTerbaru = false;
      this.showPengumuman = false;
      this.listOfDataBerita = this.originalListBerita.filter(item => {
        return item.judul.toLowerCase().includes(this.searchKeyword.toLowerCase());
      });
    }
  }
  
  
  
  
  clearSearch() {
    this.searchKeyword = '';
    this.showTerbaru = true;
  this.showPengumuman = true;
    this.GetBerita(); // Kembalikan ke data asli
  }
  
  

  
  
  isScrolled = false;
  @HostListener('window:scroll')
  onScroll(): void {
      this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }
}
