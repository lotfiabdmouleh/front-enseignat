import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Agent} from '../../models/agent';
import {AgentService} from '../../services/agent.service';
import {FormControl} from '@angular/forms';
import {TokenStorageService} from '../../auth/token-storage.service';
import {RoleService} from "../../services/role.service";
import {Role} from "../../models/role";
import {User} from "../../models/user";
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class AgentComponent implements OnInit {

  displayedColumns: string[] = ['nom','prenom','dateAjout','dateModification','createdBy','lastModifiedBy','actions'];
  dataSource: MatTableDataSource<Agent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table:MatTable<any>;
  listAgent:Agent[];
  agent:Agent=new Agent();
  info:any;
  listRole:any;
  selected:any;
  data:any;
  test:any;

  constructor(private route:Router,private http: HttpClient,private token: TokenStorageService,
              private agentService: AgentService,private modalService: NgbModal,private roleService:RoleService,
              private changed:ChangeDetectorRef, private translate: TranslateService) {
    this.test=this.translate.stream("agent.nom").subscribe(res=>console.log(res));
    this.getAllAgents();

  }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if(this.info.token!=null){
      this.getAllAgents();
      this.agentService.getHistory().subscribe(res=>{this.data=res,console.log(this.data)});
    }else {
      this.route.navigate(['login'])
    }}
  histo(){
    this.route.navigate(['/full/component/historique']);
  }
  addAgent() {
    this.agentService.addAgent(this.agent);

    this.modalService.dismissAll(this.agent);
    this.getAllAgents();
  }
  openVerticallyCentered(content) {

    this.modalService.open(content, { centered: true });

  }

  openVerticallyCenteredEdit(content,id) {

      this.agentService.getAgent(id).subscribe(res =>{this.agent=res as Agent;console.log(this.agent);});

    this.modalService.open(content, { centered: true });
  }

  openVerticallyCenteredRole(content,id){
    this.roleService.getAllRole().subscribe(res =>{this.listRole=res as Role[];console.log(("listRole"))})
    this.modalService.open(content, { centered: true });
  }

  editAgent(){
    this.agentService.updateAgent(this.agent).subscribe(res=>{this.ngOnInit()});
    this.modalService.dismissAll(this.agent);
  }

  getAllAgents(){
    this.agentService.getAllAgents()
      .subscribe(res => {
        this.data=res,console.log(this.data);
        this.listAgent = res as Agent[];

        this.dataSource = new MatTableDataSource(this.listAgent);
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
    this.agentService.impression().subscribe(res=>{this.ngOnInit()});
  }
  affecterRole(){
    console.log(this.selected);
  }
  c(){

    this.modalService.dismissAll();
  }

  deleteAgent(){
    this.agentService.deleteAgent(this.agent.id).subscribe(res => {console.log('deleted') });
    this.modalService.dismissAll(this.agent);

    this.getAllAgents();


  }
  openVerticallydelete(contentdelete,id){
    this.agentService.getAgent(id).subscribe(res =>{this.agent=res as Agent;console.log(this.agent);});
    this.modalService.open(contentdelete);
  }

}
