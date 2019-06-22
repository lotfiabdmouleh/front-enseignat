import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AgentTirage} from "../models/agentTirage";
import {SignUpInfo} from "../auth/signup-info";
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AgenttirageService {

  constructor(private http: HttpClient) {
  }


  getAllAgentTirage() {
    return this.http.get('http://127.0.0.1:8080/agentTirage');
  }


  deleteAgentTirage(id) {
    const url = 'http://127.0.0.1:8080/agentTirage/' + id;
    return this.http.delete(url);
  }
  updateAgentTirage(agent: AgentTirage) {
    const url = 'http://127.0.0.1:8080/agentTirage/' + agent.id;
    return this.http.put(url , agent);
  }
  getAgentTirage(id) {
    const url = 'http://127.0.0.1:8080/agentTirage/' + id;
    return this.http.get(url);
  }

  impression(file:any){

    return this.http.get('http://127.0.0.1:8080/Liste/'+file,{responseType:'blob' })
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
  getHistory(){
    return this.http.get('http://127.0.0.1:8080/agentTirage/history');

  }

  signUp(info: SignUpInfo): Observable<string> {
    const uri = 'http://127.0.0.1:8080/agentTirage';

    return this.http.post<string>(uri, info, httpOptions);
  }
}
