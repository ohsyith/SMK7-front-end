import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

interface UploadedFile {
  file: File;
  url: string;
}
@Component({
  selector: 'app-edit-berita-sekolah',
  templateUrl: './edit-berita-sekolah.component.html',
  styleUrls: ['./edit-berita-sekolah.component.css']
})
export class EditBeritaSekolahComponent  implements OnInit{
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
      formData.append('fotoBerita', file);
      this.dataService.imageberita(this.DataBerita.judul, formData)
        .subscribe({
          next: (_) => {
           this.notif.success('Success :', 'Berhasil Menambahkan Foto Berita ');
           this.getData();
           this.isMain();
           },
         error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menambahkan Foto Berita !'),
       });
    }
    
  }

  
  inputValue?: string;
  
  
  //---------------------------- baru
  constructor(private route: ActivatedRoute,private dataService : getdataService,private notif: NzNotificationService, private router : Router) { }
  
  ngOnInit(): void {
    this.idUrl = this.route.snapshot.paramMap.get('id');
    this.getData()
  }

  idUrl:any;
  DataBerita:DataBerita1 | any;
judul: any;
  getData(){
    this.dataService.getBerita(this.idUrl).subscribe((data:any) => {
      this.DataBerita = data;
      this.judul = data.judul
    },
    (error) => {
      console.error('Error deleting data:', error);
    })
  }

  deletImage(id:any){
    this.dataService.deleteimageberita(this.judul, id)
    .subscribe({
      next: (_) => {
        this.notif.success('Success :', 'Foto Berhasil Dihapus');
        this.isMain();
        this.getData();
        },
      error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menghapus Foto !'),
    });
  }
  
  isMain(){
    this.dataService.getismain(this.DataBerita.judul).subscribe((response:any) => {
      console.log('isMain successfully:', response);
    }, (error:any) => {
      console.error('Error updating:', error);
    })
  }
  
  editSubmit(){
    const formData = new FormData();
    formData.append('category', this.DataBerita.category);
    formData.append('judul', this.DataBerita.judul);
    formData.append('isi', this.DataBerita.isi);
    formData.append('hashtag', this.DataBerita.hashtag);
    this.dataService.editBerita(this.idUrl, formData).subscribe({
      next: (_) => {
        this.notif.success('Success :', 'Berhasil Memperbaharui Berita Sekolah');
        this.getData();
        this.router.navigateByUrl('/admin/Berita-Sekolah')
        },
      error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Memperbaharui Berita Sekolah !'),
    })
  }

}
