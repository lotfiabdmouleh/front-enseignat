import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Papier} from "../models/papier";

@Injectable({
  providedIn: 'root'
})
export class PapierService {

  constructor(private http: HttpClient) {
  }

  public addpapier(papier: Papier) {
    const uri = 'http://127.0.0.1:8080/papier';


    this.http.post(uri, papier).subscribe(res => console.log('done'));
  }

  getAllpapier() {
    return this.http.get('http://127.0.0.1:8080/papier');
  }


  deletepapier(id) {
    const url = 'http://127.0.0.1:8080/papier/' + id;
    return this.http.delete(url);
  }
  updatepapier(papier: Papier) {
    const url = 'http://127.0.0.1:8080/papier/' + papier.id;
    return this.http.put(url , papier);
  }
  getpapier(id) {
    const url = 'http://127.0.0.1:8080/papier/' + id;
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
    return this.http.get('http://127.0.0.1:8080/papier/history');

  }
}
