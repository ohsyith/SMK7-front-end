import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-edit-informasi-guru',
  templateUrl: './edit-informasi-guru.component.html',
  styleUrls: ['./edit-informasi-guru.component.css']
})
export class EditInformasiGuruComponent implements OnInit{
  selectedImage: any;
  nama: string = "";
  jabatan: string = "";
  selectedImageGTK: File | null = null;
  

  constructor(private dataService: getdataService, private route: ActivatedRoute,private notif: NzNotificationService, private router:Router) {}

  ngOnInit() {
    this.loadData();


  }

  //sambutan --------------------------------------------------------
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageGTK = file;
  
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
      this.dataService.getGTKId(+id).subscribe(data => {
        this.selectedImage = data.foto;
        this.nama = data.nama;
        this.jabatan = data.jabatan;
      });
    }
  }
  
  

  saveChange() {
    const formData = new FormData();
    const id = this.route.snapshot.paramMap.get('id') ?? ''; // Gunakan string kosong jika 'id' adalah 'null'

    formData.append('id', id || ''); // Sesuaikan dengan ID data yang ingin diubah
  
    if (this.selectedImageGTK) {
      formData.append('foto', this.selectedImageGTK);
    }
  
    formData.append('nama', this.nama || ''); // Use an empty string if this.nama is null
    formData.append('jabatan', this.jabatan || ''); // Use an empty string if this.nama is null
  
    this.dataService.updateGTK(+id, formData).subscribe(
      {
        next: (_) => {this.notif.success('Success :', 'Berhasil Memperbaharui Informasi Guru'),
          this.router.navigateByUrl("/admin/Informasi-Guru-dan-Tenaga-Kependidikan")
        },
        error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Memperbaharui Informasi Guru !'),
      });    
  }
}
