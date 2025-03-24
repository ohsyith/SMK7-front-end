import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';
interface Food {
    value: string;
    viewValue: string;
}
@Component({
    selector: 'app-program-bussiness-center',
    templateUrl: './program-bussiness-center.component.html',
    styleUrls: ['./program-bussiness-center.component.css']
})
export class ProgramBussinessCenterAdminComponent implements OnInit{

    constructor(private dataService : getdataService,private notif: NzNotificationService){}

    ngOnInit(): void {
        this.getDataHubunganIndustri()

    }

    hubungan : any[] = []
    filteredData = [...this.hubungan]; // Salin data prestasi ke data yang difilter
    searchText = ''; // Properti untuk teks pencarian
    Tanggal = '';


  // Fungsi untuk melakukan pencarian
    performSearch(): void {
        const lowerSearchText = this.searchText.toLowerCase().trim();
        const lowerTanggal = this.Tanggal.toLowerCase().trim();

    this.filteredData = this.hubungan.filter((data) => {
        const matchJudul:any = data.Judul.toLowerCase().includes(lowerSearchText);
        const matchTanggal:any = lowerTanggal === '' || data.Tanggal.toLowerCase() === lowerTanggal;

        return matchJudul && matchTanggal;
    });
    }

    getDataHubunganIndustri() {
        this.dataService.loadProgramBussinessCenter().subscribe((data: any) => {
            this.hubungan = data.map((item: any, index: number) => {
                return {
                    NO: index + 1,
                    Id:item.id,
                    Judul: item.judul,
                    Tanggal: item.tanggal,
                };
            });
            this.performSearch(); 
        });
    }


    deleteData(id: number): void {
        this.dataService.deleteHubunganIndustri(id).subscribe({
            next: (_) => { 
                this.notif.success('Success :', 'Data Berhasil Dihapus');
                this.hubungan = this.hubungan.filter((item) => item.Id !== id);
                this.performSearch();
                },
            error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menghapus Data !'),
        }
        );
    }

}
