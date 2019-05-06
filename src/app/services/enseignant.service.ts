import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Enseignant} from "../models/enseignant";

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {

  constructor(private http: HttpClient) {
  }

  public addenseignant(enseignant: Enseignant) {
    const uri = 'http://127.0.0.1:8080/enseignant';


    this.http.post(uri, enseignant).subscribe(res => console.log('done'));
  }

  getAllenseignants() {
    return this.http.get('http://127.0.0.1:8080/enseignant');
  }


  deleteenseignant(id) {
    const url = 'http://127.0.0.1:8080/enseignant/' + id;
    return this.http.delete(url);
  }
  updatedivers(enseignant: Enseignant) {
    const url = 'http://127.0.0.1:8080/divers/' + enseignant.id;
    return this.http.put(url , enseignant);
  }
  getdivers(id) {
    const url = 'http://127.0.0.1:8080/enseignant/' + id;
    return this.http.get(url);
  }

  impression(){

    return this.http.get('http://127.0.0.1:8080/Liste',{responseType:'blob' })
      .map((blob:Blob)=>{
        console.log('report is downloaded');
        var file=new Blob([blob],{type:'application/pdf'});
        var fileUrl=URL.createObjectURL(file);
        window.open(fileUrl);


      });
  }
  getHistory(){
    return this.http.get('http://127.0.0.1:8080/enseignant/history');

  }

}
