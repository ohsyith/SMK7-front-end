import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

interface Literasi {
  id: number;
  foto: string;
}

@Component({
  selector: 'app-literasi-sekolah',
  templateUrl: './literasi-sekolah.component.html',
  styleUrls: ['./literasi-sekolah.component.css'],
})
export class LiterasiSekolahComponent implements OnInit {
  getImage: Literasi[] = [];
  selectedImage: any;

  selectfile: File | null = null;
  constructor(private dataService: getdataService,private notif: NzNotificationService) {}

  ngOnInit(): void {
    this.loadFotoLiterasi();
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

  tambahFotoLiterasi() {
    if (!this.selectfile) {
      this.notif.info('Information :', 'Mohon Mengisi Data dengan Baik !');
      return;
      }

    const formData = new FormData();
    formData.append('foto', this.selectfile);

    this.dataService.tambahFotoLiterasi(formData).subscribe({
      next: (_) => {
        this.notif.success('Success :', 'Berhasil Menambahkan Foto Literasi');
        this.loadFotoLiterasi();
        },
      error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menambahkan Foto Literasi !'),
    });
  }

  loadFotoLiterasi() {
    this.dataService.loadFotoLiterasi().subscribe({
      next: (res: any) => {
        this.getImage = res;
      },
      error: (err) => console.log(err),
    });
  }

  deleteFoto(id: number): void {
    this.dataService.deleteLiterasi(id).subscribe(
      {
        next: (_) => {
          this.notif.success('Success :', 'Foto Berhasil Dihapus');
          this.loadFotoLiterasi();
          },
        error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menghapus Foto !'),
      }
    );
  }
}
