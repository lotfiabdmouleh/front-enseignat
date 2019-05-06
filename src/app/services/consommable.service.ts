import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Consommable} from "../models/consommable";

@Injectable({
  providedIn: 'root'
})
export class ConsommableService {

  constructor(private http: HttpClient) {
  }

  public addAncre(consommable: Consommable) {
    const uri = 'http://127.0.0.1:8080/consommable';


    this.http.post(uri, consommable).subscribe(res => console.log('done'));
  }

  getAllConsommable() {
    return this.http.get('http://127.0.0.1:8080/consommable');
  }


  deleteConsommable(id) {
    const url = 'http://127.0.0.1:8080/consommable/' + id;
    return this.http.delete(url);
  }
  updateConsommable(consommable: Consommable) {
    const url = 'http://127.0.0.1:8080/consommable/' + consommable.id;
    return this.http.put(url , consommable);
  }
  getConsommable(id) {
    const url = 'http://127.0.0.1:8080/consommable/' + id;
    return this.http.get(url);
  }

  impressionConsommable(){

    return this.http.get('http://127.0.0.1:8080/Liste',{responseType:'blob' })
      .map((blob:Blob)=>{
        console.log('report is downloaded');
        var file=new Blob([blob],{type:'application/pdf'});
        var fileUrl=URL.createObjectURL(file);
        window.open(fileUrl);


      });
  }
  getHistoryConsommable(){
    return this.http.get('http://127.0.0.1:8080/consommable/history');

  }


}
