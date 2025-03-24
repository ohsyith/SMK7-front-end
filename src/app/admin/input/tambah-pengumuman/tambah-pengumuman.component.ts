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
  selector: 'app-tambah-pengumuman',
  templateUrl: './tambah-pengumuman.component.html',
  styleUrls: ['./tambah-pengumuman.component.css']
})
export class TambahPengumumanComponent {
  judul: string = '';
  isi: string = '';
  hashtag: string = '';
selectedImage: File | null = null;

constructor(private dataService : getdataService,private notif: NzNotificationService, private route : Router)  { }

isMainn(){
  this.dataService.getismain(this.judul).subscribe(response => {
    console.log(response); // Handle response accordingly
  }, error => {
    console.error(error); // Handle error accordingly
  });
}


onSave() {
  if (!this.judul || !this.isi || !this.hashtag || this.uploadedFiles.length === 0) {
    this.notif.info('Information :', 'Mohon Mengisi Data dengan Baik !');
    return;
    }

  const formData = new FormData();
  formData.append('category', 'pengumuman');
  formData.append('judul', this.judul);
  formData.append('isi', this.isi);
  formData.append('hashtag', this.hashtag);
  
  for (let i = 0; i < this.uploadedFiles.length; i++) {
    formData.append('foto', this.uploadedFiles[i].file);
  }


  this.dataService.PostBerita(formData)
  .pipe(
    tap(() => {
      // Call isMainn function here
      this.isMainn();
    })
  )
    .subscribe({
      next: (_) => {this.notif.success('Success :', 'Berhasil Menambahkan Pengumuman Sekolah');
      this.route.navigateByUrl('/admin/Pengumuman')},
      error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menambahkan Pengumuman Sekolah !'),
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


  
  onDelete(index: number) {
    this.uploadedFiles.splice(index, 1);
  }
  inputValue?: string;

}
