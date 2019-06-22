import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Departement} from "../models/departement";

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  constructor(private http: HttpClient) {
  }

  public adddepartement(departement: Departement) {
    const uri = 'http://127.0.0.1:8080/departement';


   return this.http.post(uri, departement);
  }

  getAlldepartement() {
    return this.http.get('http://127.0.0.1:8080/departement');
  }


  deletedepartement(id) {
    const url = 'http://127.0.0.1:8080/departement/' + id;
    return this.http.delete(url);
  }
  updatedepartement(departement: Departement) {
    const url = 'http://127.0.0.1:8080/departement/' + departement.id;
    return this.http.put(url , departement);
  }
  getdepartement(id) {
    const url = 'http://127.0.0.1:8080/departement/' + id;
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
    return this.http.get('http://127.0.0.1:8080/departement/history');

  }

}
