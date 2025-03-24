import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-berita-sekolah',
  templateUrl: './berita-sekolah.component.html',
  styleUrls: ['./berita-sekolah.component.css'],
})
export class BeritaSekolahComponent implements OnInit{

  constructor(private dataService : getdataService, private notif: NzNotificationService){}

  ngOnInit(): void {
      this.getDataberitaIndustri()

  }

  berita : any[] = []
  filteredData = [...this.berita]; // Salin data prestasi ke data yang difilter
  searchText = ''; // Properti untuk teks pencarian
  Tanggal = '';


// Fungsi untuk melakukan pencarian
  performSearch(): void {
      const lowerSearchText = this.searchText.toLowerCase().trim();

  this.filteredData = this.berita.filter((data) => {
      const matchJudul = data.Judul.toLowerCase().includes(lowerSearchText);

      return matchJudul;
  });
  }

  getDataberitaIndustri() {
      this.dataService.LoadBeritas().subscribe((data: any) => {
          this.berita = data.map((item: any, index: number) => {
              return {
                  NO: index + 1,
                  Id:item.id,
                  Judul: item.judul,
              };
          });
          this.performSearch(); 
      });
  }

  edit(event: any) {
    this.dataService.deleteBerita(event).subscribe(
        () => {
            this.getDataberitaIndustri()
        },
        (error) => {
            console.error('Error deleting data:', error);
        }
    );
  }

  deleteData(id: number): void {
    this.dataService.deleteBerita(id).subscribe(
        {
            next: (_) => {
                this.notif.success('Success :', 'Berita Berhasil Dihapus');
                this.berita = this.berita.filter((item) => item.Id !== id);
                this.performSearch();
                this.getDataberitaIndustri();
                },
            error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menghapus Berita !'),
        }
    );
}
}
