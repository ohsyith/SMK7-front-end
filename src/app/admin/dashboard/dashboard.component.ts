import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/Services/api.service';
import { getdataService } from 'src/app/_service/getdata.service';

interface Jurusan{
  id: number;
  namaJurusan: string;
  singkatan: string;
  fotoJurusan: string;
}

interface NewsItem {
  id: number;
  category: string;
  judul: string;
  tanggal: string;
  isi: string;
  foto: { id: number; url: string; isMain: boolean }[];
  hashtag: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  rombel: any;
  guruList: any[] = []; 
  jurusan: Jurusan[] = [];
  jurusanList: any[] = [];
  totalSiswa: number = 0;
  jumlahJurusan: number = 0;
  visitor: any ={};
  

  apiData: any[] = []; // Variabel untuk menyimpan data dari API


constructor(private dataService : getdataService, private accountService: ApiService){}

  ngOnInit(): void {
    this.getJumlah();
    this.getJumlahSiswaJurusan();
    this.loadDataKepalaSekolah();
    this.getBerita();
    this.getPengumuman();
    this.FotoHome();
    this.getTotalUser();
    this.getVisitor();
    this.getTotalKomen();
  }

  data: any;
  fotoHome: any;

  totalVisit: number = 0;
  totalKomen: number = 0;


  getTotalUser(){
    this.accountService.getUserInformationCount().subscribe(
      (data: number) => {
        this.totalVisit = data;
      }
    );
  }

  getVisitor() {
    this.dataService.GetCountVisitor().subscribe({
      next: (res: any) => {
        this.visitor = res[0];

      },
    });
  }

  getTotalKomen(){
    this.dataService.getKomentar().subscribe(
      (data: number) => {
        this.totalKomen = data;
      }
    );
  }
  

  FotoHome() {
    this.dataService.BannerSlogan().subscribe(
      (data) => {
        this.fotoHome = data
      },
      (error) => {
        console.log(error)
      }
    );
  }

  loadDataKepalaSekolah() {
    this.dataService.loadDataSambutan().subscribe(data => {
        this.data = data;
    });    
  }


  getJumlah(){
    //rombel
    this.dataService.loadDataJumlah().subscribe((data: any) => {
      this.rombel = data.rombel;
    });

    //gtk
    this.dataService.getJumlahGuru().subscribe((data: any) => {
      this.guruList = data;
    });

    //Jurusan & JumlahSiswa
    this.dataService.loadJurusan().subscribe((data: Jurusan[]) => {
      this.jurusanList = data; // Isi variabel jurusanList dengan data dari API
      this.jumlahJurusan = this.jurusanList.length; // Hitung panjang data jurusan  
      this.totalSiswa = 0;
      this.jurusanList.forEach(jurusan => {
        this.totalSiswa += jurusan.jumlahSiswa;
        });
    });

  }

     
  getJumlahSiswaJurusan(){
    this.dataService.loadJurusan().subscribe({
      next: res => this.apiData = res,
      error: err => console.log(err)
    })
      
    
  }













  //get Berita
  listOfDataBerita: {id:number, judul: string, category: string | undefined }[] = [];

  getBerita(){
    this.dataService.LoadBeritas().subscribe((data: NewsItem[]) => {
      this.listOfDataBerita = data.map((item: NewsItem) => ({
        id: item.id,
        judul: item.judul,
        category: item.category
      }));
    });
  }


  listOfDataPengumuman: {id:number, judul: string, category: string | undefined }[] = [];

  getPengumuman(){
    this.dataService.LoadPengumuman().subscribe((data2: NewsItem[]) => {
      this.listOfDataPengumuman = data2.map((item: NewsItem) => ({
        id: item.id,
        judul: item.judul,
        category: item.category
      }));
    });
  }


}

  
  




