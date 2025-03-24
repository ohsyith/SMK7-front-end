import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-tambah-sarana-dan-prasarana',
  templateUrl: './tambah-sarana-dan-prasarana.component.html',
  styleUrls: ['./tambah-sarana-dan-prasarana.component.css']
})
export class TambahSaranaDanPrasaranaComponent {
  namaruangan: string = '';
  jumlah: number = 0;
  luasunit: number = 0;
  kondisi: string = '';
  kebutuhan: number = 0;
  


  constructor(private dataService: getdataService,private notif: NzNotificationService, private route:Router) { }

  submitData() {
    const data = {
      namaruangan: this.namaruangan,
      jumlah: this.jumlah,
      luasunit: this.luasunit,
      kondisi: this.kondisi,
      kebutuhan: this.kebutuhan,
      
    };

    this.dataService.postSarpras(data).subscribe(
      {
        next: (_) => {this.notif.success('Success :', 'Berhasil Menambahkan Sarana dan Prasarana'),
          this.route.navigateByUrl("/admin/Sarana-Prasarana")
        },
        error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menambahkan Sarana dan Prasarana !'),
      }
    );
  }
}
