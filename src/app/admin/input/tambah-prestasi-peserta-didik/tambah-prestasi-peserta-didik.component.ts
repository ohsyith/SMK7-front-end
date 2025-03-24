import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-tambah-prestasi-peserta-didik',
  templateUrl: './tambah-prestasi-peserta-didik.component.html',
  styleUrls: ['./tambah-prestasi-peserta-didik.component.css']
})
export class TambahPrestasiPesertaDidikComponent {
  keterangan: string = '';
  tahun: string = '';

  constructor(private dataService: getdataService,private notif: NzNotificationService, private route:Router) { }

  submitData() {
    const data = {
      keterangan: this.keterangan,
      tahun: this.tahun
    };

    this.dataService.postPrestasi(data).subscribe(
      {
        next: (_) => {this.notif.success('Success :', 'Berhasil Menambahkan Prestasi Siswa'),
          this.route.navigateByUrl("/admin/Prestasi-Peserta-Didik")
        },
        error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menambahkan Prestasi Siswa !'),
      }
    );
  }
}
