import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-tambah-pemetaa-kelulusan-alumni',
  templateUrl: './tambah-pemetaa-kelulusan-alumni.component.html',
  styleUrls: ['./tambah-pemetaa-kelulusan-alumni.component.css']
})
export class TambahPemetaaKelulusanAlumniComponent {
  
tahun: string = '';
selectedImage: File | null = null;

constructor(private dataService : getdataService,private notif: NzNotificationService, private route:Router) { }

onFileSelected(event: any) {
  this.selectedImage = event.target.files[0] as File;
}

onSave() {
  if (!this.tahun || !this.selectedImage) {
    this.notif.info('Information :', 'Mohon Mengisi Data dengan Baik !');
		return;
	}

  const formData = new FormData();
  formData.append('tahun', this.tahun);
  formData.append('foto', this.selectedImage);

  this.dataService.PostPemetaan(formData)
    .subscribe({
      next: (_) => {this.notif.success('Success :', 'Berhasil Menambahkan Peta Kelulusan Alumni'),
        this.route.navigateByUrl("/admin/Pemetaan-Kelulusan-Alumni")
      },
      error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menambahkan Peta Kelulusan Alumni !'),
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
