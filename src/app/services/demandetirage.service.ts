import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DemandeTirage} from "../models/demandeTirage";

@Injectable({
  providedIn: 'root'
})
export class DemandetirageService {

  constructor(private http: HttpClient) {
  }

  public addAncre(demandeTirage: DemandeTirage) {
    const uri = 'http://127.0.0.1:8080/demandeTirage';


    this.http.post(uri, demandeTirage).subscribe(res => console.log('done'));
  }

  getAlldemandeTirage() {
    return this.http.get('http://127.0.0.1:8080/demandeTirage');
  }


  deletedemandeTirage(id) {
    const url = 'http://127.0.0.1:8080/demandeTirage/' + id;
    return this.http.delete(url);
  }
  updatedemandeTirage(demandeTirage: DemandeTirage) {
    const url = 'http://127.0.0.1:8080/demandeTirage/' + demandeTirage.id;
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


}
