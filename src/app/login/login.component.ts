import {Component, ElementRef, OnInit} from '@angular/core';
import {AuthLoginInfo} from '../auth/login-info';
import {AuthService} from '../auth/auth.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {Router} from '@angular/router';

import {User} from "../models/user";
import {UserService} from "../services/user.service";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  test=false;
  x=false;
  user:User=new User();
  private loginInfo: AuthLoginInfo;
  constructor(private authService: AuthService,private userService:UserService,private el:ElementRef,
              private tokenStorage: TokenStorageService,public router: Router,private title:Title,private translate: TranslateService) {

  }

  ngOnInit() {
    this.translate.stream("button.login").subscribe(res=>{this.title.setTitle(res);});

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
      if( this.tokenStorage.getAuthorities()[0]==="ROLE_ADMIN"){
        this.router.navigate(['/full/component/home'])
      }
      if( this.tokenStorage.getAuthorities()[0]==="ROLE_ENSEIGNANT"){
        this.router.navigate(['/full/component/demande'])
      }
      if( this.tokenStorage.getAuthorities()[0]==="ROLE_AGENT"){
        this.router.navigate(['/full/component/tirage'])
      }
      if( this.tokenStorage.getAuthorities()[0]==="ROLE_DIRDEP"){
        this.router.navigate(['/full/component/interfacetirage'])
      }

    }

  }

  onSubmit() {


    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        // this.reloadPage();
        this.userService.getUserByName(this.tokenStorage.getUsername()).subscribe(res =>{
          this.user= res as User;

          if(!this.user.etat){
            this.router.navigate(['passeword']);
          }else {
            this.router.navigate(['full']);
          }
        });
      },
      error => {

        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  send(username:any){
  if(username){
    this.authService.send(username).subscribe(res=>{
      this.x=true;

    });
  }else{
    this.test=true;
    this.x=false;
  }


  }



}
