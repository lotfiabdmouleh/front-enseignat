import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Groupe} from "../models/groupe";

@Injectable({
  providedIn: 'root'
})
export class GroupeService {


  constructor(private http: HttpClient) {
  }

  public addgroupe(groupe: Groupe) {
    const uri = 'http://127.0.0.1:8080/groupe';


   return this.http.post(uri, groupe);
  }

  getAllgroupe() {
    return this.http.get('http://127.0.0.1:8080/groupe');
  }


  deletegroupe(id) {
    const url = 'http://127.0.0.1:8080/groupe/' + id;
    return this.http.delete(url);
  }
  updategroupe(groupe: Groupe) {
    const url = 'http://127.0.0.1:8080/groupe/' + groupe.id;
    return this.http.put(url , groupe);
  }
  getgroupe(id) {
    const url = 'http://127.0.0.1:8080/groupe/' + id;
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
    return this.http.get('http://127.0.0.1:8080/groupe/history');

  }

}
