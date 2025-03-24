import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './Footer-And-Navar/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './Footer-And-Navar/footer/footer.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HistoryComponent } from './Profil/history/history.component';
import { VisionAndMissionComponent } from './Profil/vision-and-mission/vision-and-mission.component';
import { HeadmasterComponent } from './Profil/headmaster/headmaster.component';
import { StructureComponent } from './Profil/structure/structure.component';
import { ProgramComponent } from './Programs/program/program.component';
import { IndustrialRelationsComponent } from './Programs/industrial-relations/industrial-relations.component';
import { TeachingFactoryComponent } from './Programs/teaching-factory/teaching-factory.component';
import { ProgramBussinessCenterComponent } from './Programs/program-bussiness-center/program-bussiness-center.component';
import { SchoolDevelopmentProgramComponent } from './Programs/school-development-program/school-development-program.component';
import { EntrepreneurshipProgramComponent } from './Programs/entrepreneurship-program/entrepreneurship-program.component';
import { MultimediaComponent } from './skills-competency/multimedia/multimedia.component';
import { GtkInformationComponent } from './gtk-and-students/gtk-information/gtk-information.component';
import { StudentInformationComponent } from './gtk-and-students/student-information/student-information.component';
import { GraduationMappingComponent } from './gtk-and-students/graduation-mapping/graduation-mapping.component';
import { StudentAchievementComponent } from './gtk-and-students/student-achievement/student-achievement.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { FacilitiesAndInfrastructureComponent } from './sarpras/facilities-and-infrastructure/facilities-and-infrastructure.component';
import { EntrepreneurshipComponent } from './Activity/entrepreneurship/entrepreneurship.component';
import { SpecialJobFairComponent } from './Activity/special-job-fair/special-job-fair.component';
import { PPDBComponent } from './Activity/ppdb/ppdb.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { provideNzI18n, id_ID } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ExtracurricularComponent } from './Activity/extracurricular/extracurricular.component';
import { LiteracyComponent } from './Activity/literacy/literacy.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { PhotoGalleryComponent } from './Galeri/photo-gallery/photo-gallery.component';
import {MatTabsModule} from '@angular/material/tabs';
import { PhotoVideoComponent } from './Galeri/photo-video/photo-video.component';
import { SchoolNewsComponent } from './news/school-news/school-news.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { LoginComponent } from './Login-And-Register/login/login.component';
import { RegisterComponent } from './Login-And-Register/register/register.component';
import { DetailComponent } from './news/detail/detail.component';
import { ForgetPasswordComponent } from './Login-And-Register/forget-password/forget-password.component';
import { ContactComponent } from './contact/contact.component';
import { BlogComponent } from './Blog/blog/blog.component';
import { BlogOneComponent } from './Blog/blog-one/blog-one.component';
import { BlogTwoComponent } from './Blog/blog-two/blog-two.component';
import { NotFoundComponent } from './NotFound/not-found/not-found.component';
import { ExpiredComponent } from './NotFound/expired/expired.component';
import { AdminComponent } from './admin/admin.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HubunganIndustriComponent } from './admin/hubungan-industri/hubungan-industri.component';
import { TeachingComponent } from './admin/teaching/teaching.component';
import { ProgramKewirausahaanComponent } from './admin/program-kewirausahaan/program-kewirausahaan.component';
import { JurusanRekayasaPerangkatLunakComponent } from './admin/jurusan-rekayasa-perangkat-lunak/jurusan-rekayasa-perangkat-lunak.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { JurusanMultimediaComponent } from './admin/jurusan-multimedia/jurusan-multimedia.component';
import { JurusanTeknikInstalasiTenagaListrikComponent } from './admin/jurusan-teknik-instalasi-tenaga-listrik/jurusan-teknik-instalasi-tenaga-listrik.component';
import { JurusanTeknikKomputerDanJaringanComponent } from './admin/jurusan-teknik-komputer-dan-jaringan/jurusan-teknik-komputer-dan-jaringan.component';
import { JurusanTeknikJaringanAksesTelkomunikasiComponent } from './admin/jurusan-teknik-jaringan-akses-telkomunikasi/jurusan-teknik-jaringan-akses-telkomunikasi.component';
import { InformasiGuruDanTenagaKependidikanComponent } from './admin/informasi-guru-dan-tenaga-kependidikan/informasi-guru-dan-tenaga-kependidikan.component';
import { QuantityInformationComponent } from './admin/input/quantity-information/quantity-information.component';
import { BannerComponent } from './admin/input/banner/banner.component';
import { ProfileLinkComponent } from './admin/input/profile-link/profile-link.component';
import { PrincipalsInformationComponent } from './admin/input/principals-information/principals-information.component';
import { VerifikasiComponent } from './NotFound/VerifikasiBerhasil/verifikasi/verifikasi.component';
import { NavbarComponent } from './blogger/navbar/navbar.component';
import { BlogSayaComponent } from './blogger/blog-saya/blog-saya.component';
import { BloggerComponent } from './blogger/blogger.component';
import { HomeBloggerComponent } from './blogger/home-blogger/home-blogger.component';
import { ProfilComponent } from './blogger/profil/profil.component';
import { Template1Component } from './blogger/template1/template1.component';
import { Template2Component } from './blogger/template2/template2.component';
import { JwtModule,JWT_OPTIONS } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { BeritaSekolahComponent } from './admin/berita-sekolah/berita-sekolah.component';
import { CountUpModule } from 'ngx-countup';
import { SaranaPrasaranaComponent } from './admin/sarana-prasarana/sarana-prasarana.component';
import { TambahSaranaDanPrasaranaComponent } from './admin/input/tambah-sarana-dan-prasarana/tambah-sarana-dan-prasarana.component';
import { ProgramBussinessCenterAdminComponent } from './admin/program-bussiness-center/program-bussiness-center.component';
import { TambahKerjaSamaIdukaComponent } from './admin/input/tambah-kerja-sama-iduka/tambah-kerja-sama-iduka.component';
import { TambahPengumumanComponent } from './admin/input/tambah-pengumuman/tambah-pengumuman.component';
import { BursaKerjaKhususComponent } from './admin/bursa-kerja-khusus/bursa-kerja-khusus.component';
import { EkstrakulikulerComponent } from './admin/ekstrakulikuler/ekstrakulikuler.component';
import { GaleriFotoDanVideoComponent } from './admin/galeri-foto-dan-video/galeri-foto-dan-video.component';
import { InformasiKontakSekolahComponent } from './admin/informasi-kontak-sekolah/informasi-kontak-sekolah.component';
import { AddIndustrialRelationsComponent } from './admin/input/add-industrial-relations/add-industrial-relations.component';
import { AddProgramBussinessCenterComponent } from './admin/input/add-program-bussiness-center/add-program-bussiness-center.component';
import { EditBeritaSekolahComponent } from './admin/input/edit-berita-sekolah/edit-berita-sekolah.component';
import { EditBursaKerjaKhususComponent } from './admin/input/edit-bursa-kerja-khusus/edit-bursa-kerja-khusus.component';
import { EditDaftarPesertaLulusPpdbComponent } from './admin/input/edit-daftar-peserta-lulus-ppdb/edit-daftar-peserta-lulus-ppdb.component';
import { EditEkstrakulikulerComponent } from './admin/input/edit-ekstrakulikuler/edit-ekstrakulikuler.component';
import { EditEntrepreneurshipProgramComponent } from './admin/input/edit-entrepreneurship-program/edit-entrepreneurship-program.component';
import { EditInformasiGuruComponent } from './admin/input/edit-informasi-guru/edit-informasi-guru.component';
import { EditPemetaanKelulusanAlumniComponent } from './admin/input/edit-pemetaan-kelulusan-alumni/edit-pemetaan-kelulusan-alumni.component';
import { EditPengumumanComponent } from './admin/input/edit-pengumuman/edit-pengumuman.component';
import { EditPrestasiPesertaDidikComponent } from './admin/input/edit-prestasi-peserta-didik/edit-prestasi-peserta-didik.component';
import { EditProgramBussinessCenter } from './admin/input/edit-program-bussiness-center/edit-program-bussiness-center.component';
import { EditProgramKewirausahaanComponent } from './admin/input/edit-program-kewirausahaan/edit-program-kewirausahaan.component';
import { EditSaranaDanPrasaranaComponent } from './admin/input/edit-sarana-dan-prasarana/edit-sarana-dan-prasarana.component';
import { EditTeachingFactoryComponent } from './admin/input/edit-teaching-factory/edit-teaching-factory.component';
import { AddPrincipalComponent } from './admin/input/principals-information/add-principal/add-principal.component';
import { UploadPrincipalComponent } from './admin/input/principals-information/upload-principal/upload-principal.component';
import { TambahBeritaSekolahComponent } from './admin/input/tambah-berita-sekolah/tambah-berita-sekolah.component';
import { TambahBursaKerjaKhususComponent } from './admin/input/tambah-bursa-kerja-khusus/tambah-bursa-kerja-khusus.component';
import { TambahDaftarPesertaLulusPpdbComponent } from './admin/input/tambah-daftar-peserta-lulus-ppdb/tambah-daftar-peserta-lulus-ppdb.component';
import { TambahEkstrakulikulerComponent } from './admin/input/tambah-ekstrakulikuler/tambah-ekstrakulikuler.component';
import { TambahFotoGaleriSekolahComponent } from './admin/input/tambah-foto-galeri-sekolah/tambah-foto-galeri-sekolah.component';
import { TambahInformasiGuruComponent } from './admin/input/tambah-informasi-guru/tambah-informasi-guru.component';
import { TambahPemetaaKelulusanAlumniComponent } from './admin/input/tambah-pemetaa-kelulusan-alumni/tambah-pemetaa-kelulusan-alumni.component';
import { TambahPrestasiPesertaDidikComponent } from './admin/input/tambah-prestasi-peserta-didik/tambah-prestasi-peserta-didik.component';
import { TambahProgramKewirausahaanComponent } from './admin/input/tambah-program-kewirausahaan/tambah-program-kewirausahaan.component';
import { TambahTeachingFactoryComponent } from './admin/input/tambah-teaching-factory/tambah-teaching-factory.component';
import { KegiatanProdukKreatifDanKewirausahaanComponent } from './admin/kegiatan-produk-kreatif-dan-kewirausahaan/kegiatan-produk-kreatif-dan-kewirausahaan.component';
import { LiterasiSekolahComponent } from './admin/literasi-sekolah/literasi-sekolah.component';
import { PemetaanKelulusanAlumniComponent } from './admin/pemetaan-kelulusan-alumni/pemetaan-kelulusan-alumni.component';
import { PenerimaanPesertaDidikBaruComponent } from './admin/penerimaan-peserta-didik-baru/penerimaan-peserta-didik-baru.component';
import { PengumumanComponent } from './admin/pengumuman/pengumuman.component';
import { PrestasiPesertaDidikComponent } from './admin/prestasi-peserta-didik/prestasi-peserta-didik.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzImageModule } from 'ng-zorro-antd/image';
import { SchoolAnnouncementComponent } from './news/school-announcement/school-announcement.component';
import {AngularStickyThingsModule} from '@w11k/angular-sticky-things';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './_interceptor/loading.interceptor';
import { UserBlogComponent } from './user-blog/user-blog.component';
import { KelulusanSiswaComponent } from './admin/kelulusan-siswa/kelulusan-siswa.component';
import { TambahKelulusanSiswaComponent } from './admin/input/tambah-kelulusan-siswa/tambah-kelulusan-siswa.component';
import { EditKelulusanSiswaComponent } from './admin/input/edit-kelulusan-siswa/edit-kelulusan-siswa.component';
import { InformasiKelulusanComponent } from './Activity/informasi-kelulusan/informasi-kelulusan.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { AxiooComponent } from './Programs/industrial-class/industrial-class/axioo/axioo.component';
import { MikrotikComponent } from './Programs/industrial-class/industrial-class/mikrotik/mikrotik.component';


export function jwtOptionsFactory(cookieService: CookieService) {
  return {
    tokenGetter: () => {
      return cookieService.get('userToken');
    },
    allowedDomains: ['localhost:4200.com'],

  };
}
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    HistoryComponent,
    VisionAndMissionComponent,
    HeadmasterComponent,
    StructureComponent,
    ProgramComponent,
    IndustrialRelationsComponent,
    TeachingFactoryComponent,
    ProgramBussinessCenterComponent,
    SchoolDevelopmentProgramComponent,
    EntrepreneurshipProgramComponent,
    MultimediaComponent,
    GtkInformationComponent,
    StudentInformationComponent,
    GraduationMappingComponent,
    StudentAchievementComponent,
    FacilitiesAndInfrastructureComponent,
    EntrepreneurshipComponent,
    SpecialJobFairComponent,
    PPDBComponent,
    ExtracurricularComponent,
    LiteracyComponent,
    PhotoGalleryComponent,
    PhotoVideoComponent,
    SchoolNewsComponent,
    LoginComponent,
    RegisterComponent,
    DetailComponent,
    ForgetPasswordComponent,
    ContactComponent,
    BlogComponent,
    BlogOneComponent,
    BlogTwoComponent,
    NotFoundComponent,
    ExpiredComponent,
    AdminComponent,
    SidebarComponent,
    DashboardComponent,
    HubunganIndustriComponent,
    TeachingComponent,
    ProgramKewirausahaanComponent,
    JurusanRekayasaPerangkatLunakComponent,
    JurusanMultimediaComponent,
    JurusanTeknikInstalasiTenagaListrikComponent,
    JurusanTeknikKomputerDanJaringanComponent,
    JurusanTeknikJaringanAksesTelkomunikasiComponent,
    InformasiGuruDanTenagaKependidikanComponent,
    QuantityInformationComponent,
    BannerComponent,
    ProfileLinkComponent,
    PrincipalsInformationComponent,
    VerifikasiComponent,
    NavbarComponent,
    HomeBloggerComponent,
    ProfilComponent,
    BloggerComponent,
    BlogSayaComponent,
    Template1Component,
    Template2Component,
    AdminComponent,
    SidebarComponent,
    DashboardComponent,
    HubunganIndustriComponent,
    TeachingComponent,
    ProgramKewirausahaanComponent,
    JurusanRekayasaPerangkatLunakComponent,
    JurusanMultimediaComponent,
    JurusanTeknikInstalasiTenagaListrikComponent,
    JurusanTeknikKomputerDanJaringanComponent,
    JurusanTeknikJaringanAksesTelkomunikasiComponent,
    InformasiGuruDanTenagaKependidikanComponent,
    PemetaanKelulusanAlumniComponent,
    PrestasiPesertaDidikComponent,
    SaranaPrasaranaComponent,
    KegiatanProdukKreatifDanKewirausahaanComponent,
    BursaKerjaKhususComponent,
    QuantityInformationComponent,
    BannerComponent,
    ProfileLinkComponent,
    PrincipalsInformationComponent,
    AddPrincipalComponent,
    UploadPrincipalComponent,
    AddIndustrialRelationsComponent,
    EditEntrepreneurshipProgramComponent,
    TambahTeachingFactoryComponent,
    EditTeachingFactoryComponent,
    TambahProgramKewirausahaanComponent,
    EditProgramKewirausahaanComponent,
    TambahKerjaSamaIdukaComponent,
    TambahInformasiGuruComponent,
    EditInformasiGuruComponent,
    TambahPemetaaKelulusanAlumniComponent,
    EditPemetaanKelulusanAlumniComponent,
    PemetaanKelulusanAlumniComponent,
    PrestasiPesertaDidikComponent,
    SaranaPrasaranaComponent,
    KegiatanProdukKreatifDanKewirausahaanComponent,
    BursaKerjaKhususComponent,
    TambahPrestasiPesertaDidikComponent,
    EditPrestasiPesertaDidikComponent,
    TambahSaranaDanPrasaranaComponent,
    EditSaranaDanPrasaranaComponent,
    TambahBursaKerjaKhususComponent,
    EditBursaKerjaKhususComponent,
    PenerimaanPesertaDidikBaruComponent,
    EkstrakulikulerComponent,
    LiterasiSekolahComponent,
    BeritaSekolahComponent,
    PengumumanComponent,
    InformasiKontakSekolahComponent,
    GaleriFotoDanVideoComponent,
    TambahDaftarPesertaLulusPpdbComponent,
    EditDaftarPesertaLulusPpdbComponent,
    EditEkstrakulikulerComponent,
    TambahEkstrakulikulerComponent,
    TambahFotoGaleriSekolahComponent,
    EditBeritaSekolahComponent,
    TambahBeritaSekolahComponent,
    TambahPengumumanComponent,
    EditPengumumanComponent,
    LiteracyComponent,
    ProgramBussinessCenterAdminComponent,
    AddProgramBussinessCenterComponent,
    EditProgramBussinessCenter,
    SchoolAnnouncementComponent,
    UserBlogComponent,    
    KelulusanSiswaComponent,
    TambahKelulusanSiswaComponent,
    EditKelulusanSiswaComponent,
    InformasiKelulusanComponent,
    AxiooComponent, 
    MikrotikComponent
  ],
  imports: [
    CountUpModule,
    NzFormModule,
    NzImageModule,
    NzTabsModule,
    NgxSpinnerModule,
    AngularStickyThingsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    TabsModule.forRoot(),
    FormsModule,
    NzTableModule,
    NzDividerModule,
    NzInputModule,
    NzIconModule,
    NzSelectModule,
    MatSelectModule,
    MatInputModule,
    NzPopoverModule,
    MatTabsModule,
    NzCarouselModule,
    NzLayoutModule,
    NzToolTipModule,
    NzSpaceModule,
    NzPopconfirmModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    NzCardModule,
    NzTagModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [CookieService]
      }
    })
  ],
  providers: [
    CookieService,
    provideNzI18n(id_ID),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
