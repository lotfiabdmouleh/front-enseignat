import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Recharge} from "../models/recharge";
import {Intervention} from "../models/intervention";

@Injectable({
  providedIn: 'root'
})
export class InterventionService {


  constructor(private http: HttpClient) {
  }

  public addinter(inter: Intervention,ph:any) {
    const uri = 'http://127.0.0.1:8080/intervention/'+ph;


    this.http.post(uri, inter).subscribe(res => console.log('done'));
  }

  getAllinterventions() {
    return this.http.get('http://127.0.0.1:8080/intervention');
  }


  deleteInter(id) {
    const url = 'http://127.0.0.1:8080/recharge/' + id;
    return this.http.delete(url);
  }
  updaterecharge(inter: Intervention,ph:any) {
    const url = 'http://127.0.0.1:8080/intervention/' + inter.id+'/'+ph;
    return this.http.put(url , inter);
  }
  getInter(id) {
    const url = 'http://127.0.0.1:8080/intervention/' + id;
    return this.http.get(url);
  }
  getHistory(){
    return this.http.get('http://127.0.0.1:8080/intervention/history');

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
