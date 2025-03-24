import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-edit-pemetaan-kelulusan-alumni',
  templateUrl: './edit-pemetaan-kelulusan-alumni.component.html',
  styleUrls: ['./edit-pemetaan-kelulusan-alumni.component.css']
})
export class EditPemetaanKelulusanAlumniComponent implements OnInit{
  selectedImage: any;
  tahun: string = "";

  selectedImagePeta: File | null = null;
  

  constructor(private dataService: getdataService, private route: ActivatedRoute,private notif: NzNotificationService, private router:Router) {}

  ngOnInit() {
    this.loadData();


  }

  //sambutan --------------------------------------------------------
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImagePeta = file;
  
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
      this.dataService.getPetaId(+id).subscribe(data => {
        this.selectedImage = data.foto;
        this.tahun = data.tahun;
      });
    }
  }
  
  

  saveChange() {
    const formData = new FormData();
    const id = this.route.snapshot.paramMap.get('id') ?? ''; // Gunakan string kosong jika 'id' adalah 'null'

    formData.append('id', id || ''); // Sesuaikan dengan ID data yang ingin diubah
  
    if (this.selectedImagePeta) {
      formData.append('foto', this.selectedImagePeta);
    }
  
    formData.append('tahun', this.tahun || ''); // Use an empty string if this.nama is null
    
  
    this.dataService.updatePeta(+id, formData).subscribe(
    {
      next: (_) => {this.notif.success('Success :', 'Berhasil Memperbaharui Peta Kelulusan Alumni'),
        this.router.navigateByUrl("/admin/Pemetaan-Kelulusan-Alumni")
      },
      error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Memperbaharui Peta Kelulusan Alumni !'),
    });    
  }
}
