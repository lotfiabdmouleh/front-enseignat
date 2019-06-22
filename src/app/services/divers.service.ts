import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Divers} from "../models/divers";

@Injectable({
  providedIn: 'root'
})
export class DiversService {

  constructor(private http: HttpClient) {
  }

  public addDivers(divers: Divers) {
    const uri = 'http://127.0.0.1:8080/divers';


 return   this.http.post(uri, divers);
  }

  getAlldivers() {
    return this.http.get('http://127.0.0.1:8080/divers');
  }


  deletedivers(id) {
    const url = 'http://127.0.0.1:8080/divers/' + id;
    return this.http.delete(url);
  }
  updatedivers(divers: Divers) {
    const url = 'http://127.0.0.1:8080/divers/' + divers.id;
    return this.http.put(url , divers);
  }
  getdivers(id) {
    const url = 'http://127.0.0.1:8080/divers/' + id;
    return this.http.get(url);
  }

  impression(){

    return this.http.get('http://127.0.0.1:8080/Liste',{responseType:'blob' })
      .map((blob:Blob)=>{
         var file=new Blob([blob],{type:'application/pdf'});
        var fileUrl=URL.createObjectURL(file);
        window.open(fileUrl);


      });
  }
  getHistory(){
    return this.http.get('http://127.0.0.1:8080/divers/history');

  }

}
