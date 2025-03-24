import { Component, HostListener, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/Services/api.service';
import * as CryptoJS from 'crypto-js';
import { Categorys } from 'src/Model/Model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-template1',
  templateUrl: './template1.component.html',
  styleUrls: ['./template1.component.css']
})
export class Template1Component implements OnInit {
  selectedImage: any[] = []
  value:any;
  blogForm: FormGroup;
  uniqueCategories: Categorys[] = [];
  hasError = false;
  isHovered= false;

  ngOnInit(): void {
    this.getUniqueCategories();
  }


  constructor(private blogService: ApiService, private fb:FormBuilder,private cookieService: CookieService,private notif: NzNotificationService, private route : Router){
    this.blogForm = this.fb.group({
      judul: ['', Validators.required],
      isi: ['', Validators.required],
      category: ['', Validators.required],
      Quotes: ['', Validators.required],
      foto1: [null, fileRequiredValidator()]

    });
  }

  isScrolled = false;
  @HostListener('window:scroll')
  onScroll(): void {
      this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }

  onFileSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage[index] = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  clearSelectedImage(index: number) {
    this.selectedImage[index] = null;
    this.blogForm.get('foto1')?.setValue(null);
    this.blogForm.get('foto1')?.setErrors(null);
  }
  
  

  
  toggleHover() {
    this.isHovered = !this.isHovered;
  }


       getButtonStyle() {
    const hasErrorMessage = this.blogForm.get('foto1')?.hasError('fileRequired') || this.blogForm.get('Quotes')?.hasError('required') || this.blogForm.get('isi')?.hasError('required') || this.blogForm.get('category')?.hasError('required')||  this.blogForm.get('judul')?.hasError('required')


    return { 'cursor': (this.isHovered && hasErrorMessage) ? 'not-allowed' : 'pointer' };
  }


  createBlog(): void {

    this.hasError = this.blogForm.invalid

    if(!this.hasError){


    const templateId = 1;
    const encryptedId = this.cookieService.get('^a*B`TeVerlDn+8SP>+"Ad_{z/J;k[C%%GC4h6VV_;z8^.[kq~-JbFM{Y?{j');
    const decryptedId = CryptoJS.AES.decrypt(encryptedId, '.A|rK7w8nW*56p*HVLv^E=NK]Z,WpZJeQC6wFZR9wT8RPW8wcHiOr2RS4LvmdiOud2Hnceu').toString(CryptoJS.enc.Utf8);

    const blogData = new FormData();
    blogData.append('Judul', this.blogForm.value.judul);
    blogData.append('Isi', this.blogForm.value.isi);
    blogData.append('Quotes', this.blogForm.value.Quotes);
    blogData.append('TemplateId', templateId.toString());
    blogData.append("UserId",decryptedId);
    blogData.append('CategoryId', this.blogForm.value.category);
    blogData.append('mainPhotoIndex', '0');
    this.selectedImage.forEach((image, index) => {
      if (image) {
          const file = this.dataURLtoFile(image, `photo_${index}.png`);
          blogData.append(`foto`, file);
      }
  });



    this.blogService.createBlog(blogData).subscribe(
      response => {
        this.notif.success('success :', 'Blog Berhasil Ditambahkan');
        this.route.navigateByUrl("/Blogger/Blog-Saya")
      },
      (err: any) => {
        if(err.error){
        this.notif.error('error :', err.error);
        }
      }
    );

  }
}


  getUniqueCategories() {
    this.blogService.GetCategory().subscribe(
      (data) => {
        this.uniqueCategories = data.map((category: any) => ({
          id: category.id,
          categoryBlog: category.categoryBlog
        }));
      }
    );
  }


// Fungsi untuk mengonversi data URL ke File
dataURLtoFile(dataurl: string, filename: string): File {
  const arr = dataurl.split(',');
  if (arr.length > 0 && arr[0].match(/:(.*?);/)) {
      const matchResult = arr[0].match(/:(.*?);/);
      const mime = matchResult ? matchResult[1] : '';
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
  } else {
      // Jika format data URL tidak sesuai, kembalikan File kosong
      return new File([], filename);
  }
}



}


export function fileRequiredValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const file = control.value;
    if (file == null) {
      return { 'fileRequired': true };
    }
    return null;
  };
}