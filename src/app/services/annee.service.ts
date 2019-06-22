import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Annee} from "../models/annee";

@Injectable({
  providedIn: 'root'
})
export class AnneeService {

  constructor(private http: HttpClient) {
  }

  public addAnnee(annee: Annee) {
    const uri = 'http://127.0.0.1:8080/annee';


    return this.http.post(uri, annee);
  }

  getAllAnnee() {
    return this.http.get('http://127.0.0.1:8080/annee');
  }


  deleteAnnee(id) {
    const url = 'http://127.0.0.1:8080/annee/' + id;
    return this.http.delete(url);
  }
  updateAnnee(annee: Annee) {
    const url = 'http://127.0.0.1:8080/annee/' + annee.id;
    return this.http.put(url , annee);
  }
  getAnnee(id) {
    const url = 'http://127.0.0.1:8080/annee/' + id;
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
    return this.http.get('http://127.0.0.1:8080/annee/history');

  }

}
