import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-tambah-kelulusan-siswa',
  templateUrl: './tambah-kelulusan-siswa.component.html',
  styleUrls: ['./tambah-kelulusan-siswa.component.css'],
})
export class TambahKelulusanSiswaComponent {
  nama: string = '';
  keteranganLulus: string = '';
  kelas: string = '';
  nis: number = 0;

  constructor(
    private dataService: getdataService,
    private http: HttpClient,
    private notif: NzNotificationService,
    private route: Router
  ) {}

  // Function POST data kelulusan siswa
  submitData() {
    // Periksa apakah ada input yang kosong
    if (!this.nama || !this.nis || !this.kelas || !this.keteranganLulus) {
      // Jika ada input yang kosong, tampilkan notifikasi kepada pengguna
      this.notif.error(
        'Galat :',
        'Mohon Lengkapi Semua Input Sebelum Menyimpan Data !'
      );
      // Keluar dari method submitData() tanpa melakukan pemrosesan lebih lanjut
      return;
    }

    // Jika Semua Input terisi, Lanjutkan dengan Pemrosesan Data
    const data = {
      nis: this.nis,
      nama: this.nama,
      keteranganLulus: this.keteranganLulus,
      kelas: this.kelas,
    };

    this.dataService.postLulusSMK(data).subscribe({
      next: (_) => {
        this.notif.success(
          'Success :',
          'Berhasil Menambahkan Data Kelulusan Peserta Didik'
        );
        this.route.navigateByUrl('/admin/Kelulusan-Siswa-SMK-Negeri-7-Batam');
      },
      error: (_) =>
        this.notif.error(
          'Galat :',
          'Terjadi Kesalahan Saat Menambahkan Data Kelulusan Peserta Didik !'
        ),
    });
  }

  // Function POST data kelulusan siswa from EXCEL
  selectedImage: any;
  excelArray: any[] = [];

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
          return (
            typedRow &&
            typeof typedRow === 'object' &&
            Object.keys(typedRow).length === 4
          );
        });

        if (isDataValid) {
          this.excelArray = excelData;
        } else {
          this.notif.error(
            'Galat :',
            'Mohon unggah file Excel dengan tepat 4 kolom !'
          );
        }
      }
    };
    fileReader.readAsArrayBuffer(file);
  }

  processExcelData() {
    this.excelArray.slice(0).forEach((task1) => {
      const { Nis, Nama, Kelas, KeteranganLulus } = task1;
      const data = {
        nis: Nis,
        nama: Nama,
        kelas: Kelas,
        keteranganLulus: KeteranganLulus,
      };

      this.dataService.UploadSiswaSMK(data).subscribe({
        next: () => {
          this.notif.success(
            'Success :',
            'Berhasil Menambahkan Data Kelulusan Peserta Didik (EXCEL)'
          );
          this.route.navigateByUrl('/admin/Kelulusan-Siswa-SMK-Negeri-7-Batam');
        },

        error: (_) =>
          this.notif.error(
            'Galat :',
            'Terjadi Kesalahan Saat Menambahkan Data Kelulusan Peserta Didik !'
          ),
      });
    });
  }

  downloadExcel() {
    const excelUrl = '../../../assets/Template-Data-Kelulusan-Siswa.xlsx';
    this.http
      .get(excelUrl, { responseType: 'blob' })
      .subscribe((blob: Blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'Data_Kosong_Siswa.xlsx';
        link.click();
      });
  }
}
