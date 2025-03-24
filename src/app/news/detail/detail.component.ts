import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getdataService } from 'src/app/_service/getdata.service';

interface NewsItem {
  id: number;
  category: string;
  judul: string;
  tanggal: string;
  isi: string;
  foto: { id: number; url: string; isMain: boolean }[];
  hashtag: string;
  
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  hasError = false;
  isHovered : boolean = false
  form: FormGroup<{
    comment: FormControl<string | null>;
  }> = this.formBuilder.group({
    comment: ['', [Validators.maxLength(100)]]
  });

  commentForm: FormGroup;
  nama: string = '';
  email: string = '';
  keteranganKomentars: string = '';

  komentars: any;

  listOfDataBerita: {id:number, judul: string, category: string | undefined }[] = [];
  inputValue?: string;

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute, private dataService: getdataService, private router: Router, private notif: NzNotificationService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Scroll ke atas setelah perubahan rute selesai
        window.scrollTo(0, 0);
      }
    });


    this.commentForm = formBuilder.group({
      comment: formBuilder.control('',[Validators.required]),
    email: formBuilder.control('',[Validators.required,Validators.email]),
    nama: formBuilder.control('',[Validators.required]),
  });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Scroll ke atas setelah perubahan rute selesai
        window.scrollTo(0, 0);
      }
    });
  }

  toggleHover(){
    this.isHovered = !this.isHovered;
  }

  listOfData: NewsItem | null = null;

  asd(asd: any) {
    if (asd) {
      this.dataService.loadGetBeritaByJudul(asd.toString()).subscribe((data: NewsItem) => {
        this.listOfData = data;
        this.GetBerita(data.category);
      });
    }
    this.ggetComments(asd);
  }
  

  ngOnInit(): void {
    const judul = this.route.snapshot.paramMap.get('judul'); // Menggunakan judul sebagai parameter
    if (judul) {
      this.dataService.loadGetBeritaByJudul(judul).subscribe((data: NewsItem) => {
        this.listOfData = data;
        this.GetBerita(data.category);
        this.ggetComments(judul);
      });
    }
  
  }

getButtonStyle(){
  const hasError = this.commentForm.get('comment')?.hasError("required") || this.commentForm.get("email")?.hasError("email") || this.commentForm.get("email")?.hasError("required") || this.commentForm.get("comment")?.hasError("required") || this.commentForm.get("nama")?.hasError("required")

  return {"cursor" : (this.isHovered && hasError) ? "not-allowed" : "pointer"}
}


  GetBerita(category: string) {
    if (category === 'berita') {
      this.dataService.LoadBeritas().subscribe((data: NewsItem[]) => {
        this.listOfDataBerita = data.map((item: NewsItem) => ({
          id: item.id,
          judul: item.judul,
          category: item.category
        }));
      });
    } else if (category === 'pengumuman') {
      this.dataService.LoadPengumuman().subscribe((data: NewsItem[]) => {
        this.listOfDataBerita = data.map((item: NewsItem) => ({
          id:item.id,
          judul: item.judul,
          category: item.category
        }));
      });
    }
  }

  getMainImage(fotos: any[]): string | undefined {
  const mainFoto = fotos.find(foto => foto.isMain);
  return mainFoto ? mainFoto.url : undefined;
}

navigateToDetail(id: number): void {
  this.router.navigate(['/DetailBerita', id]);
}









  private additionalActionsPerformed = false;

  //acun

  ggetComments(judul: string): void {
    this.dataService.getKomen(judul).subscribe(
      (response: any) => {
        this.komentars = response

        // Check if additional actions have been performed
        if (!this.additionalActionsPerformed) {
          this.additionalActionsPerformed = true;

          const judul = this.route.snapshot.paramMap.get('judul');
          if (judul) {
            this.dataService.loadGetBeritaByJudul(judul).subscribe((data: NewsItem) => {
              this.listOfData = data;
              this.GetBerita(data.category);

            });
          }
        }
      }
    );
  }

  submitComment() {
    this.hasError = this.commentForm.invalid;
    if(!this.hasError){
    const commentValue = this.commentForm.get('comment')?.value;
    const commentValuess = this.commentForm.get('nama')?.value;
    const commentValues = this.commentForm.get('email')?.value;
    const judul = this.listOfData?.judul;

    if (commentValue && commentValuess && commentValues && judul) {
      const commentData = {
        Nama: commentValuess,
        Email: commentValues,
        Keterangan: commentValue,
        Judul: judul
      };


      this.dataService.submitComment(commentData).subscribe(
        (response) => {
          this.notif.success('Success','Berhasil Menambahkan Komentar')
          this.ggetComments(judul)
          this.commentForm.reset();
        },
        (error) => {
          this.notif.error('Error','Terjadi Kesalahan Saat Menambahkan Komentar')
        }
      );
    }
  }
  }
  isScrolled = false;
  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
  }
}
