import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { getdataService } from 'src/app/_service/getdata.service';

interface Literasi {
  id: number;
  foto: string;
  tahun: string;
}

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-ppdb',
  templateUrl: './ppdb.component.html',
  styleUrls: ['./ppdb.component.css'],
})
export class PPDBComponent implements OnInit {
  tahun: string[] = [];
  diagramPpdbUrl: string[] = [];
  syaratPpdbUrls: string[] = [];
  informasiPpdb: any;
  kontakPpdb: any;
  prestasiList: any[] = [];
  fotoDiagram: any;

  constructor(private dataService: getdataService) {}

  foods: Food[] = [
    { value: '', viewValue: 'All' },
    { value: 'RPL', viewValue: 'RPL' },
    { value: 'titl', viewValue: 'TITL' },
    { value: 'dkv', viewValue: 'DKV' },
    { value: 'tjat', viewValue: 'TJAT' },
    { value: 'tkj', viewValue: 'TKJ' },
  ];

  filteredPrestasiList = [...this.prestasiList]; // Salin data prestasi ke data yang difilter
  searchText = ''; // Properti untuk teks pencarian
  Jurusan = '';

  // Fungsi untuk melakukan pencarian
  performSearch(): void {
    const lowerSearchText = this.searchText.toLowerCase().trim();
    const lowerJurusan = this.Jurusan.toLowerCase().trim();

    this.filteredPrestasiList = this.prestasiList.filter((data) => {
      const matchNama = data.NAMA.toLowerCase().includes(lowerSearchText);
      const matchJurusan =
        lowerJurusan === '' || data.Jurusan.toLowerCase() === lowerJurusan;

      return matchNama && matchJurusan;
    });
  }

  linkTelegram: string = ''; // Variabel untuk menyimpan link Telegram

  ngOnInit(): void {
    this.getDiagram();
    this.getfotosyarat();
    this.getInformasiPpdb();
    this.getContactPpdb();
    this.getDataLuluspdb();
    this.getLinkTelegram();
  }

  strukturData: any[] = [];

  getDiagram() {
    this.dataService.loadDiagram().subscribe((data: any[]) => {
      if (data.length > 0) {
        this.strukturData = data;
      }
    });
  }

  getImage: Literasi[] = [];

  getfotosyarat() {
    this.dataService.loadSyarat().subscribe({
      next: (res: any) => {
        this.getImage = res;
      },
    });
  }

  getInformasiPpdb() {
    this.dataService.loadInformasiPPDB().subscribe((data: any) => {
      if (data.length > 0) {
        this.informasiPpdb = data[0].informasi;
      }
    });
  }

  getContactPpdb() {
    this.dataService.loadContactPPDB().subscribe((data: any) => {
      this.kontakPpdb = data[0].contact;
    });
  }

  getDataLuluspdb() {
    this.dataService.loadLulusPPDB().subscribe((data: any) => {
      this.prestasiList = data.map((item: any, index: number) => {
        return {
          NO: index + 1,
          Id: item.id,
          NISN: item.nisn,
          NAMA: item.nama,
          LP: item.lp,
          Jurusan: item.jurusan,
          SEKOLAHASAL: item.asalSekolah,
        };
      });
      this.performSearch(); // Panggil fungsi pencarian setelah data diperbarui
    });
  }

  getLinkTelegram() {
    this.dataService.loadLinkTelegram().subscribe((data: any) => {
      if (data.length > 0) {
        this.linkTelegram = data[0].url;
      }
    });
  }

  isScrolled = false;
  @HostListener('window:scroll')
  onScroll(): void {
      this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }


  downloadPERSYARATAN() {
    const link = document.createElement('a');
    link.href = 'assets/Daftar_Ulang/PERSYARATAN_DAFTAR_ULANG.pdf';
    link.download = 'PERSYARATAN DAFTAR ULANG.pdf';
    link.click();
  }

  downloadFORMULIRDAFTAR() {
    const link = document.createElement('a');
    link.href = 'assets/Daftar_Ulang/FORMULIR_DAFTAR_ULANG.pdf';
    link.download = 'FORMULIR DAFTAR ULANG.pdf';
    link.click();
  }

  downloadSURATPERNYATAAN() {
    const link = document.createElement('a');
    link.href = 'assets/Daftar_Ulang/SURAT_PERNYATAAN_ORANG_TUA_DAN_SISWA.pdf';
    link.download = 'SURAT PERNYATAAN ORANG TUA DAN SISWA.pdf';
    link.click();
  }

  downloadFORMULIRDAPODIK() {
    const link = document.createElement('a');
    link.href = 'assets/Daftar_Ulang/FORM_ISIAN_DAPODIK.xlsx';
    link.download = 'FORMULIR ISIAN DAPODIK.xlsx';
    link.click();
  }
}
