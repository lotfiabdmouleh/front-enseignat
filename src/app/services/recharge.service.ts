import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Recharge} from "../models/recharge";

@Injectable({
  providedIn: 'root'
})
export class RechargeService {


  constructor(private http: HttpClient) {
  }

  public addrecharge(recharge: Recharge,ph:any,an:any) {
    const uri = 'http://127.0.0.1:8080/recharge/'+ph+'/'+an;


   return this.http.post(uri, recharge);
  }

  getAllrecharge() {
    return this.http.get('http://127.0.0.1:8080/recharge');
  }


  deleterecharge(id) {
    const url = 'http://127.0.0.1:8080/recharge/' + id;
    return this.http.delete(url);
  }
  updaterecharge(recharge: Recharge,ph:any,an:any) {
    const url = 'http://127.0.0.1:8080/recharge/' + recharge.id+'/'+ph+'/'+an;
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
         var file=new Blob([blob],{type:'application/pdf'});
        var fileUrl=URL.createObjectURL(file);
        window.open(fileUrl);


      });
  }

}
