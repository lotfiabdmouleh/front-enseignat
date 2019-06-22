import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Agent} from '../models/agent';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http: HttpClient) {
  }

  public addAgent(agent: Agent): Observable<any> {
    const uri = 'http://127.0.0.1:8080/agent';


  return  this.http.post(uri, agent);
  }

  getAllAgents() {
    return this.http.get('http://127.0.0.1:8080/agent');
  }
  getAllUsers() {
    return this.http.get('http://127.0.0.1:8080/User');
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

   return this.http.get('http://127.0.0.1:8080/Liste',{responseType:'blob' })
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
    return this.http.get('http://127.0.0.1:8080/agent/history');

  }


}
