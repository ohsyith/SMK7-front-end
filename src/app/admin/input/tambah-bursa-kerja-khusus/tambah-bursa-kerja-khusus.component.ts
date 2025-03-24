import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { tap } from 'rxjs';
import { getdataService } from 'src/app/_service/getdata.service';



interface UploadedFile {
  file: File;
  url: string;
}

@Component({
  selector: 'app-tambah-bursa-kerja-khusus',
  templateUrl: './tambah-bursa-kerja-khusus.component.html',
  styleUrls: ['./tambah-bursa-kerja-khusus.component.css']
})
export class TambahBursaKerjaKhususComponent {
  judul: string = '';
  isi: string = '';
  hashtag: string = '';
selectedImage: File | null = null;

constructor(private dataService : getdataService,private notif: NzNotificationService, private  route : Router) { }



onSave() {
  if (!this.judul || !this.isi || this.uploadedFiles.length === 0) {
    this.notif.info('Information :', 'Mohon Mengisi Data dengan Baik !');
    return;
    }

  const formData = new FormData();
  formData.append('judul', this.judul);
  formData.append('isi', this.isi);
  
  for (let i = 0; i < this.uploadedFiles.length; i++) {
    formData.append('foto', this.uploadedFiles[i].file);
  }


  this.dataService.PostBursaKerja(formData)
  .pipe(
    tap(() => {
      // Call isMainn function here
      this.isMain();
    })
  )
    .subscribe({
      next: (_) => {this.notif.success('Success :', 'Berhasil Menambahkan Informasi Bursa Kerja Khusus' );
      this.route.navigateByUrl('/admin/Bursa-Kerja-Khusus')},
      error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menambahkan Informasi Bursa Kerja Khusus !'),
    });
}

getImageUrl(): string {
  if (this.selectedImage) {
    return URL.createObjectURL(this.selectedImage);
  }
  return '';
}

onFileSelected(event: any) {
  this.selectedImage = event.target.files[0] as File;
}


  uploadedFiles: UploadedFile[] = [];

  onFileChange(event: any) {
    const files: FileList = event.target.files;
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      this.uploadedFiles.push({ file, url });
    }
  }
  
    isMain(){
    this.dataService.getismainBursaKerja(this.judul).subscribe((response:any) => {
      console.log('isMain successfully:', response);
    }, (error:any) => {
      console.error('Error updating:', error);
    })
  }
  

  onDelete(index: number) {
    this.uploadedFiles.splice(index, 1);
  }

  inputValue?: string;
}
