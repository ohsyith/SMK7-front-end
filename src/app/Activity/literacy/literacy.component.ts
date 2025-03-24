import { Component, HostListener, OnInit } from '@angular/core';
import { getdataService } from 'src/app/_service/getdata.service';

interface Literasi {
  id: number;
  foto: string;
}

@Component({
  selector: 'app-literacy',
  templateUrl: './literacy.component.html',
  styleUrls: ['./literacy.component.css'],
})
export class LiteracyComponent implements OnInit {
  getImage: Literasi[] = [];

  /**
   *
   */
  constructor(private dataService: getdataService) {}

  ngOnInit(): void {
    this.loadFotoLiterasi();
  }

  isScrolled = false;
  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled =
      window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }

  loadFotoLiterasi() {
    this.dataService.loadFotoLiterasi().subscribe({
      next: (res: any) => {
        this.getImage = res;
      },
    });
  }

  
}
