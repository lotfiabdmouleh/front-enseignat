import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {SidebarComponent} from '../../shared/sidebar/sidebar.component';

@Component({
  providers:[SidebarComponent],
  selector: 'app-full-layout',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {
  color = 'defaultdark';
  showSettings = false;
  showMinisidebar = false;
  showDarktheme = false;

  public innerWidth: any;

  public config: PerfectScrollbarConfigInterface = {};

  constructor(public router: Router,private translate:TranslateService,private sidebar:SidebarComponent) {
    translate.setDefaultLang('fr');}

  ngOnInit() {
    if (this.router.url === '/') {
      this.router.navigate(['/dashboard/dashboard1']);
    }
    this.handleLayout();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.handleLayout();
  }
  useLanguage(language: string) {
    localStorage.setItem("lang", language);
    this.translate.use(language);



  }
  toggleSidebar() {
    this.showMinisidebar = !this.showMinisidebar;
  }

  handleLayout() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1170) {
      this.showMinisidebar = true;
    } else {
      this.showMinisidebar = false;
    }
  }
}
