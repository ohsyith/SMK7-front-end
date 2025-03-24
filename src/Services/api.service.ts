import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {BehaviorSubject, Observable} from 'rxjs'
import { map } from 'rxjs/operators';
import { Blog, Email, NewsItem, Tokens, User } from 'src/Model/Model';
import { JwtHelperService } from '@auth0/angular-jwt';

import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //https://smknegeri7batam-001-site1.ctempurl.com/api
  baseurlAccount = 'https://smknegeri7batam-001-site1.ctempurl.com/api/AccountBlog/'; //https://maganginforsys-001-site1.anytempurl.com/api/AccountBlog/
  baseurlBlog = 'https://smknegeri7batam-001-site1.ctempurl.com/api/Blog/'; //https://maganginforsys-001-site1.anytempurl.com/api/Blog/
  baseurlBerita = 'https://smknegeri7batam-001-site1.ctempurl.com/api/Berita/';   //https://maganginforsys-001-site1.anytempurl.com/api/Berita/
  private currentUser: BehaviorSubject<Tokens | null> = new BehaviorSubject<Tokens | null>(null);
  cuurentuser$ =this.currentUser.asObservable();
  isLoggedIn = false;
  constructor(private http: HttpClient,private cookieService: CookieService,private jwtHelper: JwtHelperService) {
    this.isLoggedIn = this.checkLoggedIn();
  }

  getUserInformationCount(): Observable<number> {
    return this.http.get<number>(this.baseurlAccount + 'GetUserInformationCount');
  }


  getVisitors(): Observable<number> {
    return this.http.get<number>(this.baseurlAccount + 'visitor');
  }
  deleteBlogById(id: number): Observable<any> {
    const url = `${this.baseurlBlog}Deletes/${id}`;
    return this.http.delete<any>(url);
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



   this.cookieService.set('^a*B`TeVerlDn+8SP>+"Ad_{z/J;k[C%%GC4h6VV_;z8^.[kq~-JbFM{Y?{j',encryptedId,7,'/',undefined,true,'Strict')
          this.cookieService.set('userToken', response.token,7,'/',undefined,true,'Strict');
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
    formData.append('picture', updates.picture);
    formData.append('username', updates.username);
    formData.append('jurusan', updates.jurusan);
    formData.append('instagram', updates.instagram);
    formData.append('x', updates.x);
    formData.append('facebook', updates.facebook);
    formData.append('tikTok', updates.tikTok);



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

  createBlog(blogData: any): Observable<any> {
    return this.http.post<any>(`${this.baseurlBlog}MakingBlog`, blogData);
  }


  takesbloguser(): Observable<Blog[]>{

    const encryptedId = this.cookieService.get('^a*B`TeVerlDn+8SP>+"Ad_{z/J;k[C%%GC4h6VV_;z8^.[kq~-JbFM{Y?{j');
    const decryptedId = CryptoJS.AES.decrypt(encryptedId, '.A|rK7w8nW*56p*HVLv^E=NK]Z,WpZJeQC6wFZR9wT8RPW8wcHiOr2RS4LvmdiOud2Hnceu').toString(CryptoJS.enc.Utf8);
    const token = this.cookieService.get('userToken');
    const url = `${this.baseurlBlog}Takesblog/${decryptedId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Blog[]>(url,{headers}).pipe(
      map(response => response)
    );
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




  Verification(token: string): Observable<string> {
    const url = `${this.baseurlAccount + 'verifikasi'}?token=${token}`;
    return this.http.get(url, { responseType: 'text' }) as Observable<string>;
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


  submitComment(commentData: any): Observable<any> {
    const url = `${this.baseurlBerita}Komentars`;
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return this.http.post(url, commentData,{
      responseType: 'text',
      headers: headers,
    });
  }
  getAllBlogs(): Observable<Blog[]> {
    const url = `${this.baseurlBlog}GetallBlog`;
    return this.http.get<Blog[]>(url)
      .pipe(
        map(response => response)
      );
  }

  getBlogByJudul(judul: string,id : any): Observable<Blog> {
    const url = `${this.baseurlBlog}Takeslog/${judul}/${id}`;
    return this.http.get<Blog>(url);
  }

  LoadBeritas(): Observable<any[]> {
    return this.http.get<any[]>( this.baseurlBerita +'ByCategory/berita');
  }

  GetCategory(): Observable<any>{
    return this.http.get<any>(this.baseurlBlog +'TakeBlogcat')
  }
  LoadPengumuman(): Observable<NewsItem[]> {
    return this.http.get<any[]>( this.baseurlBerita + 'ByCategory/pengumuman');
  }

  search(keyword: string): Observable<NewsItem[]>{
    const category = 'berita';
    return this.http.get<NewsItem[]>(this.baseurlBerita + `search?keyword=${keyword}&category=${category}`)
  }

  loadGetBeritaByJudul(judul: string) {
    return this.http.get<NewsItem>( this.baseurlBerita + `ByJudul/${judul}`)
  }

  getKomen(judul: string): Observable<any> {
    return this.http.get<any>(`${this.baseurlBerita}getkomen/${judul}`);
  }






}
