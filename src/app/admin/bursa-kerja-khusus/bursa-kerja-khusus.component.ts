import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-bursa-kerja-khusus',
  templateUrl: './bursa-kerja-khusus.component.html',
  styleUrls: ['./bursa-kerja-khusus.component.css'],
})
export class BursaKerjaKhususComponent implements OnInit{

  strukturBursaKerja: any = {
    id: 1,
    tahun: '2023/2024',
    foto: null,  // Inisialisasi dengan nilai default atau null
  };
  
  selectedImage: any;
  tahun: string = "";
  selectedImageBursa: File | null = null;

  constructor(private dataService : getdataService,private notif: NzNotificationService){}

  ngOnInit(): void {
      this.getDatabursa()
      this.loadStrukturBursaKerja()
  }

  bursa : any[] = []
  filteredData = [...this.bursa]; // Salin data prestasi ke data yang difilter
  searchText = ''; // Properti untuk teks pencarian
  Judul = '';


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageBursa = file;
  
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  loadStrukturBursaKerja() {
    const id = 1;
  
    if (id) {
      this.dataService.getBursaId(id).subscribe(data => {
        this.selectedImage = data.foto;
        this.tahun = data.tahun;
        
      });
    }
  }
  
  id : number = 1
  saveChange() {
    const formData = new FormData();

    formData.append('id', '1'); // Sesuaikan dengan ID data yang ingin diubah
  
    if (this.selectedImageBursa) {
      formData.append('foto', this.selectedImageBursa);
    }
  
    formData.append('tahun', this.tahun || ''); // Use an empty string if this.nama is null
    
  
    this.dataService.updateBursa(+this.id, formData).subscribe(
      {
        next: (_) => this.notif.success('Success :', 'Berhasil Memperbaharui Struktur Bursa Kerja Khusus'),
        error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Memperbaharui Struktur Bursa Kerja Khusus !'),
      });    
  }
  
  
  

// Fungsi untuk melakukan pencarian
  performSearch(): void {
      const lowerSearchText = this.searchText.toLowerCase().trim();

  this.filteredData = this.bursa.filter((data) => {
      const matchJudul = data.Judul.toLowerCase().includes(lowerSearchText);

      return matchJudul;
  });
  }

  getDatabursa() {
      this.dataService.loadDataBursaKerja().subscribe((data: any) => {
          this.bursa = data.map((item: any, index: number) => {
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
    this.dataService.deleteBursa(id).subscribe(
      {
      next: (_) => {this.notif.success('Success :', 'Data Berhasil Dihapus');
    this.getDatabursa()},
      error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menghapus Data !'),
    }
    );
}
}
