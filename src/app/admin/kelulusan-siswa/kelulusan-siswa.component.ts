import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-kelulusan-siswa',
  templateUrl: './kelulusan-siswa.component.html',
  styleUrls: ['./kelulusan-siswa.component.css'],
})
export class KelulusanSiswaComponent implements OnInit {
  constructor(
    private dataService: getdataService,
    private notif: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.getSiswaLulusSmk();
  }

  SiswaLulus: any[] = [];
  filteredData: any[] = [];
  searchText = '';

  performSearch(): void {
    const lowerSearchText = this.searchText.toLowerCase().trim();
    this.filteredData = this.SiswaLulus.filter((data) => {
      const nama = data.NamaSiswa.toLowerCase().includes(lowerSearchText);
      const nis = data.Nis.toString().includes(lowerSearchText);
      const kelas = data.Kelas.toLowerCase().includes(lowerSearchText);
      return nama || nis || kelas;
    });
  }

  getSiswaLulusSmk() {
    this.dataService.GetSiswaLulus().subscribe((data: any) => {
      console.log(data);
      this.SiswaLulus = data.map((item: any, index: number) => {
        return {
          NO: index + 1,
          Id: item.id,
          NamaSiswa: item.nama,
          Nis: item.nis.toString(),
          Kelas: item.kelas,
          KeteranganLulus: item.keteranganLulus,
        };
      });
      this.performSearch();
    });
  }
  

  // Function Untuk DELETE Data Kelulusan
  deleteData(id: number): void {
    this.dataService.deleteSiswaLulus(id).subscribe({
      next: (_) => {
        this.notif.success('Success :', 'Data Siswa Berhasil di Hapus');
        this.SiswaLulus = this.SiswaLulus.filter((item) => item.Id !== id);
        this.performSearch();
      },
      error: (_) => {
        this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menghapus Data !');
      },
    });
  }
}
