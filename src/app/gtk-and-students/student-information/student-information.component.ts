import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Impor HttpClient
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-student-information',
  templateUrl: './student-information.component.html',
  styleUrls: ['./student-information.component.css']
})
export class StudentInformationComponent implements OnInit {
  isScrolled = false;
  apiData: any[] = []; // Variabel untuk menyimpan data dari API

  constructor(private dataService: getdataService) {
  }

  ngOnInit() {
    this.dataService.loadJurusan().subscribe((data: any) => {
      this.apiData = data;
    });
  }

  
  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }
}
