import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VisionAndMissionComponent } from './Profil/vision-and-mission/vision-and-mission.component';
import { HistoryComponent } from './Profil/history/history.component';
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
import { FacilitiesAndInfrastructureComponent } from './sarpras/facilities-and-infrastructure/facilities-and-infrastructure.component';
import { EntrepreneurshipComponent } from './Activity/entrepreneurship/entrepreneurship.component';
import { SpecialJobFairComponent } from './Activity/special-job-fair/special-job-fair.component';
import { PPDBComponent } from './Activity/ppdb/ppdb.component';
import { ExtracurricularComponent } from './Activity/extracurricular/extracurricular.component';
import { LiteracyComponent } from './Activity/literacy/literacy.component';
import { PhotoGalleryComponent } from './Galeri/photo-gallery/photo-gallery.component';
import { PhotoVideoComponent } from './Galeri/photo-video/photo-video.component';
import { SchoolNewsComponent } from './news/school-news/school-news.component';
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
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HubunganIndustriComponent } from './admin/hubungan-industri/hubungan-industri.component';
import { TeachingComponent } from './admin/teaching/teaching.component';
import { ProgramKewirausahaanComponent } from './admin/program-kewirausahaan/program-kewirausahaan.component';
import { JurusanRekayasaPerangkatLunakComponent } from './admin/jurusan-rekayasa-perangkat-lunak/jurusan-rekayasa-perangkat-lunak.component';
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
import { safetyGuard } from 'src/Guard/safety.guard';
import { BlogSayaComponent } from './blogger/blog-saya/blog-saya.component';
import { BloggerComponent } from './blogger/blogger.component';
import { HomeBloggerComponent } from './blogger/home-blogger/home-blogger.component';
import { ProfilComponent } from './blogger/profil/profil.component';
import { Template1Component } from './blogger/template1/template1.component';
import { Template2Component } from './blogger/template2/template2.component';
import { userRoutesGuard } from 'src/Guard/user-routes.guard';
import { verifGuard } from 'src/Guard/verif.guard';
import { BeritaSekolahComponent } from './admin/berita-sekolah/berita-sekolah.component';
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
import { TambahKerjaSamaIdukaComponent } from './admin/input/tambah-kerja-sama-iduka/tambah-kerja-sama-iduka.component';
import { TambahPemetaaKelulusanAlumniComponent } from './admin/input/tambah-pemetaa-kelulusan-alumni/tambah-pemetaa-kelulusan-alumni.component';
import { TambahPengumumanComponent } from './admin/input/tambah-pengumuman/tambah-pengumuman.component';
import { TambahPrestasiPesertaDidikComponent } from './admin/input/tambah-prestasi-peserta-didik/tambah-prestasi-peserta-didik.component';
import { TambahProgramKewirausahaanComponent } from './admin/input/tambah-program-kewirausahaan/tambah-program-kewirausahaan.component';
import { TambahSaranaDanPrasaranaComponent } from './admin/input/tambah-sarana-dan-prasarana/tambah-sarana-dan-prasarana.component';
import { TambahTeachingFactoryComponent } from './admin/input/tambah-teaching-factory/tambah-teaching-factory.component';
import { KegiatanProdukKreatifDanKewirausahaanComponent } from './admin/kegiatan-produk-kreatif-dan-kewirausahaan/kegiatan-produk-kreatif-dan-kewirausahaan.component';
import { LiterasiSekolahComponent } from './admin/literasi-sekolah/literasi-sekolah.component';
import { PemetaanKelulusanAlumniComponent } from './admin/pemetaan-kelulusan-alumni/pemetaan-kelulusan-alumni.component';
import { PenerimaanPesertaDidikBaruComponent } from './admin/penerimaan-peserta-didik-baru/penerimaan-peserta-didik-baru.component';
import { PengumumanComponent } from './admin/pengumuman/pengumuman.component';
import { PrestasiPesertaDidikComponent } from './admin/prestasi-peserta-didik/prestasi-peserta-didik.component';
import { ProgramBussinessCenterAdminComponent } from './admin/program-bussiness-center/program-bussiness-center.component';
import { SaranaPrasaranaComponent } from './admin/sarana-prasarana/sarana-prasarana.component';
import { SchoolAnnouncementComponent } from './news/school-announcement/school-announcement.component';
import { UserBlogComponent } from './user-blog/user-blog.component';
import { EditKelulusanSiswaComponent } from './admin/input/edit-kelulusan-siswa/edit-kelulusan-siswa.component';
import { TambahKelulusanSiswaComponent } from './admin/input/tambah-kelulusan-siswa/tambah-kelulusan-siswa.component';
import { KelulusanSiswaComponent } from './admin/kelulusan-siswa/kelulusan-siswa.component';
import { InformasiKelulusanComponent } from './Activity/informasi-kelulusan/informasi-kelulusan.component';
import { AxiooComponent } from './Programs/industrial-class/industrial-class/axioo/axioo.component';
import { MikrotikComponent } from './Programs/industrial-class/industrial-class/mikrotik/mikrotik.component';



const routes: Routes = [
  {path: '', component:HomeComponent, title:"SMK Negeri 7 Batam - INOVATIF DAN BERBUDAYA"},
  {path: 'home', component:HomeComponent, title:"SMK Negeri 7 Batam - INOVATIF DAN BERBUDAYA"},
  {path: 'sejarah', component:HistoryComponent, title:"Sejarah - SMK Negeri 7 Batam"},
  {path: 'visi-misi', component:VisionAndMissionComponent, title:"Visi-Misi"},
  {path: 'profil-pimpinan', component:HeadmasterComponent, title:"Kepala Sekolah"},
  {path: 'struktur-organisasi', component:StructureComponent,title:"Struktur Organisasi"},
  {path: 'program-kerja', component:ProgramComponent, title:"Program Kerja"},
  {path: 'hubungan-industri', component:IndustrialRelationsComponent, title:"Hubungan Industri"},
  {path: 'tefa', component:TeachingFactoryComponent, title:"TEFA"},
  {path: 'program-bisnis', component:ProgramBussinessCenterComponent, title:"Program Bisnis"},
  {path: 'program-pengembangan-sekolah', component:SchoolDevelopmentProgramComponent, title:"Program Pengembangan Sekolah"},
  {path: 'program-kewirausahaan', component:EntrepreneurshipProgramComponent, title:"Program Kewirausahaan"},
  // {path: 'jurusan-Multimedia', component:MultimediaComponent},
  {path: 'jurusan/:jurusan', component: MultimediaComponent, title:"Jurusan - SMK Negeri 7 Batam"},
  {path: 'gtk', component:GtkInformationComponent, title:"Informasi GTK"},
  {path: 'ppdb', component: PPDBComponent, title:"PPDB - SMK Negeri 7 Batam" },
  {path: 'literasi', component: LiteracyComponent, title:"Kegiatan Literasi" },
  {path: 'foto', component: PhotoGalleryComponent, title:"Galeri Foto" },
  {path: 'video', component: PhotoVideoComponent, title:"Galeri Video" },
  {path: 'berita', component: SchoolNewsComponent, title:"Berita - SMK Negeri 7 Batam" },
  {path: 'pengumuman', component: SchoolAnnouncementComponent, title:"Pengumuman - SMK Negeri 7 Batam" },
  {path: 'informasi-siswa', component:StudentInformationComponent, title:"Informasi Siswa"},
  {path: 'peta-kelulusan', component:GraduationMappingComponent, title:"Peta Kelulusan"},
  {path: 'prestasi', component:StudentAchievementComponent,title:"Prestasi - SMK Negeri 7 Batam"},
  {path: 'sarana-infrastruktur', component:FacilitiesAndInfrastructureComponent, title:"Sarana Infrastruktur"},
  {path: 'kewirausahaan', component:EntrepreneurshipComponent, title:"Program PKK"},
  {path: 'bursa-kerja-khusus', component:SpecialJobFairComponent, title:"Bursa Kerja Khusus"},
  // {path: 'penerimaan-Peserta-Didik-Baru', component:PPDBComponent},
  {path: 'ekstrakulikuler', component:ExtracurricularComponent, title:"Ekstrakulikuler - SMK Negeri 7 Batam"},
  // {path: 'literasi', component:LiteracyComponent},
  // {path: 'galery-Foto', component:PhotoGalleryComponent},
  // {path: 'galery-Video', component:PhotoVideoComponent},
  // {path: 'berita-sekolah', component:SchoolNewsComponent},
  {path: 'DetailBerita/:judul', component: DetailComponent},
  // {path: 'Blog', component:BlogComponent},
  {path: 'Blog1/:judul/1', component:BlogOneComponent},
  {path: 'Blog2/:judul/2', component:BlogTwoComponent},
  {path: 'login', component:LoginComponent, title:"Login"},
  {path: 'register', component:RegisterComponent, title:"Register"},
  {path: 'Forget-Password', component:ForgetPasswordComponent},
  {path: 'Not-found', component:NotFoundComponent},
  {path: 'Verification', component: VerifikasiComponent },
  {path: 'Expired', component:ExpiredComponent},
  {path: 'kontak', component: ContactComponent, title:"Kontak - SMK Negeri 7 Batam"},
  {path: 'blog', component: UserBlogComponent, title:"Blog - SMK Negeri 7 Batam" },
  {path: 'informasi-kelulusan', component: InformasiKelulusanComponent, title:"Informasi Kelulusan" },
  {path: 'axioo', component: AxiooComponent, title: 'Axioo' }, 
  {path: 'mikrotik', component: MikrotikComponent, title: 'Mikrotik' },
  {path: 'admin', component:AdminComponent,canActivate: [safetyGuard],children:  [
    {path: '', component:DashboardComponent,  title:"Admin - SMK Negeri 7 Batam"},
    {path: 'Dashboard', component:DashboardComponent,  title:"Admin - SMK Negeri 7 Batam"},
    {path: 'Hubungan-Industri', component:HubunganIndustriComponent},
    {path: 'Teaching-Factory', component:TeachingComponent},
    {path: 'Program-Kewirausahaan', component:ProgramKewirausahaanComponent},
    {path: 'Rekayasa-Perangkat-Lunak', component:JurusanRekayasaPerangkatLunakComponent},
    {path: 'Multimedia', component:JurusanMultimediaComponent},
    {path: 'Teknik-Instalasi-Tenaga-Listrik', component:JurusanTeknikInstalasiTenagaListrikComponent},
    {path: 'Teknik-Komputer-dan-Jaringan', component:JurusanTeknikKomputerDanJaringanComponent},
    {path: 'Teknik-Jaringan-Akses-Telkomunikasi', component:JurusanTeknikJaringanAksesTelkomunikasiComponent},
    {path: 'Informasi-Guru-dan-Tenaga-Kependidikan', component:InformasiGuruDanTenagaKependidikanComponent},
    {path: 'Pemetaan-Kelulusan-Alumni',component: PemetaanKelulusanAlumniComponent},
    {path: 'Prestasi-Peserta-Didik',component: PrestasiPesertaDidikComponent},
    {path: 'Sarana-Prasarana',component: SaranaPrasaranaComponent},
    {path: 'Kegiatan-Produk-Kreatif-dan-Kewirausahaan',component: KegiatanProdukKreatifDanKewirausahaanComponent,},
    {path: 'Bursa-Kerja-Khusus',component: BursaKerjaKhususComponent,},
    {path: 'Informasi-Jumlah', component:QuantityInformationComponent},
    {path: 'Banner-Slogan', component:BannerComponent},
    {path: 'Link-Profil', component:ProfileLinkComponent},
    {path: 'Informasi-Kepala-Sekolah', component:PrincipalsInformationComponent},
    {path: 'Tambah-Kepala-Sekolah', component:AddPrincipalComponent},
    {path: 'Edit-Profil-Kepala-Sekolah/:id', component:UploadPrincipalComponent},
    {path: 'Add-Industrial-Relations', component:AddIndustrialRelationsComponent},
    {path: 'Edit-Hubungan-Industri/:id', component: EditEntrepreneurshipProgramComponent },
    {path: 'Tambah-Teaching-Factory', component:TambahTeachingFactoryComponent},
    {path: 'Edit-Teaching-Factory/:id', component:EditTeachingFactoryComponent},
    {path: 'Tambah-Program-Kewirausahaan', component:TambahProgramKewirausahaanComponent},
    {path: 'Edit-Program-Kewirausahaan/:id', component:EditProgramKewirausahaanComponent},
    {path: 'Tambah-Kerja-Sama-IDUKA/:singkatan', component:TambahKerjaSamaIdukaComponent},
    {path: 'Tambah-Informasi-Guru-dan-Tenaga-Kependidikan', component:TambahInformasiGuruComponent},
    {path: 'Edit-Informasi-Guru-dan-Tenaga-kependidikan/:id', component:EditInformasiGuruComponent},
    {path: 'Tambah-Pemetaan-Kelulusan-Alumni', component:TambahPemetaaKelulusanAlumniComponent},
    {path: 'edit-pemetaan-kelulusan-alumni/:id', component:EditPemetaanKelulusanAlumniComponent},
    {path: 'Tambah-Prestasi-Peserta-Didik', component:TambahPrestasiPesertaDidikComponent},
    {path: 'Edit-Prestasi-Peserta-Didik/:id', component:EditPrestasiPesertaDidikComponent},
    {path: 'Tambah-Sarana-dan-Prasarana', component:TambahSaranaDanPrasaranaComponent},
    {path: 'Edit-Sarana-dan-Prasarana/:id', component:EditSaranaDanPrasaranaComponent},
    {path: 'Tambah-Bursa-Kerja-Khusus', component:TambahBursaKerjaKhususComponent},
    {path: 'Edit-Bursa-Kerja-Khusus/:id', component:EditBursaKerjaKhususComponent},
    {path: 'Penerimaan-Peserta-Didik-Baru',component: PenerimaanPesertaDidikBaruComponent,},
    {path: 'Ekstrakulikuler',component: EkstrakulikulerComponent,},
    {path: 'Literasi-Sekolah',component: LiterasiSekolahComponent,},
    {path: 'Galeri-Foto-dan-Video',component: GaleriFotoDanVideoComponent,},
    {path: 'Berita-Sekolah',component: BeritaSekolahComponent,},
    {path: 'Pengumuman',component: PengumumanComponent,},
    {path: 'Kontak',component: InformasiKontakSekolahComponent,},
    {path: 'Tambah-Daftar-Peserta-Lulus-PPDB',component: TambahDaftarPesertaLulusPpdbComponent},
    {path: 'Edit-Daftar-Peserta-Lulus-PPDB/:id',component: EditDaftarPesertaLulusPpdbComponent},
    {path: 'Tambah-Ekstrakulikuler',component: TambahEkstrakulikulerComponent},
    {path: 'Edit-Ekstrakulikuler/:id',component: EditEkstrakulikulerComponent},
    {path: 'Tambah-Foto-Galeri-Sekolah',component: TambahFotoGaleriSekolahComponent},
    {path: 'Edit-Berita-Sekolah/:id',component: EditBeritaSekolahComponent},
    {path: 'Tambah-Berita-Sekolah',component: TambahBeritaSekolahComponent},
    {path: 'Tambah-Pengumuman',component: TambahPengumumanComponent},
    {path: 'Edit-Pengumuman/:id',component: EditPengumumanComponent},
    {path: 'Penerimaan-Peserta-Didik-Baru',component: PenerimaanPesertaDidikBaruComponent},
    {path: 'Ekstrakulikuler',component: EkstrakulikulerComponent},
    {path: 'Literasi-Sekolah',component: LiterasiSekolahComponent},
    {path: 'Galeri-Foto-dan-Video',component: GaleriFotoDanVideoComponent},
    {path: 'Berita-Sekolah',component: BeritaSekolahComponent},
    {path: 'Pengumuman',component: PengumumanComponent},
    {path: 'Program-Bussiness-Center-Admin',component: ProgramBussinessCenterAdminComponent},  
    {path: 'Tambah-Program-Bussiness-Center',component: AddProgramBussinessCenterComponent}, 
    {path: 'Edit-Program-Bussiness-Center/:id',component: EditProgramBussinessCenter}, 
    {
      path: 'Kelulusan-Siswa-SMK-Negeri-7-Batam',
      component: KelulusanSiswaComponent,
    },
    {
      path: 'Tambah-Kelulusan-Siswa-SMK-Negeri-7-Batam',
      component: TambahKelulusanSiswaComponent,
    },
    {
      path: 'Edit-Kelulusan-Siswa-SMK-Negeri-7-Batam/:id',
      component: EditKelulusanSiswaComponent,
    },

    
  ]},
  {path: 'Blogger', component:BloggerComponent,canActivate: [userRoutesGuard], children:  [
    {path: '',  component:HomeBloggerComponent, title:'Blog | SMK Negeri 7 Batam' ,},
    {path: 'Home', component:HomeBloggerComponent, title:'Blog | SMK Negeri 7 Batam'},
    {path: 'Profil', component:ProfilComponent, title:'Edit Profil'},
    {path: 'Blog-Saya', component:BlogSayaComponent, title:'My Blog'},
    {path: 'Template-1', component:Template1Component, title:'Post Blog'},
    {path: 'Template-2', component:Template2Component, title:'Post Blog'},
  ]},
  {path: '**', component:NotFoundComponent,pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
