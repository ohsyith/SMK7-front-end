import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-profile-link',
  templateUrl: './profile-link.component.html',
  styleUrls: ['./profile-link.component.css']
})
export class ProfileLinkComponent implements OnInit{

  videoUrl: string = '';
  apiUrl: string = 'https://localhost:5000/api/VideoProfil/1';
  youtubeVideoUrl = 'https://www.youtube.com/watch?v=MPXbO2SF1pA&t=56s';

  videoData: any[] = [];
  videoForm: FormGroup = this.fb.group({});  // Gunakan this.fb.group() untuk membuat FormGroup kosong
  
  constructor(private http:HttpClient, private fb:FormBuilder, private dataService:getdataService,private notif: NzNotificationService) { }
  ngOnInit(): void {
    this.getVideoProfil()
    this.GetVideoRencanaAksi()


    const formGroupObj: { [key: string]: FormControl } = {};
  this.videoData.forEach(video => {
    formGroupObj[`url${video.id}`] = new FormControl(video.url || '');  // Pastikan nilai tidak null
  });

  this.videoForm = new FormGroup(formGroupObj);
  }




   getVideoProfil(){
    this.dataService.loadVideoProfil2().subscribe(response => {
      this.videoUrl = response.url;
    }, error => {
      console.error('Gagal mengambil data', error);
    });
  }

  simpanVideoProfil() {
    const data = { url: this.videoUrl };
  
    this.dataService.simpanVideoProfil(data).subscribe({
      next: (_) => this.notif.success('Success :', 'Video Profil Sekolah Berhasil Diperbaharui'),
      error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Memperbaharui Video !'),
    });
  }














  GetVideoRencanaAksi(){
    this.dataService.loadVideoRencanaAksi().subscribe(data => {
      this.videoData = data;

      // Inisialisasi FormGroup dengan form controls yang dinamis sesuai jumlah data
      const formGroupObj: { [key: string]: FormControl } = {};
      this.videoData.forEach(video => {
        formGroupObj[`url${video.id}`] = new FormControl(video.url);
      });

      this.videoForm = new FormGroup(formGroupObj);
    });
  }

  getFormControl(id: number): FormControl {
    return this.videoForm.get(`url${id}`) as FormControl;
  }
  
  simpanVideoRencanaAksi() {
    this.videoData.forEach(video => {
      const id = video.id;
      const control = this.getFormControl(id);
  
      if (control) {
        const data = {
          url: control.value
        };
  
        // Kirim data yang diperbarui ke API
        this.dataService.updateVideo(id, data).subscribe({
					next: (_) => this.notif.success('Success :', 'Video Program Sekolah Berhasil Diperbaharui'),
					error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Saat Memperbaharui Video !'),
				});
      }
    });
  }
}
