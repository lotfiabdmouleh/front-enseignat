import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Approvisionnement} from "../models/approvisionnement";

@Injectable({
  providedIn: 'root'
})
export class ApprovisionnementService {

  constructor(private http: HttpClient) {
  }

  public addApp(app: Approvisionnement) {
    const uri = 'http://127.0.0.1:8080/approvisionnement';


   return this.http.post(uri, app);
  }

  getAllApp() {
    return this.http.get('http://127.0.0.1:8080/approvisionnement');
  }
  getAllAppvalid() {
    return this.http.get('http://127.0.0.1:8080/approvisionnement/valid');
  }


  deleteApp(id) {
    const url = 'http://127.0.0.1:8080/approvisionnement/' + id;
    return this.http.delete(url);
  }
  updateApp(approvisionnement: Approvisionnement) {
    const url = 'http://127.0.0.1:8080/approvisionnement/' + approvisionnement.id;
    return this.http.put(url , approvisionnement);
  }
  getApp(id) {
    const url = 'http://127.0.0.1:8080/approvisionnement/' + id;
    return this.http.get(url);
  }


}
