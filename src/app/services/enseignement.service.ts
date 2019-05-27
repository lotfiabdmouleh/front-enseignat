import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Enseignemant} from "../models/enseignemant";

@Injectable({
  providedIn: 'root'
})
export class EnseignementService {


  constructor(private http: HttpClient) {
  }

  public addenseignemant(enseignemant: Enseignemant,dep:any,ens:any,grp:any,mat:any,sem:any,annee:any) {
    const uri = 'http://127.0.0.1:8080/enseignemant/'+dep+'/'+ens+'/'+grp+'/'+mat+'/'+sem+'/'+annee;


    this.http.post(uri, enseignemant).subscribe(res => console.log('done'));
  }

  getAllenseignemant() {
    return this.http.get('http://127.0.0.1:8080/enseignemant');
  }
  getenseignementbyuser(id:any){
    return this.http.get('http://127.0.0.1:8080/enseignemant/user/'+id);

  }

  deleteenseignemant(id) {
    const url = 'http://127.0.0.1:8080/enseignemant/' + id;
    return this.http.delete(url);
  }
  updateenseignemant(enseignemant: Enseignemant,dep:any,ens:any,grp:any,mat:any,sem:any,annee:any) {
    const url = 'http://127.0.0.1:8080/enseignemant/' + enseignemant.id+'/'+dep+'/'+ens+'/'+grp+'/'+mat+'/'+sem+'/'+annee;
    return this.http.put(url , enseignemant);
  }
  getdenseignemant(id) {
    const url = 'http://127.0.0.1:8080/enseignemant/' + id;
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
    return this.http.get('http://127.0.0.1:8080/enseignemant/history');

  }

}
