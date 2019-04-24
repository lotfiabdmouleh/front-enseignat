import {ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {UserService} from '../../services/user.service';
import {TokenStorageService} from "../../auth/token-storage.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Agent} from "../../models/agent";
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";
import {User} from "../../models/user";
import {Role} from "../../models/role";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RoleService} from "../../services/role.service";
import {AgentService} from "../../services/agent.service";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['select','username'];
  dataSource: MatTableDataSource<User>;
  selection = new SelectionModel<User>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table:MatTable<any>;
  listAgent:Agent[];
  user:User;
  listUser:User[];
  agent:Agent=new Agent();
  info:any;
  role:Role;
  listRole:any;
  selected:any;
  constructor(private route:Router,private http: HttpClient,private userService: UserService,private token: TokenStorageService,
              private agentService: AgentService,private modalService: NgbModal,private roleService:RoleService,
              private changed:ChangeDetectorRef) {
    this.getAllUser();

  }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if(this.info.token!=null){
      this.getAllUser();
    }else {
      this.route.navigate(['login'])
    }}
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }


  openVerticallyCenteredRole(content){
    this.roleService.getAllRole().subscribe(res =>{this.listRole=res as Role[];console.log(("listRole"))})
    if(this.selection.selected.length!=0)
    this.modalService.open(content, { centered: true });
  }


  getAllUser(){
    this.userService.getAllUsers()
      .subscribe(res => {
        this.listUser = res as User[];
        this.dataSource = new MatTableDataSource(this.listUser);
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
this.userService.affecterRole(this.selected,this.selection.selected).subscribe(res=>{console.log('aa') });
  this.modalService.dismissAll(this.selected);
    this.selection.clear();
  }
}
