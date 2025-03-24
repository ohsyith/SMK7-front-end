import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-pengumuman',
  templateUrl: './pengumuman.component.html',
  styleUrls: ['./pengumuman.component.css'],
})
export class PengumumanComponent implements OnInit{

  constructor(private dataService : getdataService,private notif: NzNotificationService){}

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
      this.dataService.LoadPengumuman().subscribe((data: any) => {
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

  deleteData(id: number): void {
    this.dataService.deleteBerita(id).subscribe(
        {
            next: (_) => {
                this.notif.success('Success :', 'Pengumuman Berhasil Dihapus');
                this.berita = this.berita.filter((item) => item.Id !== id);
                this.performSearch();
                this.getDataberitaIndustri();
                },
        error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menghapus Pengumuman !'),
    }
    );
}
}
