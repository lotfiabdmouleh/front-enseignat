import {Component, AfterViewInit, EventEmitter, Output, OnInit} from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbPanelChangeEvent,
  NgbCarouselConfig
} from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Router} from '@angular/router';

import {DiversService} from "../../services/divers.service";
import {RoleService} from "../../services/role.service";
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {HttpClient} from '@angular/common/http';
import {AgentService} from '../../services/agent.service';
import {Observable} from 'rxjs';
import {UploadFileService} from '../../services/upload-file.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./header-navigation.component.css']
})
export class NavigationComponent implements OnInit, AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  info: any;
  data:any;
  newpassword: any;
  confpassword: any;
  pass: any;
  file: SafeResourceUrl;
  defult:any;

  user: User = new User();
  private readonly imageType: string = 'data:image/PNG;base64,';

  public config: PerfectScrollbarConfigInterface = {};


  constructor(private userService: UserService, private modalService: NgbModal, private http: HttpClient,
              private token: TokenStorageService, private Router: Router, private agentsErvice: AgentService,
              private uploadService: UploadFileService, private sanitizer: DomSanitizer) {
  }

  public showSearch = false;

  // This is for Notifications
  notifications: Object[] = [
    {
      round: 'round-danger',
      icon: 'ti-link',
      title: 'Luanch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM'
    },
    {
      round: 'round-success',
      icon: 'ti-calendar',
      title: 'Event today',
      subject: 'Just a reminder that you have event',
      time: '9:10 AM'
    },
    {
      round: 'round-info',
      icon: 'ti-settings',
      title: 'Settings',
      subject: 'You can customize this template as you want',
      time: '9:08 AM'
    },
    {
      round: 'round-primary',
      icon: 'ti-user',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject: 'I have sung a song! See you at',
      time: '9:10 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'away',
      from: 'Arijit Sinh',
      subject: 'I am a singer!',
      time: '9:08 AM'
    },
    {
      useravatar: 'assets/images/users/4.jpg',
      status: 'offline',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  ngOnInit(): void {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };

    this.userService.getUserByName(this.token.getUsername()).subscribe(res => {
      this.user = res as User;console.log(this.user.image);
      if(this.user.image!=null){
        this.img(this.user.image);

      }else{
        this.img("default.png");

      }

    });


    /* */

  }


  img(image:string){
    this.uploadService.getimage(image).subscribe((data: any) => {
      this.file = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content);
    });
  }
  ngAfterViewInit() {

  }

  logout() {
    this.token.signOut();
    this.Router.navigate(['login']);

  }

  userDetail() {
    this.Router.navigate(['/full/component/userdetail']);
  }

  open(content) {
    this.modalService.open(content);

  }
c(){
    this.pass='';
    this.newpassword='';
    this.confpassword='';
    this.modalService.dismissAll();
}
  changepasse() {
    if (this.newpassword === this.confpassword) {
      this.userService.getUserByName(this.token.getUsername()).subscribe(res => {
        this.user = res as User;

      });
      this.user.password = this.pass;
      this.userService.updatepassword(this.user, this.newpassword).subscribe(res => console.log(res));
    this.c();
    this. logout();
    }

  }
}
