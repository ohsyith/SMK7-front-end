import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

interface Task {
  id: number;
  img:File ;
}
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  data:any ;
  tasks:Task[] = [];
  
  constructor(private dataService : getdataService,private notif: NzNotificationService){}
  ngOnInit(): void {
    this.someMethod()
  }
  
  someMethod() {
    this.dataService.BannerSlogan().subscribe(
      (data) => {
        this.data = data
      },
      (error) => {
        console.log(error)
      }
    );
  }
  
  asdasd(event: any, id: any) {
    const nomor = id
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.data[nomor].foto = e.target.result;
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
      alert("gagal mengupload");
    }
    
  }

  Upload(){
    this.tasks.forEach(task1 => {
      const { id, img } = task1;
      const updatedId = this.data[id].id
      const formData = new FormData();
      formData.append('foto', img);
      this.dataService.BannerSlogenUpload(updatedId ,formData)
        .subscribe({
					next: (res) => {this.notif.success('Success :', 'Berhasil Memperbaharui Foto Banner');},
					error: (_) => this.notif.error('Galat :', 'Terjadi Kesalahan Memperbaharui Foto !'),
				});
    });
  }
}
