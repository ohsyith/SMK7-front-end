import { Component, OnInit } from '@angular/core';
import { ViewportService } from './viewport.service';
import { Router } from '@angular/router';
import { BreakpointState, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  constructor(private viewportService: ViewportService, private router: Router) {}

  ngOnInit() {
    this.viewportService.isBelow1000px().subscribe((state: BreakpointState) => {
      const isMobile = state.breakpoints[Breakpoints.XSmall] || state.breakpoints[Breakpoints.Small];

      if (!isMobile < state.matches) {
        this.router.navigate(['/Not-found']); // Pindah ke halaman login jika lebar viewport di bawah 1000px dan bukan perangkat seluler
      } else {
        this.router.navigate(['/admin']); // Bila lebar viewport di atas 1000px atau perangkat seluler, pindah ke halaman home
      }
    });
  }
}
