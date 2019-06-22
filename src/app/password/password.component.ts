import {Component, OnInit} from '@angular/core';
import {User} from "../models/user";
import {UserService} from "../services/user.service";

import {TokenStorageService} from "../auth/token-storage.service";
import {EnseignantService} from "../services/enseignant.service";
import {Enseignant} from "../models/enseignant";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  newpassword: any;
  confpassword: any;
  x=false;
  user: User = new User();
  ens: Enseignant = new Enseignant();
  info:any;
  constructor(private userService: UserService, private ensService:EnseignantService,private router:Router,
              private token: TokenStorageService,private title:Title,private translate: TranslateService) { }

  ngOnInit() {
    this.translate.stream("user.ch").subscribe(res=>{this.title.setTitle(res);});

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
  }
  changepasse() {
    if (this.newpassword === this.confpassword) {

          this.x=false;
          this.userService.getUserByName(this.token.getUsername()).subscribe(res => {
          this.user = res as User;

            this.ensService.updatepassword(this.user, this.newpassword).subscribe();

            this.router.navigate(['full']);
          });



      }else{
      this.x=true;
    }
    }
  }
