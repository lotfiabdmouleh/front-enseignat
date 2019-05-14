import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  pushFileToStorage(file: File,username:string): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);
const url='http://127.0.0.1:8080/post/upload/'+username;
    const req = new HttpRequest('POST',url , formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get('http://127.0.0.1:8080/post/getallfiles');
  }
  getimage(username:string):Observable<any>{
   const url='http://127.0.0.1:8080/post/files/'+username;

    return this.http.get(url) ;
  }
}
