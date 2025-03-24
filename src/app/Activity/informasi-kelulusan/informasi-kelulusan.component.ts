import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  NonNullableFormBuilder,
} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

interface Data {
  id: number;
  nama: string;
  nis: number;
  kelas: string;
  keteranganLulus: string;
}

@Component({
  selector: 'app-informasi-kelulusan',
  templateUrl: './informasi-kelulusan.component.html',
  styleUrls: ['./informasi-kelulusan.component.css'],
})
export class InformasiKelulusanComponent implements OnInit {
  getData: Data | undefined;

  loading = true;

  validateForm: FormGroup<{
    nama_lengkap: FormControl<string>;
    nis: FormControl<string>;
    kelas: FormControl<string>;
  }>;

  /**
   *
   */
  constructor(
    private dataService: getdataService,
    private fb: NonNullableFormBuilder,
    private notif: NzNotificationService
  ) {
    this.validateForm = this.fb.group({
      nama_lengkap: ['', [Validators.required]],
      nis: ['', [Validators.required]],
      kelas: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  // Function GET Data Siswa Lulus
  getSiswaLulus() {
    this.dataService.getSiswaLulusHasil(this.validateForm.value).subscribe({
      next: (res) => {
        this.getData = res;
      },
      error: (err) => {
        this.notif.warning(
          'Peringatan',
          'Mohon mengisi data dengan benar! Hubungi admin sekolah untuk informasi lebih lanjut.'
        );
      },
    });
  }

  // Untuk Automatis Scrool ke Atas
  isScrolled = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled =
      window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }
}
