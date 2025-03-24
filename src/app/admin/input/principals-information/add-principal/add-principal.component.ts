import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-add-principal',
  templateUrl: './add-principal.component.html',
  styleUrls: ['./add-principal.component.css']
})
export class AddPrincipalComponent {
  
nama: string = '';
periode: string = '';
masa: string = '';
selectedImage: File | null = null;

constructor(private dataService : getdataService,private notif: NzNotificationService) { }

onFileSelected(event: any) {
  this.selectedImage = event.target.files[0] as File;
}

onSave() {
  if (!this.nama || !this.periode || !this.masa ||!this.selectedImage) {
    console.error("form tidak boleh kosong");
    return;
  }

  const formData = new FormData();
  formData.append('nama', this.nama);
  formData.append('periode', this.periode);
  formData.append('masa', this.masa);
  formData.append('foto', this.selectedImage);

  this.dataService.PostKepalaSekolah(formData)
    .subscribe({
      next: (_) => this.notif.success('Success :', 'Berhasil Menambahkan Daftar Kepala Sekolah'),
      error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Menambahkan Kepala Sekolah !'),
    });
}

getImageUrl(): string {
  if (this.selectedImage) {
    return URL.createObjectURL(this.selectedImage);
  }
  return '';
}
}
