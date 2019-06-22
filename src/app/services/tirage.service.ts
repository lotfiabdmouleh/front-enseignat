import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Tirage} from "../models/tirage";
import {DemandeTirage} from "../models/demandeTirage";

@Injectable({
  providedIn: 'root'
})
export class TirageService {

  constructor(private http: HttpClient) {
  }

  public addtirage(tirage: DemandeTirage,agent:any,papier:any,ph:any) {
    const uri = 'http://127.0.0.1:8080/tirage/'+agent+'/'+papier+'/'+ph;


    this.http.post(uri, tirage);
  }
  modFile(file:string,id:any){
    const uri = 'http://127.0.0.1:8080/tirage/file/'+id;


    this.http.post(uri, file).subscribe();
  }
  getdemande(){
    return this.http.get('http://127.0.0.1:8080/tirage/demande');
  }
  getdemandevalider(){
    return this.http.get('http://127.0.0.1:8080/tirage/demandevalider');
  }
  getAlltirage() {
    return this.http.get('http://127.0.0.1:8080/tirage');
  }


  deletetirage(id) {
    const url = 'http://127.0.0.1:8080/tirage/' + id;
    return this.http.delete(url);
  }
  updatirage(tirage: Tirage) {
    const url = 'http://127.0.0.1:8080/tirage/' + tirage.id;
    return this.http.put(url , tirage);
  }
  gettirage(id) {
    const url = 'http://127.0.0.1:8080/tirage/' + id;
    return this.http.get(url);
  }
  getHistory(){
    return this.http.get('http://127.0.0.1:8080/tirage/history');

  }

  impression(file:any){

    return this.http.get('http://127.0.0.1:8080/post/print/'+file,{responseType:'blob' })
      .map((blob:Blob)=>{
         var file=new Blob([blob],{type:'application/pdf'});
        var fileUrl=URL.createObjectURL(file);
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = fileUrl;
        document.body.appendChild(iframe);
        iframe.contentWindow.print();

      });
  }

}
