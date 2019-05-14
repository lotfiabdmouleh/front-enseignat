import { Component } from '@angular/core';
import {TokenStorageService} from './auth/token-storage.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[];
  private authority: string;

  constructor( private tokenStorage: TokenStorageService,private translate: TranslateService) {
    translate.setDefaultLang('fr');

  }


  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }
  useLanguage(language: string) {
    this.translate.use(language);
  }
}
