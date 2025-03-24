import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-sarana-prasarana',
  templateUrl: './sarana-prasarana.component.html',
  styleUrls: ['./sarana-prasarana.component.css'],
})
export class SaranaPrasaranaComponent implements OnInit{

  constructor(private dataService : getdataService,private notif: NzNotificationService){}

  ngOnInit(): void {
      this.getDataSarana()

  }

  sarpras : any[] = []
  filteredData = [...this.sarpras]; // Salin data prestasi ke data yang difilter
  searchText = ''; // Properti untuk teks pencarian
  Jumlah = '';


// Fungsi untuk melakukan pencarian
  performSearch(): void {
      const lowerSearchText = this.searchText.toLowerCase().trim();
      const lowerTanggal = this.Jumlah.toLowerCase().trim();

  this.filteredData = this.sarpras.filter((data) => {
      const matchJudul = data.namaRuangan.toLowerCase().includes(lowerSearchText);
      const matchTanggal = lowerTanggal === '' || data.Jumlah.toLowerCase() === lowerTanggal;

      return matchJudul && matchTanggal;
  });
  }

  getDataSarana() {
      this.dataService.loadDataSarpras().subscribe((data: any) => {
          this.sarpras = data.map((item: any, index: number) => {
              return {
                  NO: index + 1,
                  Id:item.id,
                  namaRuangan: item.namaRuangan,
                  Jumlah: item.jumlah,
                  LuasUnit: item.luasUnit,
                  Kondisi: item.kondisi,
                  Kebutuhan: item.kebutuhan,  
                  Kurang: item.kurang,  
              };
          });
          this.performSearch(); 
      });
  }


  deleteData(id: number): void {
      this.dataService.deleteSarana(id).subscribe(
        {
            next: (_) => {this.notif.success('Success :', 'Data Berhasil Dihapus');
                this.sarpras = this.sarpras.filter((item) => item.Id !== id);
                this.performSearch();
                },
            error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menghapus Data !'),
        }
      );
  }
}
