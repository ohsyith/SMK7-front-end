import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getdataService } from 'src/app/_service/getdata.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-program-bussiness-center',
  templateUrl: './add-program-bussiness-center.component.html',
  styleUrls: ['./add-program-bussiness-center.component.css']
})
export class AddProgramBussinessCenterComponent {
  judul: string = '';
  selectedImage: File | null = null;

  constructor(private dataService : getdataService,private notif: NzNotificationService, private route: Router) { }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0] as File;
  }

  onSave() {
    if (!this.judul || !this.selectedImage) {
      console.error("Judul atau foto tidak boleh kosong");
      return;
    }

    const formData = new FormData();
    formData.append('judul', this.judul);
    formData.append('foto', this.selectedImage);

    this.dataService.PostProgramBussiness(formData)
      .subscribe({
        next: (_) => {this.notif.success('Success :', 'Berhasil Menambahkan Daftar Program Bussiness'),
          this.route.navigateByUrl("/admin/Program-Bussiness-Center-Admin")
        },
        error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menambahkan Daftar Program Bussiness !'),
      });
  }

  getImageUrl(): string {
    if (this.selectedImage) {
      return URL.createObjectURL(this.selectedImage);
    }
    return '';
  }
}
