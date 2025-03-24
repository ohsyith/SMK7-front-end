import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-extracurricular',
  templateUrl: './extracurricular.component.html',
  styleUrls: ['./extracurricular.component.css']
})
export class ExtracurricularComponent implements OnInit {
  isScrolled = false;
  extracurricularData: any[] = [];

  constructor(private dataService: getdataService) {}

  ngOnInit(): void {
    this.dataService.loadEkstrakulikuler().subscribe((data) => {
      this.extracurricularData = data as any[];
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }
}
