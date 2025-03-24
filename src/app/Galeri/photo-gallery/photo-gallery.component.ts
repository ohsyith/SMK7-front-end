import { Component, HostListener, OnInit } from '@angular/core';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent implements OnInit{
  isScrolled = false;

  all: any[] = [];
  sekolah: any[] = [];
  keagamaan: any[] = [];
  upacara: any[] = [];
  kerjasama: any[] = [];


  


  ngOnInit() {
    const tabs = document.querySelectorAll('.tab_btn');
    const all_content = document.querySelectorAll('.content');
  
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', (event) => {
        tabs.forEach((tab) => {
          tab.classList.remove('active');
        });
        tab.classList.add('active');
  
        all_content.forEach((content) => {
          content.classList.remove('active');
        });
        all_content[index].classList.add('active');


        var line = document.querySelector('.line') as HTMLElement;
        if (line) {
          if (event.target instanceof HTMLElement) {
            line.style.width = event.target.offsetWidth + "px";
            line.style.left = event.target.offsetLeft + "px";
          }
        }
      });
    })


    this.GetSemua()
    this.GetSekolah()
    this.GetKeagamaan()
    this.GetUpacara()
    this.GetKerjasamaIndustri()

    
  }

  constructor(private dataService: getdataService) {}

  GetSemua(){
    this.dataService.LoadPhotoGallery().subscribe(data => {
      this.all = data;
    });
  }

  GetSekolah(){
    this.dataService.LoadPhotoSekolah().subscribe((data: any) => {
      this.sekolah = data;
    });
  }
  GetKeagamaan(){
    this.dataService.LoadPhotoKeagamaan().subscribe((data: any) => {
      this.keagamaan = data;
    });
  }
  GetUpacara(){
    this.dataService.LoadPhotoUpacara().subscribe((data: any) => {
      this.upacara = data;
    });
  }
  GetKerjasamaIndustri(){
    this.dataService.LoadPhotoKerjasamaIndustri().subscribe((data: any) => {
      this.kerjasama = data;
    });
  }
  

  

  @HostListener('window:scroll')
  onScroll(): void {
      this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }
}
