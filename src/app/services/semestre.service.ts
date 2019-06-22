import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Semester} from "../models/semestre";

@Injectable({
  providedIn: 'root'
})
export class SemestreService {

  constructor(private http: HttpClient) {
  }

  public addsemestre(semestre: Semester) {
    const uri = 'http://127.0.0.1:8080/semestre';


    return this.http.post(uri, semestre);
  }

  getAllsemestre() {
    return this.http.get('http://127.0.0.1:8080/semestre');
  }


  deleteSemestre(id) {
    const url = 'http://127.0.0.1:8080/semestre/' + id;
    return this.http.delete(url);
  }
  updateSemestre(semestre: Semester) {
    const url = 'http://127.0.0.1:8080/semestre/' + semestre.id;
    return this.http.put(url , semestre);
  }
  getSemestre(id) {
    const url = 'http://127.0.0.1:8080/semestre/' + id;
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
    return this.http.get('http://127.0.0.1:8080/semestre/history');

  }

}
