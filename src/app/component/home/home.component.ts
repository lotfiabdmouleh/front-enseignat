import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  info: any;

  msg:string;
  constructor(private token: TokenStorageService ,private router:Router) {
    console.log("eeeeeee"+this.router.getCurrentNavigation().extras.state.ex);
    if ( this.router.getCurrentNavigation().extras.state.ex == 403) {
      this.msg="Accés interdit";
    }else {
      if
      ( this.router.getCurrentNavigation().extras.state.ex) {
        this.msg="Accés ";
      }

    }
  }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }

}
