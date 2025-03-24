import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-tambah-informasi-guru',
  templateUrl: './tambah-informasi-guru.component.html',
  styleUrls: ['./tambah-informasi-guru.component.css']
})
export class TambahInformasiGuruComponent {
  nama: string = '';
  jabatan: string = '';
  selectedImage: File | null = null;

  constructor(private dataService : getdataService,private notif: NzNotificationService, private route:Router) { }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0] as File;
  }

  onSave() {
    if (!this.jabatan || !this.selectedImage || !this.nama) {
      this.notif.info('Information :', 'Mohon Mengisi Data dengan Baik !');
    return;
    }

    const formData = new FormData();
    formData.append('nama', this.nama);
    formData.append('jabatan', this.jabatan);
    formData.append('foto', this.selectedImage);

    this.dataService.PostGTK(formData)
      .subscribe({
        next: (_) => {this.notif.success('Success :', 'Berhasil Menambahkan Informasi Guru'),
          this.route.navigateByUrl("/admin/Informasi-Guru-dan-Tenaga-Kependidikan")
        },
        error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menambahkan Informasi Guru !'),
      }
);
  }

  getImageUrl(): string {
    if (this.selectedImage) {
      return URL.createObjectURL(this.selectedImage);
    }
    return '';
  }
}
