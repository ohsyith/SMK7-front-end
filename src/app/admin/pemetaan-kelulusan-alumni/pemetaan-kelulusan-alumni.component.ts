import { Component, OnInit } from '@angular/core';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-pemetaan-kelulusan-alumni',
  templateUrl: './pemetaan-kelulusan-alumni.component.html',
  styleUrls: ['./pemetaan-kelulusan-alumni.component.css'],
})
export class PemetaanKelulusanAlumniComponent implements OnInit {
  isScrolled = false;
  list: any;

  constructor(private dataService: getdataService) {}

  ngOnInit() {
    this.dataService.loadPemetaanKelulusan().subscribe((data: any) => {
      this.list = data;
    });
  }

  
}
