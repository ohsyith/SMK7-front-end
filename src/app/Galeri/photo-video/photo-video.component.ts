import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { getdataService } from 'src/app/_service/getdata.service';

@Component({
  selector: 'app-photo-video',
  templateUrl: './photo-video.component.html',
  styleUrls: ['./photo-video.component.css']
})
export class PhotoVideoComponent implements OnInit{
  videos: any[] = [];

  constructor(private dataService: getdataService, private sanitizer : DomSanitizer){}

  ngOnInit(): void {
    this.dataService.LoadVideo().subscribe((data: any) => {
    this.videos = data;
    this.sanitizeVideoUrls()
  });
  }

  sanitizeVideoUrls() {
    this.videos.forEach(video => {
      video.urlVideo = this.sanitizer.bypassSecurityTrustResourceUrl(video.urlVideo);
    });
  }

  isScrolled = false;
  @HostListener('window:scroll')
  onScroll(): void {
      this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }
}
