import { Component, HostListener,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/Model/Model';
import { ApiService } from 'src/Services/api.service';

@Component({
  selector: 'app-blog-two',
  templateUrl: './blog-two.component.html',
  styleUrls: ['./blog-two.component.css']
})
export class BlogTwoComponent implements OnInit {
  blogs: Blog[] = [];
  blogPhotos: string[] = [];
  isScrolled = false;

  @HostListener('window:scroll')
  onScroll(): void {
      this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }
  constructor(private https: ApiService,private route: ActivatedRoute){}


  ngOnInit() {

    this.route.params.subscribe(params => {

      const judul = params['judul'];
      this.https.getBlogByJudul(judul,2).subscribe(data => {

        this.blogs = [data];


      });
    });
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


  getNonsMainPhotos(fotos: any): string[] {
    const nonMainPhotos: string[] = [];

    if (fotos && fotos) {
      for (const photo of fotos) {
        if (photo.isMain === false) {
          nonMainPhotos.push(photo.url);
        }
      }
    }

    return nonMainPhotos;
  }
}
