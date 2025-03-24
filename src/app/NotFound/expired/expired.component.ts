import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-expired',
  templateUrl: './expired.component.html',
  styleUrls: ['./expired.component.css']
})
export class ExpiredComponent {
  isScrolled = false;
  @HostListener('window:scroll')
  onScroll(): void {
      this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }
}
