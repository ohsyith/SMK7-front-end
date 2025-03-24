import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getdataService } from 'src/app/_service/getdata.service';

interface Achievement {
  id: number;
  keterangan: string;
  tahun: string;
}

@Component({
  selector: 'app-student-achievement',
  templateUrl: './student-achievement.component.html',
  styleUrls: ['./student-achievement.component.css']
})
export class StudentAchievementComponent implements OnInit {
  data: Achievement[] = [];
  isScrolled = false;

  constructor(private dataService: getdataService) {}

  ngOnInit() {
    this.dataService.loadPrestasiSiswa()
      .subscribe((response: Achievement[]) => {
        this.data = response;
      });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }
}
