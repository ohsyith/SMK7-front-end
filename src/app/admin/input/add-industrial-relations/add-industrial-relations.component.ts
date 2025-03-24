import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getdataService } from 'src/app/_service/getdata.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-industrial-relations',
  templateUrl: './add-industrial-relations.component.html',
  styleUrls: ['./add-industrial-relations.component.css']
})
export class AddIndustrialRelationsComponent {
  judul: string = '';
  selectedImage: File | null = null;

  constructor(private dataService : getdataService,private notif: NzNotificationService, private route: Router) { }

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

    this.dataService.PostHubunganIndustri(formData)
      .subscribe({
        next: (_) => {this.notif.success('Success :', 'Berhasil Menambahkan Daftar Hubungan Industri'),
          this.route.navigateByUrl("/admin/Hubungan-Industri")
        },
					error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menambahkan Daftar Hubungan Industri !'),
				});
  }

  getImageUrl(): string {
    if (this.selectedImage) {
      return URL.createObjectURL(this.selectedImage);
    }
    return '';
  }
}
