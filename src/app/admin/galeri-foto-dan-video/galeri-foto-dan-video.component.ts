import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-galeri-foto-dan-video',
  templateUrl: './galeri-foto-dan-video.component.html',
  styleUrls: ['./galeri-foto-dan-video.component.css'],
})
export class GaleriFotoDanVideoComponent implements OnInit {
  foods: Food[] = [
    { value: '', viewValue: 'Semua' },
    { value: 'Sekolah', viewValue: 'Sekolah' },
    { value: 'Keagamaan', viewValue: 'Keagamaan' },
    { value: 'Upacara', viewValue: 'Upacara' },
    { value: 'Kerjasama Industri', viewValue: 'Kerjasama Industri' },
  ];
  newVideoUrl: string = '';

  constructor(private dataService : getdataService, private sanitizer: DomSanitizer,private notif: NzNotificationService) {}

  ngOnInit(): void {
    this.getDataFromAPI();
    this.getVideoDataFromAPI();

  }

  prestasiList = [
    {
      id: 0,
      img: '',
      kategori: '',
    }    
  ];

  prestasiList2: any[] = [];

  deleteFoto(id: number): void {
    this.dataService.deletePhotoGallery(id).subscribe(
      {
        next: (_) => {
          this.notif.success('Success :', 'Foto Berhasil Dihapus');
          this.getDataFromAPI();
          },
        error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menghapus Foto !'),
      }
    );
  }
  

  filteredPrestasiList = [...this.prestasiList]; // Salin data prestasi ke data yang difilter
  kategori = '';

  processDataFromAPI(apiData: any) {
    this.prestasiList = [];
  
    apiData.forEach((kegiatan: any) => {
      const kategori = kegiatan.namaKegiatan.toLowerCase();
  
      kegiatan.foto.forEach((foto: any) => {
        this.prestasiList.push({
          id: kegiatan.id,
          img: foto.url,
          kategori: kategori,
        });
      });
    });
  
    // Setelah memasukkan data, Anda mungkin ingin mem-filter prestasiList jika diperlukan
    this.performSearch();
  }
  

  getDataFromAPI() {
  
    this.dataService.LoadPhotoGallery().subscribe(
      (data: any) => {
        // Proses data dari API
        this.processDataFromAPI(data);
      },
      (error) => {
        console.error('Error fetching data from API:', error);
      }
    );
  }

  getVideoDataFromAPI() {
    this.dataService.LoadVideo().subscribe(
      (data: any) => {
        this.prestasiList2 = data.map((video: any) => ({
          id: video.id,
          urlVideo: this.sanitizer.bypassSecurityTrustResourceUrl(video.urlVideo),
        }));
      },
      (error) => {
        console.error('Error fetching video data from API:', error);
      }
    );
  }

  addVideo(urlVideo: string): void {
    this.dataService.addVideoData(urlVideo).subscribe(
      {
        next: (_) => {
      this.notif.success('Success :', 'Berhasil Menambahkan Link Youtube');
      this.getVideoDataFromAPI();
      },
  error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menambahkan Link Youtube !'),
}
    );
  }

  testDeleteVideo(id: number): void {
    this.dataService.deleteVideoData(id).subscribe(
      {
        next: (_) => {
      this.notif.success('Success :', 'Link Youtube Berhasil Dihapus');
      this.getVideoDataFromAPI();
      },
  error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menghapus Link Youtube !'),
}
    );
  }



  

  // Fungsi untuk melakukan Filter Dropdown
  performSearch(): void {
    const lowerKategori = this.kategori.toLowerCase().trim();
  
    this.filteredPrestasiList = this.prestasiList.filter((data) => {
      const matchKategori =
        lowerKategori === '' || data.kategori.toLowerCase() === lowerKategori;
  
      return matchKategori;
    });
  }
  

  p = false;
  q = false;

  test() {
    this.q = !this.q;
    this.p = !this.p
  }
}
