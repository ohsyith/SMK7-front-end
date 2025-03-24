import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-graduation-mapping',
  templateUrl: './graduation-mapping.component.html',
  styleUrls: ['./graduation-mapping.component.css']
})
export class GraduationMappingComponent implements OnInit {
  isScrolled = false;
  list: any;

  constructor(private dataService: getdataService) {}

  ngOnInit() {
    this.dataService.loadPemetaanKelulusan().subscribe((data: any) => {
      this.list = data;
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }
}
