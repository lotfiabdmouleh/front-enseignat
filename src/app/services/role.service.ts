import { Injectable } from '@angular/core';
import {Role} from "../models/role";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {
  }

  public addRole(role: Role) {
    const uri = 'http://127.0.0.1:8080/role';


    this.http.post(uri, role).subscribe(res => console.log('done'));
  }

  getAllRole() {
    return this.http.get('http://127.0.0.1:8080/role');
  }

  deleteRole(id) {
    const url = 'http://127.0.0.1:8080/role/' + id;
    return this.http.delete(url);
  }

  updateRole(role: Role) {
    const url = 'http://127.0.0.1:8080/role/' + role.id;
    return this.http.put(url, role);
  }

  getRole(id) {
    const url = 'http://127.0.0.1:8080/role/' + id;
    return this.http.get(url);
  }
}
