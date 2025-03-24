import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-edit-prestasi-peserta-didik',
  templateUrl: './edit-prestasi-peserta-didik.component.html',
  styleUrls: ['./edit-prestasi-peserta-didik.component.css']
})
export class EditPrestasiPesertaDidikComponent implements OnInit{
  keterangan: string = "";
  tahun: string = "";
  prestasiId: number = 0;

  constructor(private dataService: getdataService, private route: ActivatedRoute,private notif: NzNotificationService, private router:Router) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.route.params.subscribe(params => {
      this.prestasiId = params['id'];
      this.dataService.getPrestasiId(this.prestasiId).subscribe(data => {
        this.keterangan = data.keterangan;
        this.tahun = data.tahun;
      });
    });
  }
  
  saveChange() {
    const data = {
      keterangan: this.keterangan || '',
      tahun: this.tahun || ''
    };
  
    this.dataService.updatePrestasi(this.prestasiId, data).subscribe(
      {
        next: (_) => {this.notif.success('Success :', 'Berhasil Memperbaharui Prestasi Siswa'),
        this.router.navigateByUrl("/admin/Prestasi-Peserta-Didik")

        },
        error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Memperbaharui Prestasi Siswa !'),
      }
    );
  }
  
  
}
