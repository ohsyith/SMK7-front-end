import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

interface UploadedFile {
  file: File;
  url: string;
}
@Component({
  selector: 'app-edit-ekstrakulikuler',
  templateUrl: './edit-ekstrakulikuler.component.html',
  styleUrls: ['./edit-ekstrakulikuler.component.css']
})
export class EditEkstrakulikulerComponent implements OnInit{
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
      formData.append('fotoEkskul', file);
      this.dataService.imageEkstrakulikuler(this.Ekstrakulikuler.namaEkskul, formData)
        .subscribe({
					next: (_) => this.notif.success('Success :', 'Berhasil Menambahkan Foto Ekstrakulikuler'),
					error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menambahkan Foto Ekstrakulikuler !'),
				});
    }
    
  }

  
  inputValue?: string;
  
  
  //---------------------------- baru
  constructor(private route: ActivatedRoute,private dataService : getdataService,private notif: NzNotificationService, private router: Router) { }
  
  ngOnInit(): void {
    this.idUrl = this.route.snapshot.paramMap.get('id');
    this.getData()
  }

  idUrl:any;
  Ekstrakulikuler:any;
  judul: any;

  getData(){
    this.dataService.getEkstrakulikuler(this.idUrl).subscribe((data:any) => {
      this.Ekstrakulikuler = data;
      this.judul = data.namaEkskul
    },
    (error) => {
      console.error('Error deleting data:', error);
    })
  }

  deletEkstrakulikuler(id:any){
    this.dataService.deleteimageEkstrakulikuler(this.judul,id).subscribe({
      next: (_) => { 
        this.notif.success('Success :', 'Foto Berhasil Dihapus');
        this.getData();
        },
      error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menghapus Foto !'),
    })
  }

  editSubmit(){
    const formData = new FormData();
    formData.append('namaekskul', this.Ekstrakulikuler.namaEkskul);
    this.dataService.editEkstrakulikuler(this.idUrl, formData).subscribe({
      next: (_) => {
        
        this.notif.success('Success :', 'Berhasil Memperbaharui Ekstrakulikuler');
        this.getData();
        this.router.navigateByUrl("/admin/Ekstrakulikuler")
        },
      error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Memperbaharui Ekstrakulikuler !'),
    })
  }

}
