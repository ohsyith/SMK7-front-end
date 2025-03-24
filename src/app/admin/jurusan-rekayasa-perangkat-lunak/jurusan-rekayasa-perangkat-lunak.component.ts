import { Component, ElementRef, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

interface Food {
  value: string;
  viewValue: string;
}
interface Task {
  id: number;
  img:File ;
}
interface Task1 {
  id: number;
  img:File ;
}
interface JurusanEdit {
  namaJurusan: string;
  singkatan: string;
  visi: string;
  misi: string;
  lulusanKeahlian: string;
  jumlahSiswa: number;
  fotoJurusan: string;
}

@Component({
  selector: 'app-jurusan-rekayasa-perangkat-lunak',
  templateUrl: './jurusan-rekayasa-perangkat-lunak.component.html',
  styleUrls: ['./jurusan-rekayasa-perangkat-lunak.component.css']
})
export class JurusanRekayasaPerangkatLunakComponent {
  singkatan: string = 'rpl'; 


  jurusanEdit: JurusanEdit = {
    namaJurusan: '',
    singkatan:'',
    visi: '',
    misi: '',
    lulusanKeahlian: '',
    jumlahSiswa: 0,
    fotoJurusan: ''
  };
  jurusanData: any; 
  newFotoUrl: string = '';
  fotoUnitId: number | undefined; // Deklarasi fotoUnitId di sini



  
  constructor(private dataService : getdataService,private notif: NzNotificationService){}

  ngOnInit(): void {
    this.getDataIduka();
    this.loadDataForEditForm();
    this.someMethod();
  }

  selectedImage: any;
  inputValue?: string;
  value = '';
  title = 'Input a number';


  onFileSelected1(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
  
      // Simpan file untuk diunggah nanti
      this.jurusanEdit.fotoJurusan = file;
    }
  }
  
  saveChanges(): void {
    // Buat objek FormData
    const formData: FormData = new FormData();
  
    // Tambahkan data jurusan ke FormData
    formData.append('namaJurusan', this.jurusanEdit.namaJurusan);
    formData.append('singkatan', this.jurusanEdit.singkatan);
    formData.append('visi', this.jurusanEdit.visi);
    formData.append('misi', this.jurusanEdit.misi);
    formData.append('lulusanKeahlian', this.jurusanEdit.lulusanKeahlian);
    formData.append('jumlahSiswa', this.jurusanEdit.jumlahSiswa.toString());
  
    // Ambil data kerjasama yang sudah ada dari server
    this.dataService.loadKompetensiKeahlian('rpl').subscribe((data: any) => {
      const existingKerjasama = data.kerjaSama.map((item: any) => item.kerjasama);
      // Tambahkan data kerjasama ke FormData
      existingKerjasama.forEach((kerjasama: string) => {
        formData.append('kerjasama', kerjasama);
      });
  
      // Jika fotoJurusan ada, tambahkan ke FormData
      if (this.jurusanEdit.fotoJurusan && typeof this.jurusanEdit.fotoJurusan === 'object') {
        formData.append('fotojurusan', this.jurusanEdit.fotoJurusan as File);
      }
  
      // Panggil service untuk melakukan edit dengan FormData
      this.dataService.editJurusan('rpl', formData).subscribe({
        next: (_) => {
          this.notif.success('Success :', 'Berhasil Memperbaharui Jurusan'); 
          this.getDataIduka(); 
          },
        error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Memperbaharui Jurusan !'),
      }
      );
    });
  }

  handleConfirm(jurusanId: number, kerjasamaId: number): void {
    this.dataService.deleteKerjasama(jurusanId, kerjasamaId).subscribe({
      next: (_) => {
        this.notif.success('Success :', 'Data Berhasil Dihapus');
        this.getDataIduka();
        },
      error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Menghapus Data !'),
    }
    );
  }  


  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

  onChange(value: string): void {
    this.updateValue(value);
  }

  onBlur(): void {
    if (this.value.charAt(this.value.length - 1) === '.' || this.value === '-') {
      this.updateValue(this.value.slice(0, -1));
    }
  }

  updateValue(value: string): void {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
      this.value = value;
    }
    this.inputElement!.nativeElement.value = this.value;
    this.updateTitle();
  }

  updateTitle(): void {
    this.title = (this.value !== '-' ? this.formatNumber(this.value) : '-') || 'Input a number';
  }

  formatNumber(value: string): string {
    const stringValue = `${value}`;
    const list = stringValue.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
  }
  



rpl : any[] =[]
filteredData = [...this.rpl];
searchText = ''; 
Kerjasama = '';
jurusan = 'rpl'


performSearch(): void {
const lowerSearchText = this.searchText.toLowerCase().trim();
const lowerKerjasama = this.Kerjasama.toLowerCase().trim();

this.filteredData = this.rpl.filter((data) => {
const matchJudul = data.Kerjasama.toLowerCase().includes(lowerSearchText);
const matchTanggal = lowerKerjasama === '' || data.Kerjasama.toLowerCase() === lowerKerjasama;

return matchJudul && matchTanggal;
});
}


getDataIduka() {
  this.dataService.loadKompetensiKeahlian(this.jurusan).subscribe((data: any) => {
    this.rpl = data.kerjaSama.map((item: any, index: number) => {
      return {
        NO: index + 1,
        JurusanId: item.jurusanId,
        KerjasamaId: item.id,
        Kerjasama: item.kerjasama,
      };
    });
    this.rpl = this.rpl.filter((item: any) => item.Kerjasama !== null && item.Kerjasama !== undefined);
    this.performSearch();
  });
}

  loadDataForEditForm(): void {
    this.dataService.loadKompetensiKeahlian('rpl').subscribe((data: any) => {
      this.jurusanEdit = {
        namaJurusan:data.namaJurusan,
        singkatan: data.singkatan,
        visi: data.visi,
        misi: data.misi,
        lulusanKeahlian: data.lulusanKeahlian,
        jumlahSiswa: data.jumlahSiswa,
        fotoJurusan: data.fotoJurusan
      };

      this.selectedImage = this.jurusanEdit.fotoJurusan;
    });
  }


  image:any;
  someMethod() {
    this.dataService.loadKompetensiKeahlian(this.singkatan).subscribe(
      (data) => {
        this.image = data
        this.dataimg[0] = data
        this.dataimg1[0] = data
      },
      (error) => {
        console.error(error);
      }
    );
  }

  
  dataimg: any[] = [];
  tasks: Task[] = [];

  onFileSelected(event: any, id:any): void {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.dataimg[0].fotoUnitProduksi[id].fotoPreview = e.target.result;
      };
      reader.readAsDataURL(file);
      const existingTaskIndex = this.tasks.findIndex(task => task.id === id);
      if (existingTaskIndex !== -1) {
        this.tasks[existingTaskIndex].img = file;
      } else {
        const newTask: Task = {
          id: id,
          img: file,
        };
        this.tasks.push(newTask);
      }
    } else {
      this.notif.error('Galat :', 'Terjadi Kesalahan Saat Upload Foto !');
    }
  }

  updateStrukturBursaKerja(): void {
      this.tasks.forEach(task => {
        const { id, img } = task;
        const updatedId = this.image.fotoUnitProduksi[id].id
        const formData = new FormData();
        formData.append('FotoUnitProduksi', img);
        this.dataService.updateFotoUnit(this.singkatan,updatedId ,formData)
          .subscribe({
            next: (_) => this.notif.success('Success :', 'Berhasil Memperbaharui Foto Unit Produksi Jurusan'),
            error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Memperbaharui Foto Unit Produksi Jurusan !'),
          });
      });
  }





  dataimg1: any[] = [];
  tasks1: Task[] = [];

  onfile1(event: any, id:any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (s: any) => {
        this.dataimg1[0].fotoRuanganJurusan[id].fotoPreview = s.target.result;
      };
      reader.readAsDataURL(file);
      const existingTaskIndex = this.tasks1.findIndex(task => task.id === id);
      if (existingTaskIndex !== -1) {
        this.tasks1[existingTaskIndex].img = file;
      } else {
        const newTask: Task = {
          id: id,
          img: file,
        };
        this.tasks1.push(newTask);
      }
    } else {
      this.notif.error('Galat :', 'Terjadi Kesalahan Saat Upload Foto !');
    }
  }

  updateStrukturBursaKerja1(): void {
    this.tasks1.forEach(task1 => {
      const { id, img } = task1;
      const updatedId = this.image.fotoRuanganJurusan[id].id
      const formData = new FormData();
      formData.append('fotoruanganjurusan', img);
      this.dataService.updateruangan(this.singkatan, updatedId ,formData)
        .subscribe({
					next: (_) => this.notif.success('Success :', 'Berhasil Memperbaharui Foto Ruangan Jurusan'),
					error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Memperbaharui Foto Ruangan Jurusan !'),
				});
    });
  }
}
