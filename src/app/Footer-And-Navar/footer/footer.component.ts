import { Component, OnInit } from '@angular/core';
import { getdataService } from 'src/app/_service/getdata.service';

interface Contact {
  telp: string;
  instagram:string;
  facebook:string;
  tiktok:string;
}


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{
  constructor(private dataService : getdataService){}

  
  con: Contact[] = [];

  ngOnInit(): void {
    this.dataService.getDataKontak().subscribe({
      next: (res: any) => {
        this.con = res;
      }
    });
  }

}
