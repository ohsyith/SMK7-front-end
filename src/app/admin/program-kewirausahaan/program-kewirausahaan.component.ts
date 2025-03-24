import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-program-kewirausahaan',
  templateUrl: './program-kewirausahaan.component.html',
  styleUrls: ['./program-kewirausahaan.component.css']
})
export class ProgramKewirausahaanComponent implements OnInit{
    constructor(private dataService : getdataService,private notif: NzNotificationService){}
    ngOnInit(): void {
        this.getDataWirausaha();
    }



    wirausaha : any[] = []
    filteredData = [...this.wirausaha]; // Salin data prestasi ke data yang difilter
    searchText = ''; // Properti untuk teks pencarian
    Tanggal = '';


  // Fungsi untuk melakukan pencarian
  performSearch(): void {
    const lowerSearchText = this.searchText.toLowerCase().trim();
    const lowerTanggal = this.Tanggal.toLowerCase().trim();

this.filteredData = this.wirausaha.filter((data) => {
    const matchJudul = data.Judul.toLowerCase().includes(lowerSearchText);
    const matchTanggal = lowerTanggal === '' || data.Tanggal.toLowerCase() === lowerTanggal;

    return matchJudul && matchTanggal;
});
}


  getDataWirausaha() {
    this.dataService.loadProgramKewirausahaan().subscribe((data: any) => {
        this.wirausaha = data.map((item: any, index: number) => {
            return {
                NO: index + 1,
                Id:item.id,
                Judul: item.judul,
                Tanggal: item.tanggal,
            };
        });
        this.performSearch(); // Panggil fungsi pencarian setelah data diperbarui
    });
}




deleteData(id: number): void {
  this.dataService.deleteWirausaha(id).subscribe({
    next: (_) => {
      this.notif.success('Success :', 'Data Berhasil Dihapus');
      this.wirausaha = this.wirausaha.filter((item) => item.Id !== id);
      this.performSearch();
      },
    error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menghapus Data !'),
  }
  );
}
}