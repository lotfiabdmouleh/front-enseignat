import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Enseignant} from "../models/enseignant";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {SignUpInfo} from "../auth/signup-info";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {

  constructor(private http: HttpClient) {
  }


  getAllenseignants() {
    return this.http.get('http://127.0.0.1:8080/enseignant');
  }


  deleteenseignant(id) {
    const url = 'http://127.0.0.1:8080/enseignant/' + id;
    return this.http.delete(url);
  }
  updateEnseignant(enseignant: Enseignant) {
    const url = 'http://127.0.0.1:8080/enseignant/' + enseignant.id;
    return this.http.put(url , enseignant);
  }
  getEnseignant(id) {
    const url = 'http://127.0.0.1:8080/enseignant/' + id;
    return this.http.get(url);
  }
  getDemande(date:any){
    return this.http.get('http://127.0.0.1:8080/enseignemant/demande/'+date);

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
  signUp(info: SignUpInfo): Observable<string> {
    const uri = 'http://127.0.0.1:8080/enseignant';

    return this.http.post<string>(uri, info, httpOptions);
  }
}
