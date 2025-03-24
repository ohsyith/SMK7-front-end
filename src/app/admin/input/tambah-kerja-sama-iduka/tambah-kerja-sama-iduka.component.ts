import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getdataService } from 'src/app/_service/getdata.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-tambah-kerja-sama-iduka',
  templateUrl: './tambah-kerja-sama-iduka.component.html',
  styleUrls: ['./tambah-kerja-sama-iduka.component.css']
})
export class TambahKerjaSamaIdukaComponent implements OnInit{
  excelArray: any[] = [];

  constructor(
    private dataService: getdataService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  singkatan: any;

  ngOnInit(): void {
    this.singkatan = this.route.snapshot.paramMap.get('singkatan');
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
            Object.keys(typedRow).length === 1
          );
        });

        if (isDataValid) {
          this.excelArray = excelData;
        } else {
          alert('Mohon unggah file Excel dengan tepat 1 baris.');
        }
      }
    };
    fileReader.readAsArrayBuffer(file);
  }

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

  asd() {
    console.log(this.excelArray.slice(0)[0]);
    this.excelArray.slice(0).forEach((task1) => {
      const { Nama_IDUKA } = task1;
      const data = {
        kerjasama: Nama_IDUKA,
      };

      this.dataService.uploadKerjaSamaIDUKA(data, this.singkatan).subscribe({
        next: (response: any) => {
          console.log('Updated successfully:', response);
        },
        error: (error: any) => {
          console.error('Error updating:', error);
        },
      });
    });
  }


  downloadExcel() {
    const excelUrl = '../../../assets/Template-Excel-IDUKA.xlsx';
    this.http
      .get(excelUrl, { responseType: 'blob' })
      .subscribe((blob: Blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'Template-Excel-IDUKA.xlsx';
        link.click();
      });
  }

  NamaIduka: string | undefined;

  postInput() {
    const data = {
      kerjasama: this.NamaIduka,
    };

    this.dataService.uploadKerjaSamaIDUKA(data, this.singkatan).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
}
