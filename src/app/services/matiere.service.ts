import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Matiere} from "../models/matiere";

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  constructor(private http: HttpClient) {
  }

  public addmatiere(matiere: Matiere) {
    const uri = 'http://127.0.0.1:8080/matiere';


   return this.http.post(uri, matiere);
  }

  getAllmatiere() {
    return this.http.get('http://127.0.0.1:8080/matiere');
  }


  deletematiere(id) {
    const url = 'http://127.0.0.1:8080/matiere/' + id;
    return this.http.delete(url);
  }
  updatematiere(matiere: Matiere) {
    const url = 'http://127.0.0.1:8080/matiere/' + matiere.id;
    return this.http.put(url , matiere);
  }
  getmatiere(id) {
    const url = 'http://127.0.0.1:8080/matiere/' + id;
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
    return this.http.get('http://127.0.0.1:8080/matiere/history');

  }
}
