import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-prestasi-peserta-didik',
  templateUrl: './prestasi-peserta-didik.component.html',
  styleUrls: ['./prestasi-peserta-didik.component.css'],
})
export class PrestasiPesertaDidikComponent implements OnInit{

  constructor(private dataService : getdataService,private notif: NzNotificationService){}

  ngOnInit(): void {
      this.getDataPrestasi()

  }

  prestasi : any[] = []
  filteredData = [...this.prestasi]; // Salin data prestasi ke data yang difilter
  searchText = ''; // Properti untuk teks pencarian
  Keterangan = '';


// Fungsi untuk melakukan pencarian
  performSearch(): void {
      const lowerSearchText = this.searchText.toLowerCase().trim();
      const lowerKeterangan = this.Keterangan.toLowerCase().trim();

  this.filteredData = this.prestasi.filter((data) => {
      const matchJudul = data.Tahun.toLowerCase().includes(lowerSearchText);
      const matchKeterangan = lowerKeterangan === '' || data.Keterangan.toLowerCase() === lowerKeterangan;

      return matchJudul && matchKeterangan;
  });
  }

  getDataPrestasi() {
      this.dataService.loadPrestasiAdmin().subscribe((data: any) => {
          this.prestasi = data.map((item: any, index: number) => {
              return {
                  NO: index + 1,
                  Id:item.id,
                  Keterangan: item.keterangan,
                  Tahun: item.tahun,
              };
          });
          this.performSearch(); 
      });
  }


  deleteData(id: number): void {
      this.dataService.deletePrestasi(id).subscribe(
        {
        next: (_) => {this.notif.success('Success :', 'Data Berhasil Dihapus'),
        this.getDataPrestasi()

        },
        error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menghapus Data !'),
    }
      );
  }
}
