import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-informasi-guru-dan-tenaga-kependidikan',
  templateUrl: './informasi-guru-dan-tenaga-kependidikan.component.html',
  styleUrls: ['./informasi-guru-dan-tenaga-kependidikan.component.css']
})
export class InformasiGuruDanTenagaKependidikanComponent implements OnInit{

    constructor(private dataService : getdataService, private http: HttpClient,private notif: NzNotificationService){}

    ngOnInit(): void {
        this.getDataGTK()

    }

    GTK : any[] = []
    filteredData = [...this.GTK]; // Salin data prestasi ke data yang difilter
    searchText = ''; // Properti untuk teks pencarian
    Nama = '';
    Jabatan = '';



  // Fungsi untuk melakukan pencarian
    performSearch(): void {
        const lowerSearchText = this.searchText.toLowerCase().trim();
        const lowerNama = this.Nama.toLowerCase().trim();
        const lowerJabatan = this.Jabatan.toLowerCase().trim();

    this.filteredData = this.GTK.filter((data) => {
        const matchNama = data.Nama.toLowerCase().includes(lowerSearchText);
        const matchJabatan = lowerJabatan === '' || data.Jabatan.toLowerCase() === lowerJabatan;

        return matchJabatan && matchNama;
    });
    }

    getDataGTK() {
        this.dataService.LoadGtkAdmin().subscribe((data: any) => {
            this.GTK = data.map((item: any, index: number) => {
                return {
                    NO: index + 1,
                    Id:item.id,
                    Nama: item.nama,
                    Jabatan: item.jabatan,
                };
            });
            this.performSearch(); 
        });
    }



    deleteData(id: number): void {
        this.dataService.deleteGTK(id).subscribe(
            {
                next: (_) => {this.notif.success('Success :', 'Data Berhasil Dihapus'),
                this.getDataGTK()

                },
                error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menghapus Data !'),
            }
        );
    }
}
