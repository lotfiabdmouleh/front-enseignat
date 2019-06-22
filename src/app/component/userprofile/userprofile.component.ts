import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Router} from '@angular/router';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {UserService} from '../../services/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UploadFileService} from '../../services/upload-file.service';
import {Title} from '@angular/platform-browser';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  form: any = {};

  isSignUpFailed = false;
  errorMessage = '';
  user:User;
  info:any;

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };




  private readonly imageType : string = 'data:image/PNG;base64,';
  constructor(private http: HttpClient,private userService: UserService,private uploadService: UploadFileService,
              private token: TokenStorageService,private route:Router,private modalService:NgbModal,
              private title:Title,private translate: TranslateService) { }

  ngOnInit() {
    this.translate.stream("agent.profil").subscribe(res=>{this.title.setTitle(res);});

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
this.userService.getUserByName(name).subscribe(res=>{this.user=res as User;});
  }
  update(){

    this.userService.update(this.user).subscribe(res=>{
      this.token.signOut();
      this.route.navigate(['login']);
    });
  }

  open(content){
    this.modalService.open(content);

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

      }
    });

    this.selectedFiles = undefined;
  }

}
