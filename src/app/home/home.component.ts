import {Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import { getdataService } from '../_service/getdata.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface ImageDatas {
  id:number;
  foto:string;
}

interface Jurusan{
  id: number;
  namaJurusan: string;
  singkatan: string;
  fotoJurusan: string;
}


// video.interface.ts
interface Video {
  id: number;
  url: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit{
  isScrolled = false;
  
  guruList: any[] = []; 
  jurusanList: any[] = [];
  rombel : number = 0;
  namaKepala: any;
  fotoKepala: any;
  kata: any;

  images: ImageDatas[] = [];
  jurusan: Jurusan[] = [];
  beritaList: any[] = [];
  totalSiswa: number = 0;
  jumlahJurusan: number = 0;
  videoUrl: string = '';
  videoList: any[] = [];
  @ViewChild('iframeContainer') iframeContainer!: ElementRef;
  embeddedVideos: any[] = [];

  constructor(private dataService:  getdataService, private sanitizer: DomSanitizer,private elRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.setIframeSrc();
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  

  setIframeSrc() {
    const iframeElements = this.elRef.nativeElement.querySelectorAll('.iframe');

    for (let i = 0; i < iframeElements.length; i++) {
      const iframe = iframeElements[i].querySelector('iframe');
      this.renderer.setAttribute(iframe, 'src', this.videoList[i].url);
      
    }
  }


  ngOnInit(): void {
    this.loadData();
    this.getVisitor();
    
  }

  visitor: any = {};
  getVisitor() {
    this.dataService.GetCountVisitor().subscribe({
      next: (res: any) => {
        this.visitor = res[0];

        this.updateVisitor();
      },
    });
  }

  updateVisitor() {
    this.dataService
      .UpdateCountVisitor(this.visitor.id, this.visitor)
      .subscribe();
  }


  loadData(){

    //jumlahguru
    this.dataService.getJumlahGuru().subscribe((data: any) => {
      this.guruList = data;
    });
  
    //jumlahrombel
    this.dataService.loadDataJumlah().subscribe((data: any) => {
      this.rombel = data.rombel;
    });

    //SambutanKepsek
    this.dataService.loadDataSambutan().subscribe((data: any) => {
      this.kata = data.isi;
      this.namaKepala = data.nama;
      this.fotoKepala = data.foto; 
    });

    //3 Foto di Home
    this.dataService.loadBannerHome().subscribe((data: ImageDatas[]) => {
      this.images = data;
    });

    //Jurusan
    this.dataService.loadJurusan().subscribe((data: Jurusan[]) => {
      this.jurusan = data;
      this.jurusanList = data; 
      
      this.jumlahJurusan = this.jurusanList.length; // Hitung panjang data jurusan
  
      this.totalSiswa = 0;
      this.jurusanList.forEach(jurusan => {
        this.totalSiswa += jurusan.jumlahSiswa;
    });
  });

  //berita
  this.dataService.LoadBeritas().subscribe(data => {
    this.beritaList = data;
  });


//video profil
  this.dataService.loadVideoProfil(1).subscribe(
    (data: any) => {
      this.videoUrl = data.url;
      this.embedVideo();
    }
  );


  //videorencana aksi
  this.dataService.loadVideoRencanaAksi().subscribe(
    (data: any[]) => {
      this.videoList = data;
    }
  );
}

  


embedVideo() {
    const iframe = document.getElementById('videoFrame') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = this.videoUrl;
    }
  }

  embedVideos() {
    const container = document.getElementById('videoContainer');
    if (container) {
      for (let i = 0; i < this.videoList.length; i++) {
        const iframe = document.createElement('iframe');
        iframe.src = this.videoList[i].url;
        iframe.style.width = '100%';
        iframe.style.height = '250px';
        iframe.frameBorder = '0';
        iframe.allowFullscreen = true;

        container.appendChild(iframe);
      }
    }
  }

  getMainFoto(fotoList: any[]): string {
    const mainFoto = fotoList.find(foto => foto.isMain);
    return mainFoto ? mainFoto.url : '';
  }


  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }
}


  



