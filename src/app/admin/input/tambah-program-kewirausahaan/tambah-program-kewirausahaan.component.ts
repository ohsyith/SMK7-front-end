import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-tambah-program-kewirausahaan',
  templateUrl: './tambah-program-kewirausahaan.component.html',
  styleUrls: ['./tambah-program-kewirausahaan.component.css']
})
export class TambahProgramKewirausahaanComponent {
  judul: string = '';
  selectedImage: File | null = null;

  constructor(private dataService : getdataService,private notif: NzNotificationService, private route:Router) { }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0] as File;
  }

  onSave() {
    if (!this.judul || !this.selectedImage) {
      this.notif.info('Information :', 'Judul/Foto Tidak Boleh Kosong !');
      return;
      }

    const formData = new FormData();
    formData.append('judul', this.judul);
    formData.append('foto', this.selectedImage);

    this.dataService.postWirausaha(formData)
      .subscribe({
        next: (_) => {this.notif.success('Success :', 'Berhasil Menambahkan Daftar Program Kewirausahaan'), this.route.navigateByUrl("/admin/Program-Kewirausahaan")},
        error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menambahkan Daftar Program Kewirausahaan !'),
      });
  }

  getImageUrl(): string {
    if (this.selectedImage) {
      return URL.createObjectURL(this.selectedImage);
    }
    return '';
  }
}
