import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Photocopieur} from "../models/photocopieur";

@Injectable({
  providedIn: 'root'
})
export class PhotocopieurService {


  constructor(private http: HttpClient) {
  }

  public addphotocopieur(photocopieur: Photocopieur) {
    const uri = 'http://127.0.0.1:8080/photocopieur';


   return this.http.post(uri, photocopieur);
  }


   getAllphotocopieur() {
    return this.http.get('http://127.0.0.1:8080/photocopieur');
  }


  deletephotocopieur(id) {
    const url = 'http://127.0.0.1:8080/photocopieur/' + id;
    return this.http.delete(url);
  }
  updatephotocopieur(photocopieur: Photocopieur) {
    const url = 'http://127.0.0.1:8080/photocopieur/' + photocopieur.id;
    return this.http.put(url , photocopieur);
  }
  getphotocopieur(id) {
    const url = 'http://127.0.0.1:8080/photocopieur/' + id;
    return this.http.get(url);
  }
  getnb(id) {
    const url = 'http://127.0.0.1:8080/photocopieur/getnb/' + id;
    return this.http.get(url);
  }

  getPhLine(id) {
    const url = 'http://127.0.0.1:8080/photocopieur/getphline/' + id;
    return this.http.get(url);
  }

  impression(){

    return this.http.get('http://127.0.0.1:8080/Liste',{responseType:'blob' })
      .map((blob:Blob)=>{
         var file=new Blob([blob],{type:'application/pdf'});
        var fileUrl=URL.createObjectURL(file);
        window.open(fileUrl);


      });
  }
  getHistory(){
    return this.http.get('http://127.0.0.1:8080/photocopieur/history');

  }
}
