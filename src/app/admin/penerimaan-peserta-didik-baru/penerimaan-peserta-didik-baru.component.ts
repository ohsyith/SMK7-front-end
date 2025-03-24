import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

interface Food {
  value: string;
  viewValue: string;
}
interface Task {
  id: number;
  img:File ;
}
interface Task1 {
  id: number;
  foto:File ;
  tahun:string
}
@Component({
  selector: 'app-penerimaan-peserta-didik-baru',
  templateUrl: './penerimaan-peserta-didik-baru.component.html',
  styleUrls: ['./penerimaan-peserta-didik-baru.component.css'],
})
export class PenerimaanPesertaDidikBaruComponent implements OnInit {
  

  selectedImage: any;

  foods: Food[] = [
    { value: '', viewValue: 'All' },
    { value: 'RPL', viewValue: 'RPL' },
    { value: 'titl', viewValue: 'TITL' },
    { value: 'dkv', viewValue: 'DKV' },
    { value: 'tjat', viewValue: 'TJAT' },
    { value: 'tkj', viewValue: 'TKJ' },
  ];


  // prestasiList = [
  //   {
  //     id: 1,
  //     img: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //   },
  // ];

  // prestasiList2 = [
  //   {
  //     id: 1,
  //     img: '../../../assets/Kegiatan/PPDB/dd-842x1024.jpeg',
  //   },
  //   {
  //     id: 2,
  //     img: '../../../assets/Kegiatan/PPDB/ppdb1.jpeg',
  //   },
  //   {
  //     id: 3,
  //     img: '../../../assets/Kegiatan/PPDB/ok-717x1024.jpeg',
  //   },
  //   {
  //     id: 4,
  //     img: '../../../assets/Kegiatan/PPDB/Alur-PPDB-1024x576.jpeg',
  //   },
  // ];



  // DIagram ALur PPDB (CUMA BISA UPDATE)
  onFileSelected(event: any) {
    const file = event.target.files[0];
  }

  // Syarat Pendaftaran Online (BISA POST IMG BARU)
  onFileSelected_2(event: any) {
    const file = event.target.files[0];
  }

  prestasiList3: any[] = [];

  filteredPrestasiList = [...this.prestasiList3]; // Salin data prestasi ke data yang difilter
  searchText = ''; // Properti untuk teks pencarian
  jurusan = '';

  // Fungsi untuk melakukan Filter Dropdown
  performSearch(): void {
    const lowerSearchText = this.searchText.toLowerCase().trim();
    const lowerjurusan = this.jurusan.toLowerCase().trim();

    this.filteredPrestasiList = this.prestasiList3.filter((data:any) => {
      const matchnama = data.Nama.toLowerCase().includes(lowerSearchText);
      const matchjurusan =
        lowerjurusan === '' || data.Jurusan.toLowerCase() === lowerjurusan;

      return matchnama && matchjurusan;
    });
  }









  //-------------------------- API -------------------------
  constructor(private dataService : getdataService,private notif: NzNotificationService){}
  
  ngOnInit(): void {
    this.getinfo()
    this.loadDataLink()
  }


  info:any;
  kontak:any;

  getinfo(){
    this.dataService.getContack().subscribe(
      (data) => {
        this.kontak = data
      },
      (error) => {
        console.error(error);
      }
    );

    this.dataService.getinfo().subscribe(
      (data) => {
        this.info = data
      },
      (error) => {
        console.error(error);
      }
    );

    this.dataService.getlulusanppdb().subscribe(
      (data: any) => {
        this.prestasiList3 = Array.isArray(data) ? data : [data];
        this.prestasiList3 = this.prestasiList3.map((item: any, index: number) => {
          return {
            NO: index + 1,
            Id: item.id,
            Nisn : item.nisn,
            Nama : item.nama,
            Jurusan : item.jurusan,
            Lp : item.lp,
            AsalSekolah : item.asalSekolah
          };
        });
        this.filteredPrestasiList = [...this.prestasiList3];
      },
      (error) => {
        console.error(error);
      }
    );

    

    this.dataService.getlinkfotoDiagram().subscribe(
      (data: any) => {
        this.diagram = data
      },
      (error) => {
        console.error(error);
      }
    );
    
    this.dataService.fotosyarat().subscribe(
      (data: any) => {
        this.fotosyarat = data;
        console.log(this.fotosyarat)
      },
      (error) => {
        console.error(error);
      }
    );

  }

  UpdateInfo(){
        this.dataService.setcontack(this.kontak).subscribe({
					next: (_) => this.notif.success('Success :', 'Berhasil Memperbaharui Informasi PPDB'),
					error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Memperbaharui Informasi PPDB !'),
				});
        
        this.dataService.setinfo(this.info).subscribe({
          next: (_) => this.notif.success('Success :', 'Berhasil Memperbaharui Informasi Kontak'),
          error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Memperbaharui Informasi Kontak !'),
        });
  }

  dataDelet(id:any){
    this.dataService.DeleteLulusanppdb(id).subscribe({
      next: (_) => {
        this.notif.success('Success :', 'Data Berhasil Dihapus');
        this.getinfo();
        },
      error: (_) => {this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menghapus Data !');},
    });
  }

  diagram:any;
  savediagram:Task[] = [];
  diagramInput(event:any){
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (s: any) => {
        this.diagram.foto = s.target.result;
      };
      reader.readAsDataURL(file);
      const existingTaskIndex = this.savediagram.findIndex(task => task.id === 0);
      if (existingTaskIndex !== -1) {
        this.savediagram[existingTaskIndex].img = file;
      } else {
        const newTask: Task = {
          id: 1,
          img: file,
        };
        this.savediagram.push(newTask);
      }
    } else {
      alert("gagal mengupload");
    }
  }

  Upload(){
    const formData = new FormData();
    formData.append('foto', this.savediagram[0].img);
    this.dataService.Uploaddiagram(formData)
      .subscribe({
        next: (_) => this.notif.success('Success :', 'Berhasil Memperbaharui Foto Diagram Alur'),
        error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Memperbaharui Foto Diagram Alur !'),
      });
  }


  fotosyarat:any;
  savesyarat:Task1[] = [];
  syaratInput(event:any, id:any){
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (s: any) => {
        this.fotosyarat[id].foto = s.target.result;
      };
      reader.readAsDataURL(file);
      const existingTaskIndex = this.savesyarat.findIndex(task1 => task1.id === id);
      if (existingTaskIndex !== -1) {
        this.savesyarat[existingTaskIndex].foto = file;
      } else {
        const newTask: Task1 = {
          id: id,
          foto: file,
          tahun: "asd"
        };
        this.savesyarat.push(newTask);
      }
    } else {
      this.notif.error('Galat :', 'Terjadi Kesalahan Saat Upload Foto !');
      return;
    }
  }

  updatesyarat(): void {
    this.savesyarat.forEach(task1 => {
      const { id, foto , tahun } = task1;
      const updatedId = this.fotosyarat[id].id
      console.log(updatedId)
      const formData = new FormData();
      formData.append('foto', foto);
      this.dataService.updasyarat(updatedId ,formData)
        .subscribe({
					next: (_) => this.notif.success('Success :', 'Berhasil Memperbaharui Foto Syarat Pendaftaran PPDB'),
					error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Memperbaharui Foto Syarat Pendaftaran PPDB !'),
				});
    });
  }




  prestasiId : number = 1;
  url: string = "";


  loadDataLink() {
        this.dataService.getLinkTeleId(this.prestasiId).subscribe(data => {
        this.url = data.url;
      });
    ;
  }


  saveChange() {
    const data = {
      url: this.url || ''
    };
  
    this.dataService.updateLinkTele(this.prestasiId, data).subscribe(
      {
        next: (_) => this.notif.success('Success :', 'Berhasil Memperbaharui Link Telegram'),
        error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Memperbaharui Link Telegram !'),
      }
    );
  }


  deleteAllPeserta(): void {
    this.dataService.deleteAllLulusPPDB().subscribe(
      response => {
        this.notif.success('Success :', 'Berhasil Menghapus Semua Data');      // Lakukan penanganan lainnya jika diperlukan
      },
      error => {
        this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menghapus')     ;
        console.log(error);
           // Lakukan penanganan kesalahan lainnya jika diperlukan
      }
    );
  }
}
