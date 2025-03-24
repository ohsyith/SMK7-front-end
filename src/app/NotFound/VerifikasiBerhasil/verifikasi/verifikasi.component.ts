import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApiService } from 'src/Services/api.service';

@Component({
  selector: 'app-verifikasi',
  templateUrl: './verifikasi.component.html',
  styleUrls: ['./verifikasi.component.css']
})
export class VerifikasiComponent implements OnInit {
  isScrolled = false;

  @HostListener('window:scroll')
   token: string = '';
   countDown: number = 3;
  onScroll(): void {
      this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;

  }

  constructor(private Api : ApiService,private route : ActivatedRoute,private ro: Router, private notif: NzNotificationService){}

  ngOnInit() {

    const tokenFromUrl = this.route.snapshot.queryParams['token']

    // Panggil verifikasi dengan token yang didapat
    if (tokenFromUrl) {
      this.verifikasi(tokenFromUrl);
    }
  }

  verifikasi(token: string) {
    this.Api.Verification(token).subscribe(
      (response) => {
        this.notif.success('Success', 'Verifikasi Akun Berhasil')

        const countdownInterval = setInterval(() => {
          this.countDown--;
          if (this.countDown === 0) {
            clearInterval(countdownInterval);
            this.ro.navigate(['/login']); // Redirect to the login page when countdown reaches 0
          }
        }, 1000); // Update every 1 second
  
      },
      (error: any) => { // Change 'string' to 'any' to capture the complete error object
        if (error.error && error.error === "Token verifikasi tidak valid/Kad") {
          this.ro.navigate(["Not-found"]); // Redirect to the 'Home' page for invalid token
        } else if (error.error && error.error === "Token verifikasi telah kedaluwarsa atau terjadi kesalahan silahkan register ulang x-x") {
          this.ro.navigate(["Expired"]); 
        } else {
          this.ro.navigate(["Not-found"]); // Redirect to the 'Not-found' page for other errors
        }

        this.notif.error('Error', 'Verifikasi Akun Gagal')
      }
    );
  }

  // this.Api.Logins(user).subscribe({
  //   next: (res: any) => {

  //     alert('You Are success Logins ^-^');

  //   this.responsemsg = res.toString();
  //   const tak = this.Api.getLevelFromToken();
  //   if (tak === 'ADMIN') {
  //     this.router.navigate(['Home']);
  //   } else if (tak === 'USER') {
  //     this.router.navigate(['Blogger/Home']);
  //   } else {
  //     this.router.navigate(['NotFound']);
  //   }
  //   },
  //   error: (err: any) => {
  //     if (err.error) {
  //       alert(err.error);
  //       this.handleInvalidLoginAttempt();
  //     }

  //   },
  // });
}
