import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-principals-information',
  templateUrl: './principals-information.component.html',
  styleUrls: ['./principals-information.component.css']
})
export class PrincipalsInformationComponent {
  selectedImageSambutan: any;
  nama: string = "";
  isi: string = "";
  selectedImageFileSambutan: File | null = null;
  
  
  selectedImageStruktur: any;
  tahun: string = "";
  selectedImageFileStruktur: File | null = null;





  constructor(private dataService: getdataService,private notif: NzNotificationService) {}

  ngOnInit() {
    this.loadDSambutan();
    this.loadStruktur();
    this.loadDataKepalaSekolah();

  }

  //sambutan --------------------------------------------------------
  onFileSelectedSambutan(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFileSambutan = file;
  
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImageSambutan = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  loadDSambutan() {
    this.dataService.getSambutan().subscribe(data => {
      this.selectedImageSambutan = data.foto;
      this.nama = data.nama;
      this.isi = data.isi;
    });
  }

  saveChangeSambutan() {
    const formData = new FormData();
  
    if (this.selectedImageFileSambutan) {
      formData.append('foto', this.selectedImageFileSambutan);
    }
  
    formData.append('nama', this.nama || ''); // Use an empty string if this.nama is null
    formData.append('isi', this.isi || '');   // Use an empty string if this.isi is null
  
    this.dataService.updateSambutan(formData).subscribe({
      next: (_) => this.notif.success('Success :', 'Data Berhasil Diperbaharui'),
      error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Memperbaharui Data !'),
    });    
  }
  
  


  //Daftar Kepala Sekolah
  data: any[] = [];

  loadDataKepalaSekolah() {
    this.dataService.loadDataKepalaSekolah().subscribe(data => {
        this.data = data;
      });
  }



  //struktur-------------------------------------------------------

  onFileSelectedStruktur(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFileStruktur = file;
  
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImageStruktur = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  loadStruktur() {
    this.dataService.getStruktur().subscribe(data => {
      this.selectedImageStruktur = data.foto;
      this.tahun = data.tahun;
    });
  }

  saveChangeStruktur() {
    const formData = new FormData();
    formData.append('id', '1'); // Sesuaikan dengan ID data yang ingin diubah
  
    if (this.selectedImageFileStruktur) {
      formData.append('foto', this.selectedImageFileStruktur);
    }
    formData.append('tahun', this.tahun || ''); // Use an empty string if this.nama is null
    this.dataService.updateStruktur(formData).subscribe({
      next: (_) => this.notif.success('Success :', 'Berhasil Memperbaharui Struktur Organisasi'),
      error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Memperbaharui Struktur Organisasi !'),
    });
  }
  
  
  
  

  
}
