import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Agent} from '../models/agent';
import {ResponseContentType} from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http: HttpClient) {
  }

  public addAgent(agent: Agent) {
    const uri = 'http://127.0.0.1:8080/agent';


    this.http.post(uri, agent).subscribe(res => console.log('done'));
  }

  getAllAgents() {
    return this.http.get('http://127.0.0.1:8080/agent');
  }

  deleteAgent(id) {
    const url = 'http://127.0.0.1:8080/agent/' + id;
    return this.http.delete(url);
  }
  updateAgent(agent: Agent) {
    const url = 'http://127.0.0.1:8080/agent/' + agent.id;
    return this.http.put(url , agent);
  }
  getAgent(id) {
    const url = 'http://127.0.0.1:8080/agent/' + id;
    return this.http.get(url);
  }

  impression(){
   return this.http.get('http://127.0.0.1:8080/ListeAgent',{responseType:'blob' })
      .map((blob:Blob)=>{
        console.log('report is downloaded');
var file=new Blob([blob],{type:'application/pdf'});
var fileUrl=URL.createObjectURL(file);
window.open(fileUrl);


      });
  }

}
