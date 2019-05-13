import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RoleService} from "../../services/role.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import {Role} from "../../models/role";
import {Departement} from "../../models/departement";
import {UserService} from "../../services/user.service";
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class RoleComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name','actions'];
  dataSource: MatTableDataSource<Role>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  listRole:Role[];
  role:Role=new Role();
  info:any;
  board:any;
  errorMessage:any;
  constructor(private route:Router,private http: HttpClient,private token: TokenStorageService,
              private roleService: RoleService,private modalService: NgbModal,private userService:UserService) {

    this.getAllRole();
  }
  ngOnInit() {

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if(this.info.token!=null){
      this.getAllRole();
    }else {
      this.route.navigate(['login'])
    }


    // console.log(this.dataSource.data);




  }
  addRole() {
    this.roleService.addRole(this.role);
    this.ngOnInit();
    this.modalService.dismissAll(this.role);
    this.ngOnInit();
  }
  openVerticallyCentered(content) {

    this.modalService.open(content, { centered: true });

  }

  openVerticallyCenteredEdit(content,id) {

    this.roleService.getRole(id).subscribe(res =>{this.role=res as Role;console.log(this.role);});

    this.modalService.open(content, { centered: true });

  }
  editRole(){

    this.roleService.updateRole(this.role).subscribe(res=>{this.ngOnInit()});
  }
  getAllRole(){

    this.roleService.getAllRole()
      .subscribe(res => {
        this.listRole= res as Role[];
        this.dataSource = new MatTableDataSource(this.listRole);
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
    }
  }
  c(){

    this.modalService.dismissAll();
  }

  deleteDepartement(){
    this.roleService.deleteRole(this.role.id).subscribe(res => {console.log('deleted') });
    this.modalService.dismissAll(this.role);

    this.getAllRole();


  }
  openVerticallydelete(contentdelete,id){
    this.roleService.getRole(id).subscribe(res =>{this.role=res as Role;console.log(this.role);});
    this.modalService.open(contentdelete);
  }

}

