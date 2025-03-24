import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-teaching',
  templateUrl: './teaching.component.html',
  styleUrls: ['./teaching.component.css']
})
export class TeachingComponent implements OnInit{
    constructor(private dataService : getdataService,private notif: NzNotificationService){}
    ngOnInit(): void {
        this.getDataTeachingFactory();
    }



    teaching : any[] = []
    filteredData = [...this.teaching]; // Salin data prestasi ke data yang difilter
    searchText = ''; // Properti untuk teks pencarian
    Tanggal = '';


  // Fungsi untuk melakukan pencarian
  performSearch(): void {
    const lowerSearchText = this.searchText.toLowerCase().trim();
    const lowerTanggal = this.Tanggal.toLowerCase().trim();

this.filteredData = this.teaching.filter((data) => {
    const matchJudul = data.Judul.toLowerCase().includes(lowerSearchText);
    const matchTanggal = lowerTanggal === '' || data.Tanggal.toLowerCase() === lowerTanggal;

    return matchJudul && matchTanggal;
});
}


  getDataTeachingFactory() {
    this.dataService.loadTeachingFactory().subscribe((data: any) => {
        this.teaching = data.map((item: any, index: number) => {
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
  this.dataService.deleteTeachingFactory(id).subscribe(
    {
      next: (_) => {
        this.notif.success('Success :', 'Data Berhasil Dihapus');
        this.getDataTeachingFactory();
        },
      error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menghapus Data !'),
    }
  );
}
}
