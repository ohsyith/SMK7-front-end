import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-edit-program-kewirausahaan',
  templateUrl: './edit-program-kewirausahaan.component.html',
  styleUrls: ['./edit-program-kewirausahaan.component.css']
})
export class EditProgramKewirausahaanComponent implements OnInit{
  selectedImage: any;
  judul: string = "";
  selectedImageWirausaha: File | null = null;
  

  constructor(private dataService: getdataService, private route: ActivatedRoute,private notif: NzNotificationService, private router:Router) {}

  ngOnInit() {
    this.loadData();


  }

  //sambutan --------------------------------------------------------
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageWirausaha = file;
  
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
      this.dataService.getWirausahaId(+id).subscribe(data => {
        this.selectedImage = data.foto;
        this.judul = data.judul;
      });
    }
  }
  
  

  saveChange() {
    const formData = new FormData();
    const id = this.route.snapshot.paramMap.get('id') ?? ''; // Gunakan string kosong jika 'id' adalah 'null'

    formData.append('id', id || ''); // Sesuaikan dengan ID data yang ingin diubah
  
    if (this.selectedImageWirausaha) {
      formData.append('foto', this.selectedImageWirausaha);
    }
  
    formData.append('judul', this.judul || ''); // Use an empty string if this.nama is null
  
    this.dataService.updateWirausaha(+id, formData).subscribe({
      next: (_) => {this.notif.success('Success :', 'Berhasil Menambahkan Daftar Program Kewirausahaan'), this.router.navigateByUrl("/admin/Program-Kewirausahaan")},
      error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menambahkan Daftar Program Kewirausahaan !'),
    });    
  }
}
