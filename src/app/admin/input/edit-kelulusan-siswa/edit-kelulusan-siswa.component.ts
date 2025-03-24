import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-edit-kelulusan-siswa',
  templateUrl: './edit-kelulusan-siswa.component.html',
  styleUrls: ['./edit-kelulusan-siswa.component.css'],
})
export class EditKelulusanSiswaComponent implements OnInit {
  // Model Data Siswa
  IdRoute: number = 0;
  nama: string = '';
  nis: number = 0;
  kelas: string = '';
  keteranganLulus: string = '';

  constructor(
    private dataService: getdataService,
    private router: ActivatedRoute,
    private notif: NzNotificationService,
    private route: Router
  ) {}

  ngOnInit() {
    this.loadData();
  }

  // Function GET By Id Data Kelulusan
  loadData() {
    this.router.params.subscribe((params) => {
      this.IdRoute = params['id'];
      this.dataService.getSiswaLulusId(this.IdRoute).subscribe((data) => {
        this.nama = data.nama;
        this.nis = data.nis;
        this.kelas = data.kelas;
        this.keteranganLulus = data.keteranganLulus;
      });
    });
  }

  // Function PUT/Edit Data Kelulusan
  saveChange() {
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
      nama: this.nama,
      nis: this.nis,
      kelas: this.kelas,
      keteranganLulus: this.keteranganLulus,
    };

    this.dataService.UpdateSiswaLulus(this.IdRoute, data).subscribe({
      next: (_) => {
        this.notif.success(
          'Success :',
          'Berhasil Memperbaharui Data Kelulusan Siswa'
        );
        this.route.navigateByUrl('admin/Kelulusan-Siswa-SMK-Negeri-7-Batam');
      },
      error: (_) =>
        this.notif.error(
          'Galat :',
          'Terjadi Kesalahan Saat Memperbaharui Data Kelulusan Siswa !'
        ),
    });
  }
}
