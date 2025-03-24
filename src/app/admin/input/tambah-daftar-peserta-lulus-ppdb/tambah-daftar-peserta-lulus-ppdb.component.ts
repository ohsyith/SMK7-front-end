import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormRecord, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-tambah-daftar-peserta-lulus-ppdb',
  templateUrl: './tambah-daftar-peserta-lulus-ppdb.component.html',
  styleUrls: ['./tambah-daftar-peserta-lulus-ppdb.component.css']
})
export class TambahDaftarPesertaLulusPpdbComponent {

  nisn: string = '';
  nama: string = '';
  lp: string = '';
  asalSekolah: string = '';
  jurusan: string = '';

  constructor(private dataService: getdataService, private http: HttpClient,private notif: NzNotificationService, private route : Router) { }

  submitData() {
    const data = {
      nisn: this.nisn,
      nama: this.nama,
      lp: this.lp,
      asalSekolah: this.asalSekolah,
      jurusan: this.jurusan,
    };

    this.dataService.postLulusPPDB(data).subscribe(
      {
        next: (_) => {this.notif.success('Success :', 'Berhasil Menambahkan Peserta Lulus PPDB');
      this.route.navigateByUrl('/admin/Penerimaan-Peserta-Didik-Baru')},
        error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menambahkan Peserta Lulus PPDB !'),
      }
    );
  }











//anan------------------------
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


excelArray: any[] = [];

onFileChange(event: any) {
  const file = event.target.files[0];
  this.readExcelFile(file);
}

readExcelFile(file: File) {
  const fileReader = new FileReader();
  fileReader.onload = (e) => {
    if (e.target) {
      const data = e.target.result as ArrayBuffer;
      const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(sheet, { raw: true });
      const isDataValid = excelData.every((row: unknown) => {
        const typedRow = row as { [key: string]: unknown };
        return typedRow && typeof typedRow === 'object' && Object.keys(typedRow).length === 5;
      });

      if (isDataValid) {
        this.excelArray = excelData;
      } else {
        this.notif.error('Galat :', 'Mohon unggah file Excel dengan tepat 5 baris !');
     }

    }
  };
  fileReader.readAsArrayBuffer(file);
}

asd(){
  this.excelArray.slice(0).forEach(task1 => {
    const { NISN, Nama_Peserta, Jurusan, Jenis_Kelamin, Sekolah_Asal } = task1;
    const data = {
      nisn: NISN,
      nama: Nama_Peserta,
      lp:Jenis_Kelamin,
      asalsekolah: Sekolah_Asal,
      jurusan:Jurusan
    }

    this.dataService.UploadSiswaPPDB(data)
      .subscribe({
        next: (_) => 
          {
            this.notif.success('Success :', 'Berhasil Menambahkan Peserta Lulus PPDB (EXCEL)')
            this.route.navigateByUrl('/admin/Penerimaan-Peserta-Didik-Baru')
        },
        error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menambahkan Peserta Lulus PPDB !'),

      });
  });
}

downloadExcel(){
  const excelUrl = '../../../assets/Data_Kosong.xlsx';
  this.http.get(excelUrl, { responseType: 'blob' })
    .subscribe((blob: Blob) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'Data_Kosong_Siswa.xlsx';
      link.click();
    });
}

}
