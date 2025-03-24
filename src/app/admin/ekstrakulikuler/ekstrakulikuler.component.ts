import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-ekstrakulikuler',
  templateUrl: './ekstrakulikuler.component.html',
  styleUrls: ['./ekstrakulikuler.component.css'],
})
export class EkstrakulikulerComponent implements OnInit{

  constructor(private dataService : getdataService,private notif: NzNotificationService){}

  ngOnInit(): void {
      this.getDataEkstrakulikulerIndustri()

  }

  Ekstrakulikuler : any[] = []
  filteredData = [...this.Ekstrakulikuler]; // Salin data prestasi ke data yang difilter
  searchText = ''; // Properti untuk teks pencarian
  Tanggal = '';


// Fungsi untuk melakukan pencarian
  performSearch(): void {
      const lowerSearchText = this.searchText.toLowerCase().trim();

  this.filteredData = this.Ekstrakulikuler.filter((data) => {
      const matchJudul = data.Judul.toLowerCase().includes(lowerSearchText);

      return matchJudul;
  });
  }

  getDataEkstrakulikulerIndustri() {
      this.dataService.loadEks().subscribe((data: any) => {
          this.Ekstrakulikuler = data.map((item: any, index: number) => {
              return {
                  NO: index + 1,
                  Id:item.id,
                  Judul: item.namaEkskul,
              };
          });
          this.performSearch(); 
      });
  }



  deleteData(id: number): void {
    this.dataService.deleteEkskul(id).subscribe({
        next: (_) => {
            this.notif.success('Success :', 'Data Berhasil Dihapus');
            this.Ekstrakulikuler = this.Ekstrakulikuler.filter((item) => item.Id !== id);
            this.performSearch();
            },
        error: (_) => {this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menghapus Data !');},
    }
    );
  }
}
