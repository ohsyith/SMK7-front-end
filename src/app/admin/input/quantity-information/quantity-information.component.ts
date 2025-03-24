import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

interface Jurusan{
  id: number;
  namaJurusan: string;
  singkatan: string;
  fotoJurusan: string;
}


@Component({
  selector: 'app-quantity-information',
  templateUrl: './quantity-information.component.html',
  styleUrls: ['./quantity-information.component.css']
})
export class QuantityInformationComponent implements OnInit{
  rombel: number = 0;
  guruList: any[] = []; 
  jurusan: Jurusan[] = [];
  jurusanList: any[] = [];
  totalSiswa: number = 0;
  jumlahJurusan: number = 0;


constructor(private dataService : getdataService, private notif: NzNotificationService){}
  ngOnInit(): void {
    this.getJumlah();
    this.getRombel();

  }
    
    
      getJumlah(){
        //rombel
        this.dataService.loadDataJumlah().subscribe((data: any) => {
          this.rombel = data.rombel;
        });
    
        //gtk
        this.dataService.getJumlahGuru().subscribe((data: any) => {
          this.guruList = data;
        });
    
        //Jurusan & JumlahSiswa
        this.dataService.loadJurusan().subscribe((data: Jurusan[]) => {
          this.jurusanList = data; // Isi variabel jurusanList dengan data dari API
          this.jumlahJurusan = this.jurusanList.length; // Hitung panjang data jurusan  
          this.totalSiswa = 0;
          this.jurusanList.forEach(jurusan => {
            this.totalSiswa += jurusan.jumlahSiswa;
            });
        });
    
      }

      getRombel() {
        this.dataService.getRombel().subscribe(
          (response: any) => {
            this.rombel = response?.rombel || 0;
          },
          error => {
            console.error(error);
          }
        );
      }
    
      updateRombel() {
        this.dataService.updateRombel(this.rombel).subscribe(
          {
            next: (_) => this.notif.success('Success :', 'Data Berhasil Diperbaharui'),
            error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Memperbaharui Data !')
          }
        );
      }
    
}
