import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';
interface Foto1 {
  id: number;
  url: string;
  isMain: boolean;
  beritaId: number;
}

interface DataBerita1 {
  id: number;
  category: string;
  judul: string;
  tanggal: string;
  isi: string;
  foto: Foto1[];
  hashtag: string;
}
@Component({
  selector: 'app-edit-bursa-kerja-khusus',
  templateUrl: './edit-bursa-kerja-khusus.component.html',
  styleUrls: ['./edit-bursa-kerja-khusus.component.css']
})
export class EditBursaKerjaKhususComponent {
  inputNilai: string = '9999';
  selectedImage: any;

  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }


  
  onFileChange(event: any) {
    const files: FileList = event.target.files;
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('fotoBursa', file);
      this.dataService.imageBursaKerja(this.DataBerita.judul, formData)
        .subscribe({
					next: (_) => this.notif.success('Success :', 'Berhasil Menambahkan Foto Bursa Kerja Khusus' ),
					error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menambahkan Foto Bursa Kerja Khusus !'),
				});
    }
    
  }

  
  inputValue?: string;
  
  
  //---------------------------- baru
  constructor(private route: ActivatedRoute,private dataService : getdataService,private notif: NzNotificationService) { }
  
  ngOnInit(): void {
    this.idUrl = this.route.snapshot.paramMap.get('id');
    this.getData()
  }

  idUrl:any;
  DataBerita:DataBerita1 | any;
  judul: any;

  getData(){
    this.dataService.getBursaKerja(this.idUrl).subscribe((data:any) => {
      this.DataBerita = data;
      this.judul = data.judul
    },
    (error) => {
      console.error('Error deleting data:', error);
    })
  }

  deletImage(id:any){
    this.dataService.deleteimageBursaKerja(this.judul, id)
    .subscribe({
      next: (_) => {
        this.notif.success('Success :', 'Foto Berhasil Dihapus');
        this.getData();
        },
      error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menghapus Foto !'),
    });
  }
  
  editSubmit(){
    const formData = new FormData();
    formData.append('judul', this.DataBerita.judul);
    formData.append('isi', this.DataBerita.isi);
    this.dataService.editBursaKerja(this.idUrl, formData).subscribe({
      next: (_) => {
       this.notif.success('Success :', 'Berhasil Memperbaharui Informasi Bursa Kerja Khusus');
       this.getData();
       },
     error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Memperbaharui Informasi Bursa Kerja Khusus !'),
   })
  }

}
