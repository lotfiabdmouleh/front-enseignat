import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbModal,} from '@ng-bootstrap/ng-bootstrap';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Router} from '@angular/router';

import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {HttpClient} from '@angular/common/http';
import {AgentService} from '../../services/agent.service';
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
  x:boolean=false;

  user: User = new User();
  private readonly imageType: string = 'data:image/PNG;base64,';

  public config: PerfectScrollbarConfigInterface = {};


  constructor(private userService: UserService, private modalService: NgbModal, private http: HttpClient,
              private token: TokenStorageService, private Router: Router, private agentsErvice: AgentService,
              private uploadService: UploadFileService, private sanitizer: DomSanitizer) {
  }




  ngOnInit(): void {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };

    this.userService.getUserByName(this.token.getUsername()).subscribe(res => {
      this.user = res as User;
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
      this.x=false;
      this.userService.getUserByName(this.token.getUsername()).subscribe(res => {
        this.user = res as User;

      });
      this.user.password = this.pass;
      this.userService.updatepassword(this.user, this.newpassword).subscribe();
    this.c();
    this. logout();
    }
else{
      this.x=true;
    }
  }
}
