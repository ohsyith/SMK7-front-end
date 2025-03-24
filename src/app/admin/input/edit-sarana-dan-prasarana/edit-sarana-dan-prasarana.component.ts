import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-edit-sarana-dan-prasarana',
  templateUrl: './edit-sarana-dan-prasarana.component.html',
  styleUrls: ['./edit-sarana-dan-prasarana.component.css']
})
export class EditSaranaDanPrasaranaComponent implements OnInit{
  namaruangan: string = '';
  jumlah: number = 0;
  luasunit: number = 0;
  kondisi: string = '';
  kebutuhan: number = 0;
  sarprasId: number = 0;

  constructor(private dataService: getdataService, private route: ActivatedRoute,private notif: NzNotificationService, private router:Router) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.route.params.subscribe(params => {
      this.sarprasId = params['id'];
      this.dataService.getSarprasId(this.sarprasId).subscribe(data => {
        
        this.namaruangan = data.namaRuangan;
        this.jumlah = data.jumlah;
        this.luasunit = data.luasUnit;
        this.kondisi = data.kondisi;
        this.kebutuhan = data.kebutuhan;
      });
    });
  }
  
  saveChange() {
    const data = {
      namaruangan: this.namaruangan || '',
      jumlah: this.jumlah || '',
      luasunit: this.luasunit || '',
      kondisi: this.kondisi || '',
      kebutuhan: this.kebutuhan || '',
    };
  
    this.dataService.updateSarpras(this.sarprasId, data).subscribe({
      next: (_) => {this.notif.success('Success :', 'Berhasil Memperbaharui Sarana dan Prasarana'),
      this.router.navigateByUrl("/admin/Sarana-Prasarana")

      },
      error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Memperbaharui Sarana dan Prasarana !'),
    }
    );
  }
}
