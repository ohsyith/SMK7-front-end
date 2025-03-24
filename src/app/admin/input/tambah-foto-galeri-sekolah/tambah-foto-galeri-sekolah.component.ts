import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-tambah-foto-galeri-sekolah',
  templateUrl: './tambah-foto-galeri-sekolah.component.html',
  styleUrls: ['./tambah-foto-galeri-sekolah.component.css']
})
export class TambahFotoGaleriSekolahComponent {
  namakegiatan: string = '';
  selectedFile: File | null = null;
  selectedImage: string | null = null;
  category: string = '';

  @Output() onCategoryChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private dataService : getdataService,private notif: NzNotificationService, private route:Router){}



  uploadPhoto(): void {
    if (this.selectedFile && this.category) {
      const formData = new FormData();
      formData.append('foto', this.selectedFile, this.selectedFile.name);
      formData.append('namakegiatan', this.category);
  
      this.dataService.uploadPhoto(formData).subscribe({
        next: (_) => {this.notif.success('Success :', 'Berhasil Menambahkan Koleksi Foto Galeri'),
          this.route.navigateByUrl("admin/Galeri-Foto-dan-Video")
        },
        error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menambahkan Koleksi Foto Galeri !'),}
      );
    } else {
      this.notif.info('Information :', 'Mohon Mengisi Data dengan Baik !');
    }
  }
  

  onFileSelected(event?: any): void {
    if (event) {
      const fileInput = event.target;
      if (fileInput.files && fileInput.files.length > 0) {
        this.selectedFile = fileInput.files[0];
        this.selectedImage = this.selectedFile ? URL.createObjectURL(this.selectedFile) : null;
      }
    } else {
      const inputElement = document.createElement('input');
      inputElement.type = 'file';
  
      inputElement.addEventListener('change', (changeEvent: any) => {
        this.onFileSelected(changeEvent);
      });
  
      inputElement.click();
    }
  }
  
  

  onCategorySelectionChange(): void {
    this.onCategoryChange.emit(this.category);
  }

  foods: Food[] = [
    { value: 'Sekolah', viewValue: 'Sekolah' },
    { value: 'Keagamaan', viewValue: 'Keagamaan' },
    { value: 'Upacara', viewValue: 'Upacara' },
    { value: 'Kerjasama Industri', viewValue: 'Kerjasama Industri' },
  ];


}
