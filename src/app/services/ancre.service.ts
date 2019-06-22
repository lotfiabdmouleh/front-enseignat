import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Ancre} from "../models/ancre";

@Injectable({
  providedIn: 'root'
})
export class AncreService {

  constructor(private http: HttpClient) {
  }

  public addAncre(ancre: Ancre) {
    const uri = 'http://127.0.0.1:8080/ancre';


   return this.http.post(uri, ancre);
  }

  getAllAncre() {
    return this.http.get('http://127.0.0.1:8080/ancre');
  }


  deleteAncre(id) {
    const url = 'http://127.0.0.1:8080/ancre/' + id;
    return this.http.delete(url);
  }
  updateAncre(ancre: Ancre) {
    const url = 'http://127.0.0.1:8080/ancre/' + ancre.id;
    return this.http.put(url , ancre);
  }
  getAncre(id) {
    const url = 'http://127.0.0.1:8080/ancre/' + id;
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
    return this.http.get('http://127.0.0.1:8080/ancre/history');

  }


}
