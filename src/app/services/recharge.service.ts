import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Recharge} from "../models/recharge";

@Injectable({
  providedIn: 'root'
})
export class RechargeService {


  constructor(private http: HttpClient) {
  }

  public addrecharge(recharge: Recharge) {
    const uri = 'http://127.0.0.1:8080/recharge';


    this.http.post(uri, recharge).subscribe(res => console.log('done'));
  }

  getAllrecharge() {
    return this.http.get('http://127.0.0.1:8080/recharge');
  }


  deleterecharge(id) {
    const url = 'http://127.0.0.1:8080/recharge/' + id;
    return this.http.delete(url);
  }
  updaterecharge(recharge: Recharge) {
    const url = 'http://127.0.0.1:8080/recharge/' + recharge.id;
    return this.http.put(url , recharge);
  }
  getrecharge(id) {
    const url = 'http://127.0.0.1:8080/recharge/' + id;
    return this.http.get(url);
  }
  getHistory(){
    return this.http.get('http://127.0.0.1:8080/recharge/history');

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
