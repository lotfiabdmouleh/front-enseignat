import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Agent} from '../../models/agent';
import {AgentService} from '../../services/agent.service';
import {FormControl} from '@angular/forms';
import {TokenStorageService} from '../../auth/token-storage.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class AgentComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nom','prenom','dateModification','dateAjout','actions'];
  dataSource: MatTableDataSource<Agent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  listAgent:Agent[];
  agent:Agent=new Agent();
  info:any;

  constructor(private route:Router,private http: HttpClient,private token: TokenStorageService, private agentService: AgentService,private modalService: NgbModal) {
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
    }else {
      this.route.navigate(['login'])
    }


    // console.log(this.dataSource.data);




  }
  addAgent() {
    this.agentService.addAgent(this.agent);
    this.ngOnInit();
    this.modalService.dismissAll(this.agent);
    this.ngOnInit();
  }
  openVerticallyCentered(content) {

    this.modalService.open(content, { centered: true });

  }

  openVerticallyCenteredEdit(content,id) {

      this.agentService.getAgent(id).subscribe(res =>{this.agent=res as Agent;console.log(this.agent);});

    this.modalService.open(content, { centered: true });

  }
  editAgent(){

    this.agentService.updateAgent(this.agent).subscribe(res=>{this.ngOnInit()});
  }
  getAllAgents(){

    this.agentService.getAllAgents()
      .subscribe(res => {
        this.listAgent = res as Agent[];
        this.dataSource = new MatTableDataSource(this.listAgent);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        console.log(err);
      });

  }
  deleteAgent(id) {
    this.agentService.deleteAgent(id).subscribe(res => {console.log('deleted'), this.ngOnInit(); });
  }




  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
