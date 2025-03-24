import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-upload-principal',
  templateUrl: './upload-principal.component.html',
  styleUrls: ['./upload-principal.component.css']
})
export class UploadPrincipalComponent implements OnInit{
  selectedImage: any;
  nama: string = "";
  periode: string = "";
  masa: string = "";
  selectedImageKepalaSekolah: File | null = null;
  

  constructor(private dataService: getdataService, private route: ActivatedRoute,private notif: NzNotificationService) {}

  ngOnInit() {
    this.loadData();


  }

  //sambutan --------------------------------------------------------
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageKepalaSekolah = file;
  
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
      this.dataService.getKepalaSekolahId(+id).subscribe(data => {
        this.selectedImage = data.foto;
        this.nama = data.nama;
        this.periode = data.periode;
        this.masa = data.masa;
      });
    }
  }
  
  

  saveChange() {
    const formData = new FormData();
    const id = this.route.snapshot.paramMap.get('id') ?? ''; // Gunakan string kosong jika 'id' adalah 'null'

    formData.append('id', id || ''); // Sesuaikan dengan ID data yang ingin diubah
  
    if (this.selectedImageKepalaSekolah) {
      formData.append('foto', this.selectedImageKepalaSekolah);
    }
  
    formData.append('nama', this.nama || ''); // Use an empty string if this.nama is null
    formData.append('periode', this.periode || ''); // Use an empty string if this.nama is null
    formData.append('masa', this.masa || ''); // Use an empty string if this.nama is null
  
    this.dataService.updateKepalaSekolah(+id, formData).subscribe({
      next: (_) => this.notif.success('Success :', 'Berhasil Memperbaharui Kepala Sekolah'),
      error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Memperbaharui Kepala Sekolah !'),
    });    
  }
}
