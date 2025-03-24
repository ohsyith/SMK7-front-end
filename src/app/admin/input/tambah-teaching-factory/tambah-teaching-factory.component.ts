import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-tambah-teaching-factory',
  templateUrl: './tambah-teaching-factory.component.html',
  styleUrls: ['./tambah-teaching-factory.component.css']
})
export class TambahTeachingFactoryComponent {
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

    this.dataService.postTeachingFactory(formData)
      .subscribe({
        next: (_) => {this.notif.success('Success :', 'Berhasil Menambahkan Daftar Teaching Factory'),
          this.route.navigateByUrl("/admin/Teaching-Factory")
        },
					error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menambahkan Daftar Teaching Factory !'),
				});
  }

  getImageUrl(): string {
    if (this.selectedImage) {
      return URL.createObjectURL(this.selectedImage);
    }
    return '';
  }
}
