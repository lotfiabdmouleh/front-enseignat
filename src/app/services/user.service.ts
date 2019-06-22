import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/api/test/user';
  private pmUrl = 'http://localhost:8080/api/test/pm';
  private adminUrl = 'http://localhost:8080/api/test/admin';

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get('http://127.0.0.1:8080/users');
  }
affecterRole(id, users:User[]){
  const url = 'http://127.0.0.1:8080/users/' + id;
 return  this.http.put(url,users);
}

  impression(){

    return this.http.get('http://127.0.0.1:8080/Liste',{responseType:'blob' })
      .map((blob:Blob)=>{
         var file=new Blob([blob],{type:'application/pdf'});
        var fileUrl=URL.createObjectURL(file);
        window.open(fileUrl);


      });
  }

  getUser(id) {
    const url = 'http://127.0.0.1:8080/users/' + id;
    return this.http.get(url);
  }


  getUserBoard(): Observable<string> {
    return this.http.get(this.userUrl, { responseType: 'text' });
  }

  getPMBoard(): Observable<string> {
    return this.http.get(this.pmUrl, { responseType: 'text' });
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }
  getAgnetBoard(): Observable<string> {
    return this.http.get('http://localhost:8080/api/test/agent', { responseType: 'text' });
  }
  deleteUser(user) {
    const url = 'http://127.0.0.1:8080/users/' + user.id;
    return this.http.delete(url);
  }
getUserByName(name:any){
  const url = 'http://127.0.0.1:8080/users/byname/' + name;
  return this.http.get(url);
}
update(user:User){
  const url = 'http://127.0.0.1:8080/users/put/'+user.id;
  return  this.http.put(url,user);

}
updatepassword(user:any,password:any){
  const url = 'http://127.0.0.1:8080/users/password/'+user.id+'/'+user.password;
  return  this.http.put(url,password);
}
}
