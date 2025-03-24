import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';

import * as CryptoJs from 'crypto-js'
import { Tokens, User, Email } from '../../Model/Model';


interface komentars {
  nama : string;
  email : string;
  keterangankomentars : string;
  }

//Interface Foto Home
interface ImageDatas {
  id:number;
  foto:string;
}


//Interface Jurusan
interface Jurusan{
  id: number;
  namaJurusan: string;
  singkatan: string;
  fotoJurusan: string;
}


//Interface Prestasi Siswa
interface Achievement {
  id: number;
  keterangan: string;
  tahun: string;
}


//Interface SaranaPrasarana
interface SaranaPrasarana {
  id: number;
  namaRuangan: string;
  jumlah: number;
  luasUnit: number;
  kondisi: string;
  kebutuhan: number;
  kurang: number;
}


interface NewsItem {
  id: number;
  category: string;
  judul: string;
  tanggal: string;
  isi: string;
  foto: { id: number, url: string, isMain: boolean }[];
  hashtag : string
}

// video.interface.ts
interface Video {
  id: number;
  url: string;
}

interface JurusanEdit {
  visi: string;
  misi: string;
  lulusanKeahlian: string;
  jumlahSiswa: number;
  fotoJurusan: string;
}



interface Kerjasama {
  id: number;
  kerjasama: string;
  jurusanId: number;
}

interface UnitProduksi {
  id: number;
  url: string;
  jurusanId: number;
}

interface FotoRuanganJurusan {
  id: number;
  url: string;
  jurusanId: number;
}

interface JurusanResponse {
  id: number;
  namaJurusan: string;
  singkatan: string;
  visi: string;
  misi: string;
  lulusanKeahlian: string;
  jumlahSiswa: number;
  fotoJurusan: string;
  kerjaSama: Kerjasama[];
  fotoUnitProduksi: UnitProduksi[];
  fotoRuanganJurusan: FotoRuanganJurusan[];
  // ... sisa properti yang ada pada respons API
}

interface UploadResponse {
  id: number;
  namaJurusan: string;
  singkatan: string;
  visi: string;
  misi: string;
  lulusanKeahlian: string;
  jumlahSiswa: number;
  fotoJurusan: string;
  kerjaSama: Kerjasama[];
  fotoUnitProduksi: UnitProduksi[];
  fotoRuanganJurusan: FotoRuanganJurusan[];
  // ... sisa properti yang mungkin ada pada respons API setelah update
}



interface Count {
  count: number;
}




@Injectable({
  providedIn: 'root'
})
export class getdataService {
  jurusan: any;
  baseUrl = "https://smknegeri7batam-001-site1.ctempurl.com/api/"
  baseurlAccount = 'https://smknegeri7batam-001-site1.ctempurl.com/api/AccountBlog/';
  
  //https://smknegeri7batam-001-site1.ctempurl.com/api/
  //https://gary23457-001-site1.ftempurl.com/api/
  //https://maganginforsys-001-site1.anytempurl.com/api/"
  private currentUser: BehaviorSubject<Tokens | null> = new BehaviorSubject<Tokens | null>(null);
  cuurentuser$ =this.currentUser.asObservable();
  isLoggedIn = false;

  constructor(private http : HttpClient, private route : ActivatedRoute, private cookieService: CookieService, private jwtHelper : JwtHelperService) {
    this.isLoggedIn = this.checkLoggedIn();
  }

  getKomentar(): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'Berita/GetComment');
  }

  GetCountVisitor() {
    return this.http.get<Count[]>(this.baseUrl + 'visitor');
  }

  UpdateCountVisitor(id: any, dataCount: any) {
    return this.http.put<Count>(this.baseUrl + 'visitor/' + id, dataCount);
  }
  
  Register(user: User) {
    return this.http.post(this.baseurlAccount + 'Accregis', user, {
      responseType: 'text',
    });
  }

  ReceiveEmail(email : Email){
    return this.http.post(this.baseurlAccount + "kirimEmailKeAdmin",email,{
      responseType : 'text'
    });
  }



  Logins(user: User) {
    return this.http.post<Tokens>(this.baseurlAccount + 'Logins', user, {}).pipe(
      map((response: Tokens) => {
        if (response && response.token ) {
          const idAsString = response.id.toString();

          // Melakukan enkripsi
          const encryptedId = CryptoJS.AES.encrypt(idAsString, '.A|rK7w8nW*56p*HVLv^E=NK]Z,WpZJeQC6wFZR9wT8RPW8wcHiOr2RS4LvmdiOud2Hnceu').toString();



   this.cookieService.set('^a*B`TeVerlDn+8SP>+"Ad_{z/J;k[C%%GC4h6VV_;z8^.[kq~-JbFM{Y?{j',encryptedId,undefined,'/')
   this.cookieService.set('userToken', response.token, 7, '/', undefined, true, 'Strict');
        }
        return response;
      })
    );
  }

  getLevelFromToken(): string | null {
    const userToken = this.cookieService.get('userToken');
    if (userToken) {
      const tokenPayload = this.jwtHelper.decodeToken(userToken);
      return tokenPayload?.Level || null;
    }
    return null;
  }

  saveProfile(updates: any): Observable<any> {
    const token = this.cookieService.get('userToken');
    const encryptedId = this.cookieService.get('^a*B`TeVerlDn+8SP>+"Ad_{z/J;k[C%%GC4h6VV_;z8^.[kq~-JbFM{Y?{j');
    const decryptedId = CryptoJS.AES.decrypt(encryptedId, '.A|rK7w8nW*56p*HVLv^E=NK]Z,WpZJeQC6wFZR9wT8RPW8wcHiOr2RS4LvmdiOud2Hnceu').toString(CryptoJS.enc.Utf8);

    const url = `${this.baseurlAccount}Updateuser/${decryptedId}`;

    const formData = new FormData();
    formData.append('Picture', updates.picture);
    formData.append('Username', updates.username);
    formData.append('Jurusan', updates.jurusan);
    formData.append('Instagram', updates.instagram);



    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);


    return this.http.put(url, formData, { headers });
  }


  takesuser(){

    const encryptedId = this.cookieService.get('^a*B`TeVerlDn+8SP>+"Ad_{z/J;k[C%%GC4h6VV_;z8^.[kq~-JbFM{Y?{j');
    const decryptedId = CryptoJS.AES.decrypt(encryptedId, '.A|rK7w8nW*56p*HVLv^E=NK]Z,WpZJeQC6wFZR9wT8RPW8wcHiOr2RS4LvmdiOud2Hnceu').toString(CryptoJS.enc.Utf8);

    const token = this.cookieService.get('userToken');
    const url = `${this.baseurlAccount}Takesuser/${decryptedId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(url,{ headers })
  }


  setCurrentuser(user: Tokens | null): void {
    if (user !== null) {
      this.cookieService.set('userToken', JSON.stringify(user), { sameSite: 'Strict' });
      this.isLoggedIn = true;
    } else {
      this.cookieService.delete('userToken', '/');
      this.isLoggedIn = false;
    }
    this.currentUser.next(user);
  }

  Logout(): void {
    this.cookieService.delete('userToken','/');
    this.cookieService.delete('^a*B`TeVerlDn+8SP>+"Ad_{z/J;k[C%%GC4h6VV_;z8^.[kq~-JbFM{Y?{j','/');
    this.currentUser.next(null);
    this.isLoggedIn = false;
  }

  checkLoggedIn(): boolean {
    const userToken = this.cookieService.get('userToken');
    return !!userToken;
  }

  Forgetpassword(user: User) {
    return this.http.post(this.baseurlAccount + 'Forget-Password', user, {
      responseType: 'text',
    });
  }
resetpass(user: User) {
    return this.http.post(this.baseurlAccount + 'reset-password', user, {
      responseType: 'text',
    });
  }














  //-------------------------------------------HOME-----------------------------------------------
  getJumlahGuru() {
    return this.http.get( this.baseUrl + 'Guru');
  }

  loadDataJumlah() {
    return this.http.get( this.baseUrl + 'InformasiJumlah/1');
  }

  loadVisitor() {
    return this.http.get( this.baseUrl + 'Visitor/1');
  }

  loadDataSambutan() {
    return this.http.get<any>( this.baseUrl + 'SambutanKepsek/1');
  } 

  getSambutan(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'SambutanKepsek/1');
  }

  updateSambutan(data: FormData): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
});

    return this.http.put<any>(this.baseUrl + 'SambutanKepsek/1', data, {headers});
  }

  loadVideoProfil(videoId: number): Observable<any> {
    return this.http.get(this.baseUrl +`VideoProfil/${videoId}`);
  }






  loadVideoRencanaAksi(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'VideoRencanaAksi');
  }

  getVideoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}VideoRencanaAksi/${id}`);
  }

  updateVideo(id: number, data: any): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
});

    return this.http.put(`${this.baseUrl}VideoRencanaAksi/${id}`, data, {headers});
  }

  loadFotoHome(): Observable<ImageDatas[]> {
    return this.http.get<ImageDatas[]>( this.baseUrl + 'FotoHome');
  }

  loadJurusan() {
    return this.http.get<Jurusan[]>( this.baseUrl + 'Jurusan');
  }

  loadBerita() {
    return this.http.get<any[]>( this.baseUrl + 'berita');
  }



//-------------------------------------------Rombel----------------------------

getRombel(): Observable<any> {
  return this.http.get(`${this.baseUrl}InformasiJumlah/1`);
}

updateRombel(rombel: number): Observable<any> {
  const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
});
  return this.http.put(`${this.baseUrl}InformasiJumlah/1`, { id: 1, rombel }, {headers});
}



  //-----------------------------------------PROFIL---------------------------------------
  loadDataKepalaSekolah() {
    return this.http.get<any[]>( this.baseUrl + 'KepalaSekolah');
  }

  PostKepalaSekolah(data: FormData): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });

    return this.http.post(this.baseUrl + 'KepalaSekolah', data, {headers});
  }

  getKepalaSekolahId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}KepalaSekolah/${id}`);
  }

  updateKepalaSekolah(id: number, data: FormData): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });

    return this.http.put<any>(`${this.baseUrl}KepalaSekolah/${id}`, data, {headers});
  } 

  
  loadStrukturOrganisasi(){
    return this.http.get<any[]>( this.baseUrl  + 'StrukturOrganisasi')
  }

  getStruktur(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'StrukturOrganisasi/1');
  }

  updateStruktur(data: FormData): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });

    return this.http.put<any>(this.baseUrl + 'StrukturOrganisasi/1', data, {headers});
  }



  //-----------------------------------------PROGRAM--------------------------------------
  loadHubunganIndustri(){
    return this.http.get<any[]>( this.baseUrl + 'HubunganIndustri');
  }

//post
PostHubunganIndustri(data: FormData): Observable<any> {
  const token = this.cookieService.get('userToken');
  const headers = new HttpHeaders({
Authorization: `Bearer ${token}`
});

  return this.http.post(this.baseUrl + 'HubunganIndustri', data, {headers});
}

   //edit
  updateHubungan(id: number, data: FormData): Observable<any> {
    const token = this.cookieService.get('userToken');
          const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

    return this.http.put<any>(`${this.baseUrl}HubunganIndustri/${id}`, data, {headers});
  } 
  

getHubunganId(id: number): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}HubunganIndustri/${id}`);
}




  deleteHubunganIndustri(id: number): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });

    const deleteUrl = `${this.baseUrl}HubunganIndustri/${id}`;
    return this.http.delete(deleteUrl, {headers});
  }


  loadTeachingFactory(){
    return this.http.get<any[]>( this.baseUrl + 'TeachingFactory');
  }

  getTeachingId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}TeachingFactory/${id}`);
  }

  updateTeaching(id: number, data: FormData): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
});

    return this.http.put<any>(`${this.baseUrl}TeachingFactory/${id}`, data, {headers});
  } 

  //post
postTeachingFactory(data: FormData): Observable<any> {
  const token = this.cookieService.get('userToken');
  const headers = new HttpHeaders({
Authorization: `Bearer ${token}`
});
  return this.http.post(this.baseUrl + 'TeachingFactory', data, {headers});
}

//delete
deleteTeachingFactory(id: number): Observable<any> {
  const token = this.cookieService.get('userToken');
  const headers = new HttpHeaders({
Authorization: `Bearer ${token}`
});
  const deleteUrl = `${this.baseUrl}TeachingFactory/${id}`;
  return this.http.delete(deleteUrl, {headers});
}


  loadProgramBussinessCenter(){
    return this.http.get<any[]>( this.baseUrl + 'ProgramBussinessCenter');
  }

  getBussinessCenterId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}ProgramBussinessCenter/${id}`);
  }

  PostProgramBussiness(data: FormData): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    return this.http.post(this.baseUrl + 'ProgramBussinessCenter', data, {headers});
  }

  updatProgramBussiness(id: number, data: FormData): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    return this.http.put<any>(`${this.baseUrl}ProgramBussinessCenter/${id}`, data, {headers});
  } 
  

  deleteProgramBussiness(id: number): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });

    const deleteUrl = `${this.baseUrl}ProgramBussinessCenter/${id}`;
    return this.http.delete(deleteUrl, {headers});
  }

  loadProgramKewirausahaan(){
    return this.http.get<any[]>( this.baseUrl + 'Wirausaha');
  }


    //post
postWirausaha(data: FormData): Observable<any> {
  const token = this.cookieService.get('userToken');
  const headers = new HttpHeaders({
Authorization: `Bearer ${token}`
});
  return this.http.post(this.baseUrl + 'Wirausaha', data, {headers});
}

getWirausahaId(id: number): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}Wirausaha/${id}`);
}

updateWirausaha(id: number, data: FormData): Observable<any> {
  const token = this.cookieService.get('userToken');
  const headers = new HttpHeaders({
Authorization: `Bearer ${token}`
});
  return this.http.put<any>(`${this.baseUrl}Wirausaha/${id}`, data, {headers});
} 
  deleteWirausaha(id: number): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    const deleteUrl = `${this.baseUrl}Wirausaha/${id}`;
    return this.http.delete(deleteUrl, {headers});
  }

 



  //------------------------------------KOMPETENSI KEAHLIAN-------------------------------------
  loadKompetensiKeahlian(jurusan: string){
    return this.http.get( this.baseUrl +`Jurusan/by/${jurusan}`);
  }

  deleteKerjasama(jurusanId: number, kerjasamaId: number): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });

    const url = `${this.baseUrl}Jurusan/delete-kerjasama/${jurusanId}/${kerjasamaId}`;
    return this.http.delete(url, {headers}).pipe(
        catchError((error: any) => {
            return throwError('Error deleting kerjasama. Please try again.'); // You can customize the error message
        })
    );
  }

  editJurusan(singkatan: string, data: FormData): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    const url = `${this.baseUrl}Jurusan/${singkatan}`;
    return this.http.put(url, data, {headers});
  }
  
  updateFotoUnit(jurusan:any, id:any ,formData: FormData): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });

    const url = `${this.baseUrl}Jurusan/edit-fotounitproduksi/${jurusan}/${id}`;
    return this.http.put(url, formData, {headers});
  }
  updateruangan(jurusan:any ,id:any ,formData: FormData): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    const url = `${this.baseUrl}Jurusan/edit-fotoruanganjurusan/${jurusan}/${id}`;
    return this.http.put(url, formData, {headers});
  }














  //---------------------------------------GTK dan SISWA-----------------------------------------------------------

  loadDataGTK(jabatan: string){
    return this.http.get<any>( this.baseUrl +`Guru/ByJabatan?jabatan=${jabatan}`);
  }

  //get di admin
  LoadGtkAdmin(){
    return this.http.get<any[]>( this.baseUrl + 'Guru');
  }

  //postGTK
  PostGTK(data: FormData): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    return this.http.post(this.baseUrl + 'Guru', data, {headers});
  }

  getGTKId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Guru/${id}`);
  }

  updateGTK(id: number, data: FormData): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    return this.http.put<any>(`${this.baseUrl}Guru/${id}`, data, {headers});
  } 

  //deleteGTK
  deleteGTK(id: number): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });

    const deleteUrl = `${this.baseUrl}Guru/${id}`;
    return this.http.delete(deleteUrl, {headers});
  }

  loadPemetaanKelulusan(){
    return this.http.get<any[]>( this.baseUrl + 'InformasiPemetaanKelulusan');
  }

  //post pemetaan kelulusan
  PostPemetaan(data: FormData): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });

    return this.http.post(this.baseUrl + 'InformasiPemetaanKelulusan', data, {headers});
  }

  getPetaId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}InformasiPemetaanKelulusan/${id}`);
  }

  updatePeta(id: number, data: FormData): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });

    return this.http.put<any>(`${this.baseUrl}InformasiPemetaanKelulusan/${id}`, data, {headers});
  } 

  loadPrestasiSiswa() {
    return this.http.get<Achievement[]>( this.baseUrl + 'PrestasiPesertaDidik');
  }

  postPrestasi(data: { keterangan: string, tahun: string }): Observable<any> {
      const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });

    return this.http.post(this.baseUrl + 'PrestasiPesertaDidik', data, {headers});
  }

  loadPrestasiAdmin(){
    return this.http.get<any[]>( this.baseUrl + 'PrestasiPesertaDidik');
  }

  
  getPrestasiId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}PrestasiPesertaDidik/${id}`);
  }
  

  updatePrestasi(id: number, data: any): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    return this.http.put<any>(`${this.baseUrl}PrestasiPesertaDidik/${id}`, data, {headers});
  }
  

  deletePrestasi(id: number): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });

    const deleteUrl = `${this.baseUrl}PrestasiPesertaDidik/${id}`;
    return this.http.delete(deleteUrl, {headers});
  }
  




  //----------------------------------------SARANA & PRASARANA----------------------------------
  loadDataSarpras(){
    return this.http.get<SaranaPrasarana[]>( this.baseUrl + 'SaranaPrasarana')
  }

  postSarpras(data: { namaruangan: string, jumlah: number, luasunit: number, kondisi: string, kebutuhan: number}): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    return this.http.post(this.baseUrl + 'SaranaPrasarana', data, {headers});
  }

  getSarprasId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}SaranaPrasarana/${id}`);
  }

  updateSarpras(id: number, data: any): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    return this.http.put<any>(`${this.baseUrl}SaranaPrasarana/${id}`, data, {headers});
  }


  deleteSarana(id: number): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });

    const deleteUrl = `${this.baseUrl}SaranaPrasarana/${id}`;
    return this.http.delete(deleteUrl, {headers});
  }

  GetSarana(){
    return this.http.get<any[]>( this.baseUrl + 'SaranaPrasarana');
  }


  //------------------------------------------KEGIATAN------------------------------------------------
  loadDataPkk(){
    return this.http.get( this.baseUrl + 'pkk')
  }

  tambahPkk(data: FormData) {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });

    return this.http.post(this.baseUrl + 'pkk', data, {headers});
  }

  deletePkk(id: number): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });

    const deleteUrl = `${this.baseUrl}Pkk/${id}`;
    return this.http.delete(deleteUrl, {headers});
  }

  loadStrukturBursa(){
    return this.http.get( this.baseUrl + 'StrukturBursaKerja')
  }

  getBursaId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}StrukturBursaKerja/${id}`);
  }

  updateBursa(id: number, data: FormData): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });

    return this.http.put<any>(`${this.baseUrl}StrukturBursaKerja/${id}`, data, {headers});
  } 






  loadDataBursaKerja(){
    return this.http.get( this.baseUrl +'BursaKerja')
  }

  //post bursa kerja
  PostBursaKerja(data: FormData): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });

    return this.http.post(this.baseUrl + 'BursaKerja', data, {headers});
  }


  getBursaKerja(id:any){
    return this.http.get( `${this.baseUrl}BursaKerja/${id}`)
  }
  imageBursaKerja(username:any, data:FormData): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });

    const UploadBerita = `${this.baseUrl}BursaKerja/TambahFoto/${username}`;
    return this.http.post(UploadBerita, data, {headers});
  }


  deleteimageBursaKerja(username:any ,id:any): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    return this.http.delete<any[]>(`${this.baseUrl}BursaKerja/DeleteFoto/${username}/${id}`, {headers});
  }


  editBursaKerja(id:any, data:FormData): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    const UploadBerita = `${this.baseUrl}BursaKerja/${id}`;
    return this.http.put(UploadBerita, data, {headers});
  }



  //delete bursa kerja
  deleteBursa(id: number): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    const deleteUrl = `${this.baseUrl}BursaKerja/${id}`;
    return this.http.delete(deleteUrl, {headers});
  }

  loadEkstrakulikuler(){
    return this.http.get( this.baseUrl +'Ekstrakulikuler')
  }

  PostEkskul(data: FormData): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    return this.http.post(this.baseUrl + 'Ekstrakulikuler', data, {headers});
  }

  loadEks(){
    return this.http.get<any[]>( this.baseUrl + 'Ekstrakulikuler');
  }

  getEkstrakulikuler(id:any){
    return this.http.get( `${this.baseUrl}Ekstrakulikuler/${id}`)
  }
  imageEkstrakulikuler(username:any, data:FormData): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });

    const UploadBerita = `${this.baseUrl}Ekstrakulikuler/TambahFoto/${username}`;
    return this.http.post(UploadBerita, data, {headers});
  }

  deleteimageEkstrakulikuler(username:any ,id:any): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    return this.http.delete<any[]>(`${this.baseUrl}Ekstrakulikuler/DeleteFoto/${username}/${id}`, {headers});

  }


  editEkstrakulikuler(id:any, data:FormData): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    const UploadBerita = `${this.baseUrl}Ekstrakulikuler/${id}`;
    return this.http.put(UploadBerita, data, {headers});
  }


//delete ekskul 
  deleteEkskul(id: number): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });

    const deleteUrl = `${this.baseUrl}Ekstrakulikuler/${id}`;
    return this.http.delete(deleteUrl, {headers});
  }

  loadTahundanFotoPPDB(){
    return this.http.get( this.baseUrl +'PPDB')
  }

  loadInformasiPPDB(){
    return this.http.get( this.baseUrl +'InformasiPpdb')
  }

  loadContactPPDB(){
    return this.http.get( this.baseUrl +'ContactPpdb')
  }

  loadLulusPPDB(){
    return this.http.get( this.baseUrl +'LulusPpdb/GetAll')
  }

  deleteAllLulusPPDB(): Observable<any> {
    return this.http.delete(`${this.baseUrl}LulusPpdb/DeleteAll`);
  }

  postLulusPPDB(data: any): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    return this.http.post(this.baseUrl + 'LulusPpdb', data, {headers});
  }

  postLulusSMK(data: any): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    return this.http.post(this.baseUrl + 'KelulusanSmk', data, {headers});
  }


  UploadSiswaPPDB(data:any){
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });

    const url =` ${this.baseUrl}LulusPpdb`;
    return this.http.post(url, data, {headers});   
  }
  UploadSiswaSMK(data:any){
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });

    const url =` ${this.baseUrl}KelulusanSmk`;
    return this.http.post(url, data, {headers});   
  }

  getLulusPPDBId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}LulusPpdb/${id}`);
  }

  updateLulusPPDB(id: number, data: any): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    return this.http.put<any>(`${this.baseUrl}LulusPPDB/${id}`, data, {headers});
  }

  deleteLulusPPDB(id: number): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    const deleteUrl = `${this.baseUrl}LulusPPDB/${id}`;
    return this.http.delete(deleteUrl, {headers});
  }

  loadLinkTelegram(){
    return this.http.get( this.baseUrl +'LinkTelegram')
  }

  getLinkTeleId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}LinkTelegram/${id}`);
  }
  
  loadVideoProfil2(): Observable<any> {
    return this.http.get<any>(this.baseUrl + `VideoProfil/1`);
  }

  simpanVideoProfil(data: any): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });

    return this.http.put<any>(`${this.baseUrl}VideoProfil/1`, data, {headers});
  }




  //anan
  getContack() {
    return this.http.get( `${this.baseUrl}ContactPpdb/1`)
  }
  getinfo() {
    return this.http.get( `${this.baseUrl}InformasiPpdb/1`)
  }
  setcontack(contact:any) {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });

    const url =` ${this.baseUrl}ContactPpdb/1`;
    return this.http.put(url, contact, {headers});
  }
  setinfo(contact:any) {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    const url = `${this.baseUrl}InformasiPpdb/1`;
    return this.http.put(url, contact, {headers});
  }
  
  getlulusanppdb(){
    return this.http.get( `${this.baseUrl}LulusPpdb/GetAll`)
  }
  DeleteLulusanppdb(id:any){
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });

    return this.http.delete( `${this.baseUrl}LulusPpdb/${id}`, {headers})
  }
  
  getlink(){
    return this.http.get( `${this.baseUrl}LinkTelegram`)
  }

  
  updateLinkTele(id: number, data: any): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    return this.http.put<any>(`${this.baseUrl}LinkTelegram/${id}`, data, {headers});
  }

  getlinkfotoDiagram(){
    return this.http.get(` ${this.baseUrl}FotoDiagramPPDB/1`)
  }

  loadDiagram(){
    return this.http.get<any[]>( this.baseUrl  + 'FotoDiagramPPDB')
  }
  
  Uploaddiagram(foto:FormData) {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    const url = `${this.baseUrl}FotoDiagramPPDB/1`;
    return this.http.put(url, foto, {headers});
  }
  
  fotosyarat(){
    return this.http.get( `${this.baseUrl}FotoSyaratPPDB`)
  }

  loadSyarat(){
    return this.http.get<any[]>( this.baseUrl + 'FotoSyaratPPDB');
  }

  updasyarat(id:any ,foto:FormData) {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    const url = `${this.baseUrl}FotoSyaratPPDB/${id}`;
    return this.http.put(url, foto, {headers});
  }


  //------------------------------------------Galeri------------------------------

  LoadPhotoGallery(): Observable<any> {
    return this.http.get(this.baseUrl + 'GaleriFoto');
  }
  //post
  uploadPhoto(formData: FormData): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    const uploadUrl = `${this.baseUrl}GaleriFoto`; // Sesuaikan dengan endpoint Anda
    return this.http.post(uploadUrl, formData, {headers});
  }
  

  //deleteFoto
  deletePhotoGallery(id: number): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    const deleteUrl = `${this.baseUrl}GaleriFoto/${id}`;
    return this.http.delete(deleteUrl, {headers});
  }

  LoadPhotoSekolah(){
    return this.http.get(this.baseUrl + 'GaleriFoto/namakegiatan?namakegiatan=Sekolah');
  }

  LoadPhotoKeagamaan(){
    return this.http.get(this.baseUrl + 'GaleriFoto/namakegiatan?namakegiatan=Keagamaan')
  }

  LoadPhotoUpacara(){
    return this.http.get(this.baseUrl + 'GaleriFoto/namakegiatan?namakegiatan=Upacara')
  }
  LoadPhotoKerjasamaIndustri(){
    return this.http.get(this.baseUrl + 'GaleriFoto/namakegiatan?namakegiatan=Kerjasama Industri')
  }

  LoadVideo(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'GaleriVideo');
  }

  //postvideo
  addVideoData(urlVideo: string): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });

    const addVideoUrl = `${this.baseUrl}GaleriVideo`;
    const body = { urlVideo };
    return this.http.post(addVideoUrl, body, {headers});
  }

  //deletevideo
  deleteVideoData(id: number): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    const deleteVideoUrl = `${this.baseUrl}GaleriVideo/${id}`;
    return this.http.delete(deleteVideoUrl, {headers});
  }




  //------------------------------------------Berita--------------------------------------
    LoadBeritas(): Observable<any[]> {
      return this.http.get<any[]>( this.baseUrl +'Berita/ByCategory/berita');
    }

      //post berita
    PostBerita(data: FormData): Observable<any> {
      const token = this.cookieService.get('userToken');
      const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
    });
      return this.http.post(this.baseUrl + 'berita', data, {headers});
    }


    getBerita(id:any){
      return this.http.get( `${this.baseUrl}Berita/${id}`)
    }
  
    imageberita(username:any, data:FormData): Observable<any> {
      const token = this.cookieService.get('userToken');
      const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
    });

      const UploadBerita = `${this.baseUrl}Berita/TambahFoto/${username}`;
      return this.http.post(UploadBerita, data, {headers});
    }
    getismain(username:any): Observable<any> {
      return this.http.get<any[]>(`${this.baseUrl}Berita/GetFotoUtamaByJudul/${username}`);
    }
    deleteimageberita(username:any, id:any): Observable<any> {
      const token = this.cookieService.get('userToken');
      const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
    });
      return this.http.delete<any[]>(`${this.baseUrl}Berita/DeleteFoto/${username}/${id}`, {headers});
    }
    editBerita(id:any, data:FormData): Observable<any> {
      const token = this.cookieService.get('userToken');
      const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
    });
      const UploadBerita = `${this.baseUrl}Berita/${id}`;
      return this.http.put(UploadBerita, data, {headers});
    }

    //deleteberita
    deleteBerita(id: number): Observable<any> {
      const token = this.cookieService.get('userToken');
      const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
    });
      const deleteUrl = `${this.baseUrl}Berita/${id}`;
      return this.http.delete(deleteUrl, {headers});
    }

    LoadPengumuman(): Observable<NewsItem[]> {
      return this.http.get<any[]>( this.baseUrl + 'Berita/ByCategory/pengumuman');
    }



  search(keyword: string): Observable<NewsItem[]>{
    const category = 'berita'; 
    return this.http.get<NewsItem[]>(this.baseUrl + `/Berita/search?keyword=${keyword}&category=${category}`)
  }
  
  loadGetBeritaByJudul(judul: string) {
    return this.http.get<NewsItem>( this.baseUrl + `Berita/ByJudul/${judul}`)
  }


// literasi
tambahFotoLiterasi(data: FormData) {
  const token = this.cookieService.get('userToken');
  const headers = new HttpHeaders({
Authorization: `Bearer ${token}`
});
  return this.http.post(this.baseUrl + 'Literacy', data, {headers});
}

loadFotoLiterasi() {
  return this.http.get(this.baseUrl + 'Literacy');
}

deleteLiterasi(id: number): Observable<any> {
  const token = this.cookieService.get('userToken');
  const headers = new HttpHeaders({
Authorization: `Bearer ${token}`
});
  const deleteUrl = `${this.baseUrl}Literacy/${id}`;
  return this.http.delete(deleteUrl, {headers});
}

  // contact
  postKontak(data: any, id: any) {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
  });
    return this.http.put(this.baseUrl + 'Contact/' + id, data, {headers});
  }

  getDataKontak() {
    return this.http.get(this.baseUrl + 'Contact');
  }


//bannerSlogan / fotohome
loadBannerHome(): Observable<ImageDatas[]> {
  return this.http.get<ImageDatas[]>( this.baseUrl + 'BannerSlogan');
}

BannerSlogan() {
  return this.http.get( this.baseUrl + 'BannerSlogan')
}
BannerSlogenUpload(id:any ,formData: FormData): Observable<any> {
  const token = this.cookieService.get('userToken');
  const headers = new HttpHeaders({
Authorization: `Bearer ${token}`
});
  const url = `${this.baseUrl}BannerSlogan/${id}`;
  return this.http.put(url, formData, {headers});
}

//------------------------------------------- Link Profil/Program Sekolah

linkProgram(): Observable<any> {
  return this.http.get(`https://smknegeri7batam-001-site1.ctempurl.com/api/VideoProfil/1`);
}
savelinkProgram(id:any): Observable<any> {
  const token = this.cookieService.get('userToken');
  const headers = new HttpHeaders({
Authorization: `Bearer ${token}`
});

  const url = `https://smknegeri7batam-001-site1.ctempurl.com/api/VideoProfil/1`;
  return this.http.put(url, id, {headers});
}








//acun




  
getKomen(judul: string): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}Berita/getkomen/${judul}`);
}

submitComment(commentData: any): Observable<any> {
  const url = `${this.baseUrl}Berita/Komentars`;
  const token = this.cookieService.get('userToken');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // Authorization: Bearer ${token}
  });
  return this.http.post(url, commentData,{
    responseType: 'text',
    // headers: headers,
  });
}


uploadKerjaSamaIDUKA(data: any, singkatan: any) {
  
  const token = this.cookieService.get('userToken');
          const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

  const url =  `${this.baseUrl}Jurusan/add-kerjasama/${singkatan}`;
  return this.http.post(url, data, {headers});
}

getismainBursaKerja(judul:any){
  return this.http.get<any[]>(`${this.baseUrl}BursaKerja/GetFotoUtamaByJudul/${judul}`);
}


//cek kelulusan kelas 12



postSiswaLulus(data: any): Observable<any> {
  const token = this.cookieService.get('userToken');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  return this.http.post(this.baseUrl + 'kelulusansmk', data, { headers });
}

UploadSiswaLulus(data: any) {
  const token = this.cookieService.get('userToken');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  return this.http.post(this.baseUrl + 'kelulusansmk', data, { headers });
}

GetSiswaLulus() {
  return this.http.get<Count[]>(this.baseUrl + 'kelulusansmk');
}

getSiswaLulusId(id: any): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}kelulusansmk/${id}`);
}

UpdateSiswaLulus(id: any, data: any) {
  const token = this.cookieService.get('userToken');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  return this.http.put(this.baseUrl + 'kelulusansmk/' + id, data, {
    headers,
  });
}

deleteSiswaLulus(id: number): Observable<any> {
  const token = this.cookieService.get('userToken');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  return this.http.delete(this.baseUrl + 'kelulusansmk/' + id, { headers });
}

getSiswaLulusHasil(data: any): Observable<any> {
  return this.http.post(this.baseUrl + 'kelulusansmk/hasil', data);
}


}