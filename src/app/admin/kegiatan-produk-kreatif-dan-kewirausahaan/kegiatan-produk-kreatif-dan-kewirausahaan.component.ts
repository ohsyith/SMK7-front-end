import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

interface Literasi {
  id: number;
  foto: string;
}

@Component({
  selector: 'app-kegiatan-produk-kreatif-dan-kewirausahaan',
  templateUrl: './kegiatan-produk-kreatif-dan-kewirausahaan.component.html',
  styleUrls: ['./kegiatan-produk-kreatif-dan-kewirausahaan.component.css'],
})
export class KegiatanProdukKreatifDanKewirausahaanComponent implements OnInit {
  getImage: Literasi[] = [];
  selectedImage: any;

  selectfile: File | null = null;
  pkk: any[] = [];
  constructor(private dataService: getdataService,private notif: NzNotificationService) {}

  ngOnInit(): void {
    this.loadFoto();
  }

  // Base64 Picture Preview
  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectfile = file;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  tambahFoto() {
    if (!this.selectfile) {
      this.notif.info('Information :', 'Mohon Mengisi Data dengan Baik !');
					return;
					}

    const formData = new FormData();
    formData.append('foto', this.selectfile);

    this.dataService.tambahPkk(formData).subscribe({
      next: (_) => {
        this.notif.success('Success :', 'Berhasil Menambahkan Foto Kegiatan Kewirausahaan');
        this.loadFoto();
        },
      error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menambahkan Foto Kegiatan Kewirausahaan !'),
    });
  }

  loadFoto() {
    this.dataService.loadDataPkk().subscribe({
      next: (res: any) => {
        this.getImage = res;
      },
      error: (err) => console.log(err),
    });
  }

  deleteFoto(id: number): void {
    this.dataService.deletePkk(id).subscribe(
      {
        next: (_) => {
          this.notif.success('Success :', 'Data Berhasil Dihapus');
          this.loadFoto();
          },
        error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menghapus Data !'),
      }
    );
  }
}
