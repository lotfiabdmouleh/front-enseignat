import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {DemandeTirage} from "../models/demandeTirage";
import {Enseignemant} from "../models/enseignemant";

@Injectable({
  providedIn: 'root'
})
export class DemandetirageService {

  constructor(private http: HttpClient) {
  }
  public getAlldemandeTiragebyuser(username: string){
    return this.http.get('http://127.0.0.1:8080/demandeTirage/user/'+username);

  }
  public adddemandeTirage(enseignement: Enseignemant,file:any) {
    const uri = 'http://127.0.0.1:8080/demandeTirage/'+file;


   return this.http.post(uri, enseignement);
  }



  deletedemandeTirage(id) {
    const url = 'http://127.0.0.1:8080/demandeTirage/' + id;
    return this.http.delete(url);
  }
  updatedemandeTirage(demandeTirage: DemandeTirage,ens:any,grp:any,file:any) {
    const url = 'http://127.0.0.1:8080/demandeTirage/' + demandeTirage.id+'/'+ens+'/'+grp+'/'+file;
    return this.http.put(url , demandeTirage);
  }
  getdemandeTirage(id) {
    const url = 'http://127.0.0.1:8080/demandeTirage/' + id;
    return this.http.get(url);
  }
  getNbCopieParDep(id) {
    const url = 'http://127.0.0.1:8080/demandeTirage/nbrcopie/' + id;
    return this.http.get(url);
  }
  getNbCopieDep() {
    const url = 'http://127.0.0.1:8080/demandeTirage/nbrcopiedep' ;
    return this.http.get(url);
  }

  getNbCopieEns() {
    const url = 'http://127.0.0.1:8080/demandeTirage/nbrcopieens' ;
    return this.http.get(url);
  }
  getNbCopieEnsParDate(dated:string,datefin:string) {
    let params = new HttpParams().set("paramName",dated).set("paramName2", datefin); //Create new HttpParams

    const url = 'http://127.0.0.1:8080/demandeTirage/date' ;
    return this.http.get(url,{params:params});
  }

  getNbCopieDepParDate(dated:string,datefin:string) {
    let params = new HttpParams().set("paramName",dated).set("paramName2", datefin); //Create new HttpParams

    const url = 'http://127.0.0.1:8080/demandeTirage/date/dep' ;
    return this.http.get(url,{params:params});
  }
  getNbCopieMatParDate(dated:string,datefin:string) {
    let params = new HttpParams().set("paramName",dated).set("paramName2", datefin); //Create new HttpParams

    const url = 'http://127.0.0.1:8080/demandeTirage/date/mat' ;
    return this.http.get(url,{params:params});
  }
  ImpRapEnsDate(dated:string,datefin:string,rap) {
    let params = new HttpParams().set("paramName",dated).set("paramName2", datefin); //Create new HttpParams

    const url = 'http://127.0.0.1:8080/Liste/'+rap ;

    return this.http.get(url,{responseType:'blob' ,params:params})
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




  getNbCopieMat() {
    const url = 'http://127.0.0.1:8080/demandeTirage/nbrcopiemat' ;
    return this.http.get(url);
  }

  impressiondemandeTirage(){

    return this.http.get('http://127.0.0.1:8080/Liste',{responseType:'blob' })
      .map((blob:Blob)=>{
         var file=new Blob([blob],{type:'application/pdf'});
        var fileUrl=URL.createObjectURL(file);
        window.open(fileUrl);


      });
  }


}
