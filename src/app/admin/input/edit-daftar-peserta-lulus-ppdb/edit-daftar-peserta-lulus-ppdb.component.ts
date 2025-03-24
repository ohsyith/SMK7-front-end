import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-edit-daftar-peserta-lulus-ppdb',
  templateUrl: './edit-daftar-peserta-lulus-ppdb.component.html',
  styleUrls: ['./edit-daftar-peserta-lulus-ppdb.component.css']
})
export class EditDaftarPesertaLulusPpdbComponent implements OnInit{
  nisn: string = "";
  nama: string = "";
  lp: string = "";
  asalsekolah: string = "";
  jurusan: string = "";
  IdRoute: number = 0;

  constructor(private dataService: getdataService, private route: ActivatedRoute,private notif: NzNotificationService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.route.params.subscribe(params => {
      this.IdRoute = params['id'];
      this.dataService.getLulusPPDBId(this.IdRoute).subscribe(data => {

        this.nisn = data.nisn;
        this.nama = data.nama;
        this.lp = data.lp;
        this.asalsekolah = data.asalSekolah;
        this.jurusan = data.jurusan;
      });
    });
  }
  
  saveChange() {
    const data = {
      nisn: this.nisn || '',
      nama: this.nama || '',
      lp: this.lp || '',
      asalsekolah: this.asalsekolah || '',
      jurusan: this.jurusan || '',
    };
  
    this.dataService.updateLulusPPDB(this.IdRoute, data).subscribe(
      {
        next: (_) => this.notif.success('Success :', 'Berhasil Memperbaharui Peserta Lulus PPDB'),
        error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Memperbaharui Peserta Lulus PPDB !'),
      }
    );
  }

}
