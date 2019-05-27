import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DemandeTirage} from "../models/demandeTirage";
import {Enseignemant} from "../models/enseignemant";

@Injectable({
  providedIn: 'root'
})
export class DemandetirageService {

  constructor(private http: HttpClient) {
  }
  public getAlldemandeTiragebyuser(username: string){
    return this.http.get('http://127.0.0.1:8080/demandeTirage/user/'+username);

  }
  public adddemandeTirage(enseignement: Enseignemant,file:any) {
    const uri = 'http://127.0.0.1:8080/demandeTirage/'+file;


    this.http.post(uri, enseignement).subscribe(res => console.log('done'));
  }

  getAlldemandeTirage() {
    return this.http.get('http://127.0.0.1:8080/demandeTirage');
  }


  deletedemandeTirage(id) {
    const url = 'http://127.0.0.1:8080/demandeTirage/' + id;
    return this.http.delete(url);
  }
  updatedemandeTirage(demandeTirage: DemandeTirage,ens:any,grp:any,file:any) {
    const url = 'http://127.0.0.1:8080/demandeTirage/' + demandeTirage.id+'/'+ens+'/'+grp+'/'+file;
    return this.http.put(url , demandeTirage);
  }
  getdemandeTirage(id) {
    const url = 'http://127.0.0.1:8080/demandeTirage/' + id;
    return this.http.get(url);
  }

  impressiondemandeTirage(){

    return this.http.get('http://127.0.0.1:8080/Liste',{responseType:'blob' })
      .map((blob:Blob)=>{
        console.log('report is downloaded');
        var file=new Blob([blob],{type:'application/pdf'});
        var fileUrl=URL.createObjectURL(file);
        window.open(fileUrl);


      });
  }
  getHistorydemandeTirage(){
    return this.http.get('http://127.0.0.1:8080/demandeTirage/history');

  }


  getensdemande(ann:any,sem:any,username:any){
    return this.http.get('http://127.0.0.1:8080/demandeTirage/enseignement/'+ann+'/'+sem+'/'+username);

  }
 getgroup(mat:any){
    return this.http.get('http://127.0.0.1:8080/demandeTirage/matiere/'+mat);

  }


}
