export enum Usertype {
  ADMIN,
  USER,
}

export interface User {
  id: number;
  Username: string;
  Email: string;
  Password: string;
  newPassword: string;
  Image: string;
  usertype: Usertype;
  kode: string;
}

export interface Blog {
  id:number;
  judul:string;
  subJudul: string;
  tikTok:string;
  x:string;
  instagram:string;
  facebook:string;
  isi: string;
  fotos: { url: string; isMain: boolean; }[];
  quotes: string;
  tanggal: string;
  categoryBlog: string;
username :string;
picture:string;
jurusan: string;
templateId: number;
}

export interface Tokens {
  id :string;
  username: string;
  picture: string;
  token: string;
}


export interface NewsItem {
  id: number;
  category: string;
  judul: string;
  tanggal: string;
  isi: string;
  foto: { id: number, url: string, isMain: boolean }[];
  hashtag : string
}

export interface Comment {
  nama: string;
  email: string;
  keteranganKomentars: string;
}

export interface Email {
  body :string;
  subject: string;
  fromEmail: string;
}

export interface ItemData {
  name: string;
  age: number;
  address: string;
}

export interface komentars {
nama : string;
email : string;
keterangankomentars : string;
}

export interface NewsItem {
  id: number;
  category: string;
  judul: string;
  tanggal: string;
  isi: string;
  foto: { id: number; url: string; isMain: boolean }[];
  hashtag: string;
}

export interface Categorys {
  id: number;
  categoryBlog: string;
}



