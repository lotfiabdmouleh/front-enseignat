import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Tirage} from "../models/tirage";
import {Enseignant} from "../models/enseignant";
import {DemandeTirage} from "../models/demandeTirage";

@Injectable({
  providedIn: 'root'
})
export class TirageService {

  constructor(private http: HttpClient) {
  }

  public addtirage(tirage: DemandeTirage,agent:any,papier:any,ph:any) {
    const uri = 'http://127.0.0.1:8080/tirage/'+agent+'/'+papier+'/'+ph;


    this.http.post(uri, tirage).subscribe(res => console.log('done'));
  }
  modFile(file:string,id:any){
    const uri = 'http://127.0.0.1:8080/tirage/file/'+id;


    this.http.post(uri, file).subscribe(res => console.log('done'));
  }
  getdemande(){
    return this.http.get('http://127.0.0.1:8080/tirage/demande');
  }
  getAlltirage() {
    return this.http.get('http://127.0.0.1:8080/tirage');
  }


  deletetirage(id) {
    const url = 'http://127.0.0.1:8080/tirage/' + id;
    return this.http.delete(url);
  }
  updatirage(tirage: Tirage) {
    const url = 'http://127.0.0.1:8080/tirage/' + tirage.id;
    return this.http.put(url , tirage);
  }
  gettirage(id) {
    const url = 'http://127.0.0.1:8080/tirage/' + id;
    return this.http.get(url);
  }
  getHistory(){
    return this.http.get('http://127.0.0.1:8080/tirage/history');

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

}
