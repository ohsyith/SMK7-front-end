import { Component, HostListener, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CookieService } from 'ngx-cookie-service';
import { Blog } from 'src/Model/Model';
import { ApiService } from 'src/Services/api.service';
@Component({
  selector: 'app-blog-saya',
  templateUrl: './blog-saya.component.html',
  styleUrls: ['./blog-saya.component.css']
})
export class BlogSayaComponent implements OnInit {
  blogs: Blog[] = [];
  uniqueCategories: string[] = [];
  allBlogs: Blog[] = [];
  filteredBlogs: Blog[] = [];



  constructor(private apiService: ApiService, private notif: NzNotificationService) {}




  ngOnInit() {
    this.getUniqueCategories();
    this.apiService.takesbloguser().subscribe(
      (data: any) => {
        this.filteredBlogs = data;
        this.blogs = data;
      }
    );
    const tabs = document.querySelectorAll('.tab_btn');
    const all_content = document.querySelectorAll('.content');

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', (event) => {
        tabs.forEach((tab) => {
          tab.classList.remove('active');
        });
        tab.classList.add('active');

        all_content.forEach((content) => {
          content.classList.remove('active');
        });
        all_content[index].classList.add('active');


        var line = document.querySelector('.line') as HTMLElement;
        if (line) {
          if (event.target instanceof HTMLElement) {
            line.style.width = event.target.offsetWidth + "px";
            line.style.left = event.target.offsetLeft + "px";
          }
        }
      });
    })
  }




  getUniqueCategories() {
    this.apiService.GetCategory().subscribe(
      (categories) => {
        this.uniqueCategories = categories.map((category: any) => category.categoryBlog);
      }
    );
  }
  getNonMainPhotos(fotos: any): string[] {
    const nonMainPhotos: string[] = [];

    if (fotos && fotos) {
      for (const photo of fotos) {
        if (photo.isMain === true) {
          nonMainPhotos.push(photo.url);
        }
      }
    }

    return nonMainPhotos;
  }

  filterBlogs(category: string) {
    if (category === 'Semua') {
      this.filteredBlogs = this.blogs;
    } else {
      this.filteredBlogs = this.blogs.filter(blog => blog.categoryBlog === category);
    }
  }


  deleteBlog(id : number) {
    this.apiService.deleteBlogById(id).subscribe(
      response => {
        this.notif.success('Success', 'Blog Berhasil Dihapus')
        this.ngOnInit()
      },
      error => {
        this.notif.error('Error', 'Terjadi Kesalahan Saat Menghapus Blog !')
      }
    );
  }





  isScrolled = false;
  @HostListener('window:scroll')
  onScroll(): void {
      this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }
}
