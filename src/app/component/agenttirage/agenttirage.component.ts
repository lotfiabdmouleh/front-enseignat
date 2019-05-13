import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";
import {AgentTirage} from "../../models/agentTirage";
import {SignUpInfo} from "../../auth/signup-info";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../auth/token-storage.service";
import {HttpClient} from "@angular/common/http";
import {EnseignantService} from "../../services/enseignant.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AgenttirageService} from "../../services/agenttirage.service";

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

  info:any;

  data:any;
  constructor(private route:Router,private http: HttpClient,private token: TokenStorageService,
              private agentTirageService:AgenttirageService,private modalService: NgbModal,
              private changed:ChangeDetectorRef) {
    this.getAllAgentTirages();

  }

  ngOnInit() {
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

    this.agentTirageService.getAgentTirage(id).subscribe(res =>{this.agentTirage=res as AgentTirage;console.log(this.agentTirage);});

    this.modalService.open(content, { centered: true });
  }

  editAgentTirage(){
    this.agentTirageService.updateAgentTirage(this.agentTirage).subscribe(res=>{this.ngOnInit()});
    this.modalService.dismissAll(this.agentTirage);
  }

  getAllAgentTirages(){
    this.agentTirageService.getAllAgentTirage()
      .subscribe(res => {
        this.data=res,console.log(this.data);
        this.listAgentTirage = res as AgentTirage[];

        this.dataSource = new MatTableDataSource(this.listAgentTirage);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        console.log(err);
      });

  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }}

  Imprimer(){
    this.agentTirageService.impression().subscribe(res=>{this.ngOnInit()});
  }

  c(){

    this.modalService.dismissAll();
  }

  deleteAgentTirage(){
    this.agentTirageService.deleteAgentTirage(this.agentTirage.id).subscribe(res => {console.log('deleted') });
    this.modalService.dismissAll(this.agentTirage);
    this.getAllAgentTirages();


  }
  openVerticallydelete(contentdelete,id){
    this.agentTirageService.getAgentTirage(id).subscribe(res =>{this.agentTirage=res as AgentTirage;console.log(this.agentTirage);});
    this.modalService.open(contentdelete);
  }
  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password,
      this.form.tel,);

    this.agentTirageService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.modalService.dismissAll(this.signupInfo);

        this.getAllAgentTirages();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
