// Import yang diperlukan
import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { NgModule } from '@angular/core';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.css']
})
export class MultimediaComponent implements OnInit {
  isScrolled = false;
  data: any = {}; // Untuk menyimpan data dari API
  columns: string[][] = [];
  jurusan: any;

  constructor(private dataService: getdataService, private route: ActivatedRoute, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.jurusan = params['jurusan'];
      this.dataService.loadKompetensiKeahlian(this.jurusan).subscribe((response) => {
        this.data = response;
        if (!this.data.lulusankeahlian) {
          this.data.lulusankeahlian = ''; // Atur nilai awal jika tidak ada data lulusankeahlian
        }
      });
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();
      }
    });
    
  }
  

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }
}

@NgModule({
  imports: [FormsModule],
})
export class YourAppModule { }
