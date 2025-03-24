import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

interface Kontak {
  id: number;
  telp: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  
}

@Component({
  selector: 'app-informasi-kontak-sekolah',
  templateUrl: './informasi-kontak-sekolah.component.html',
  styleUrls: ['./informasi-kontak-sekolah.component.css'],
})
export class InformasiKontakSekolahComponent implements OnInit {
  kontak: Kontak | undefined;

  /**
   *
   */
  constructor(private dataService: getdataService,private notif: NzNotificationService) {}

  ngOnInit(): void {
    this.loadkontakSekolah();
  }

  postKontak() {
    this.dataService.postKontak(this.kontak, this.kontak?.id).subscribe({
      next: (_) => {
        this.notif.success('Success :', 'Berhasil Memperbaharui Informasi Kontak Sekolah');
        this.loadkontakSekolah();
        },
      error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Memperbaharui Informasi Kontak Sekolah !'),
    });
  }

  loadkontakSekolah() {
    this.dataService.getDataKontak().subscribe({
      next: (res: any) => (this.kontak = res[0]),
      error: (err) => console.log(err),
    });
  }
}
