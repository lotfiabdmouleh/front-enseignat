import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {

  constructor(private http: HttpClient) { }
  getHistory(){
    return this.http.get('http://127.0.0.1:8080/agent/history');

  }
}
