import { Component, OnInit } from '@angular/core';
import {SignUpInfo} from '../../auth/signup-info';
import {User} from '../../models/user';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Router} from '@angular/router';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {UserService} from '../../services/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UploadFileService} from '../../services/upload-file.service';
import {Observable} from 'rxjs';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  user:User;
  info:any;
  newpassword:any;
  confpassword:any;
  pass:any;
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  fileUploads: Observable<any>;


  private readonly imageType : string = 'data:image/PNG;base64,';
  constructor(private http: HttpClient,private userService: UserService,private uploadService: UploadFileService,
              private token: TokenStorageService,private route:Router,private modalService:NgbModal, private sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if(this.info.token!=null){
    this.getUserByName(this.token.getUsername());
    }else {
      this.route.navigate(['login'])
    }

  }
  getUserByName(name:any){
this.userService.getUserByName(name).subscribe(res=>{this.user=res as User});
  }
  update(){
    console.log(this.user);
    this.userService.update(this.user).subscribe(res=>console.log(res));
  }

  open(content){
    this.modalService.open(content);

  }
  changepasse(){
    if(this.newpassword===this.confpassword){
      console.log(this.token.getUsername());
      this.userService.getUserByName(this.token.getUsername()).subscribe(res=>{this.user =res as User;console.log(res)});
      this.user.password=this.pass;
      this.userService.updatepassword(this.user,this.newpassword).subscribe(res=>console.log(res));

    }

  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload,this.token.getUsername()).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });

    this.selectedFiles = undefined;
  }

}
