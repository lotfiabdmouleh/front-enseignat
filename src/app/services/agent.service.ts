import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Agent} from '../models/agent';

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
}
