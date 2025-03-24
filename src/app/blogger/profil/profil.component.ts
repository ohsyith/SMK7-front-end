import { Component, HostListener, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/Services/api.service';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  profileData: any = {
    Username: '',
    Picture: '',
    TikTok: '',
    Instagram: '',
    X: '',
    Facebook: '',
    jurusan: '',
  };
  selectFile: File | null = null;
  selectedImage : any = this.profileData.picture

  ngOnInit(): void {
    this.apiService.takesuser().subscribe(
      (data: any) => {
        this.profileData = data; 



      }
    );
  }



  constructor(private apiService: ApiService,private cooki: CookieService, private notif: NzNotificationService) {
  }



  isScrolled = false;
  @HostListener('window:scroll')
  onScroll(): void {
      this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }

  saveProfile(): void {
    this.apiService.saveProfile(this.profileData).subscribe(
      (response) => {
      this.notif.success('Success', 'Berhasil Memperbaharui Profil')
      },
      (error) => {
        this.notif.error('Error', 'Terjadi Kesalahan Saat Memperbaharui Profil')
      }
    );
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectFile = file;
this.profileData.picture = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }
}

