import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-edit-program-bussiness-center',
  templateUrl: './edit-program-bussiness-center.component.html',
  styleUrls: ['./edit-program-bussiness-center.component.css']
})
export class EditProgramBussinessCenter implements OnInit {
  selectedImage: any;
  judul: string = "";
  selectedImageFileHubungan: File | null = null;
  

  constructor(private dataService: getdataService, private route:ActivatedRoute,private notif: NzNotificationService, private router:Router) {}

  ngOnInit() {
    this.loadData();


  }

  //sambutan --------------------------------------------------------
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFileHubungan = file;
  
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  loadData() {
    const id = this.route.snapshot.paramMap.get('id');
  
    if (id) {
      this.dataService.getBussinessCenterId(+id).subscribe(data => {
        this.selectedImage = data.foto;
        this.judul = data.judul;
      });
    }
  }
  
  

  saveChangeSambutan() {
    const formData = new FormData();
    const id = this.route.snapshot.paramMap.get('id') ?? ''; // Gunakan string kosong jika 'id' adalah 'null'

    formData.append('id', id || ''); // Sesuaikan dengan ID data yang ingin diubah
  
    if (this.selectedImageFileHubungan) {
      formData.append('foto', this.selectedImageFileHubungan);
    }
  
    formData.append('judul', this.judul || ''); // Use an empty string if this.nama is null
  
    this.dataService.updatProgramBussiness(+id, formData).subscribe({
      next: (_) => {this.notif.success('Success :', 'Berhasil Memperbaharui Daftar Program Bussiness'),
        this.router.navigateByUrl("/admin/Program-Bussiness-Center-Admin")
      },
      error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Memperbaharui Daftar Program Bussiness !'),
    });    
  }
  
}
