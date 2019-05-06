import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AgentTirage} from "../models/agentTirage";

@Injectable({
  providedIn: 'root'
})
export class AgenttirageService {

  constructor(private http: HttpClient) {
  }

  public addAgentTirage(agent: AgentTirage) {
    const uri = 'http://127.0.0.1:8080/agentTirage';


    this.http.post(uri, agent).subscribe(res => console.log('done'));
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

  impression(){

    return this.http.get('http://127.0.0.1:8080/Liste',{responseType:'blob' })
      .map((blob:Blob)=>{
        console.log('report is downloaded');
        var file=new Blob([blob],{type:'application/pdf'});
        var fileUrl=URL.createObjectURL(file);
        window.open(fileUrl);


      });
  }
  getHistory(){
    return this.http.get('http://127.0.0.1:8080/agentTirage/history');

  }
}
