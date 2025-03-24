import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-vision-and-mission',
  templateUrl: './vision-and-mission.component.html',
  styleUrls: ['./vision-and-mission.component.css']
})
export class VisionAndMissionComponent implements OnInit{
  isScrolled = false;
  rombel: any;
  constructor(private router: Router, private dataService: getdataService) {this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      window.scrollTo(0, 0);
    }
  });}

  
  ngOnInit(): void {
    this.loadData();
    }

    loadData(){
      //jumlahrombel
      this.dataService.loadDataJumlah().subscribe((data: any) => {
        this.rombel = data.rombel;
      });
  
    
  }
  

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }
}
