import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";
import {AgentTirage} from "../../models/agentTirage";
import {SignUpInfo} from "../../auth/signup-info";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../auth/token-storage.service";
import {HttpClient} from "@angular/common/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AgenttirageService} from "../../services/agenttirage.service";
import {AuthService} from "../../auth/auth.service";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-agenttirage',
  templateUrl: './agenttirage.component.html',
  styleUrls: ['./agenttirage.component.css']
})
export class AgenttirageComponent implements OnInit {

  agentTirage:AgentTirage=new AgentTirage();
  displayedColumns: string[] = ['nom','login','email','telephone','actions'];
  dataSource: MatTableDataSource<AgentTirage>;
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table:MatTable<any>;
  @ViewChild('fileInput')
  fileInput: ElementRef;
  listAgentTirage:AgentTirage[];
  telnumber=false;
  info:any;

  data:any;
  constructor(private authService: AuthService, private route:Router,private http: HttpClient,private title:Title,
              private token: TokenStorageService,
              private agentTirageService:AgenttirageService,private modalService: NgbModal, private translate: TranslateService
              ) {
    this.getAllAgentTirages();

  }

  ngOnInit() {
    this.translate.stream('agenttirage.agt').subscribe(res=>{this.title.setTitle(res);});

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if(this.info.token!=null){
      this.getAllAgentTirages();
    }else {
      this.route.navigate(['login'])
    }

  }


  openVerticallyCentered(content) {

    this.modalService.open(content, { centered: true });

  }

  openVerticallyCenteredEdit(content,id) {

    this.agentTirageService.getAgentTirage(id).subscribe(res =>{this.agentTirage=res as AgentTirage; });

    this.modalService.open(content, { centered: true });
  }

  editAgentTirage(){
    this.agentTirageService.updateAgentTirage(this.agentTirage).subscribe(res=>{this.ngOnInit()});
    this.c();
  }

  getAllAgentTirages(){
    this.agentTirageService.getAllAgentTirage()
      .subscribe(res => {
        this.data=res ;
        this.listAgentTirage = res as AgentTirage[];

        this.dataSource = new MatTableDataSource(this.listAgentTirage);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {

      });

  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }}



  c(){
    this.form.name='';
    this.form.username='';
    this.form.email='';
    this.form.password='';
    this.form.tel='';
    this.modalService.dismissAll();
  }

  deleteAgentTirage(){
    this.agentTirageService.deleteAgentTirage(this.agentTirage.id).subscribe(res => {
    this.modalService.dismissAll(this.agentTirage);
    this.getAllAgentTirages();
  });

  }
  openVerticallydelete(contentdelete,id){
    this.agentTirageService.getAgentTirage(id).subscribe(res =>{this.agentTirage=res as AgentTirage; });
    this.modalService.open(contentdelete);
  }
  onSubmit() {

    if(isNaN(this.form.tel) ){
      this.telnumber=true;
    }
else{
      this.telnumber=false;
      this.signupInfo = new SignUpInfo(
        this.form.name,
        this.form.username,
        this.form.email,
        this.form.tel);
      this.agentTirageService.signUp(this.signupInfo).subscribe(
        data => {

          this.authService.send(this.form.username).subscribe(res=>{
            this.isSignedUp = true;
            this.isSignUpFailed = false;
            this.c();

            this.getAllAgentTirages();
          });

        },
        error => {

          this.errorMessage = error.error.message;
          this.isSignUpFailed = true;
        }
      );
    }

  }

}
