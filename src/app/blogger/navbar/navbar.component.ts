import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { ApiService } from 'src/Services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  navbarElement: HTMLElement;
  profilePictureUrl: string = '';
  username: string = '';

  profileData: any = {
    Username: '',
    Picture: '',
    TikTok: '',
    Jurusan: '',

  };
  constructor(private el: ElementRef, private renderer: Renderer2,private apiService: ApiService) {

    this.navbarElement = this.el.nativeElement;
  }
  ngOnInit(): void {
    this.apiService.takesuser().subscribe(
      (data: any) => {
        this.profileData = data; 


      }
    );
  }

  logout(){
    this.apiService.Logout();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;

    // Dapatkan elemen navbar
    const navbar = this.navbarElement.querySelector('.navbar');

    if (navbar) {
      if (!this.isScrolled) {
        // Scrolling dimulai, tambahkan kelas "navbar-dark"
        navbar.classList.remove('navbar-light');
        navbar.classList.add('navbar-dark');
      } else {
        // Scrolling kembali ke posisi awal, menghapus kelas "navbar-dark"
        navbar.classList.remove('navbar-dark');
        navbar.classList.add('navbar-light');
      }
    }
  }
}
