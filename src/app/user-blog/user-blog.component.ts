import { Component, HostListener } from '@angular/core';
import { Blog } from 'src/Model/Model';
import { ApiService } from 'src/Services/api.service';

@Component({
  selector: 'app-user-blog',
  templateUrl: './user-blog.component.html',
  styleUrls: ['./user-blog.component.css']
})
export class UserBlogComponent {

  blogs: Blog[] = [];
  uniqueCategories: string[] = [];
  allBlogs: Blog[] = [];
  filteredBlogs: Blog[] = [];


  constructor(private https: ApiService){}




  ngOnInit() {
    this.getUniqueCategories();
    this.getAllBlogs();
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

  getAllBlogs() {
    this.https.getAllBlogs().subscribe(
      (data) => {
      
        this.blogs = data;
        this.filteredBlogs = data;
      },
    );
  }
  getUniqueCategories() {
    this.https.GetCategory().subscribe(
      (categories) => {

        this.uniqueCategories = categories.map((category: any) => category.categoryBlog);
      },
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

  isScrolled = false;
  @HostListener('window:scroll')
  onScroll(): void {
      this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }



}
