import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

interface UploadedFile {
  file: File;
  url: string;
}
@Component({
  selector: 'app-tambah-ekstrakulikuler',
  templateUrl: './tambah-ekstrakulikuler.component.html',
  styleUrls: ['./tambah-ekstrakulikuler.component.css']
})
export class TambahEkstrakulikulerComponent {
  namaEkskul: string = '';
selectedImage: File | null = null;

constructor(private dataService : getdataService,private notif: NzNotificationService, private route:Router) { }



onSave() {
  if (!this.namaEkskul || this.uploadedFiles.length === 0) {
    this.notif.info('Information :', 'Mohon Mengisi Data dengan Baik !');
    return;
    }

  const formData = new FormData();
  formData.append('namaEkskul', this.namaEkskul);
  
  for (let i = 0; i < this.uploadedFiles.length; i++) {
    formData.append('foto', this.uploadedFiles[i].file);
  }


  this.dataService.PostEkskul(formData)
    .subscribe({
      next: (_) => {this.notif.success('Success :', 'Berhasil Menambahkan Ekstrakulikuler'),
        this.route.navigateByUrl("/admin/Ekstrakulikuler")
      },
      error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menambahkan Ekstrakulikuler !'),
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
