import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RoleService} from "../../services/role.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import {Role} from "../../models/role";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

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
              private roleService: RoleService,private modalService: NgbModal,private title:Title,private translate: TranslateService) {

    this.getAllRole();
  }
  ngOnInit() {
    this.translate.stream("user.role").subscribe(res=>{this.title.setTitle(res);});

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


  }
  addRole() {
    this.roleService.addRole(this.role).subscribe(res=>{

      this.c();
      this.getAllRole();
    });

  }
  openVerticallyCentered(content) {

    this.modalService.open(content, { centered: true });

  }

  openVerticallyCenteredEdit(content,id) {

    this.roleService.getRole(id).subscribe(res =>{this.role=res as Role});

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

      });

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  c(){
  this.role.name='';
    this.modalService.dismissAll();
  }

  deleteRole(){
    this.roleService.deleteRole(this.role.id).subscribe(res => {
    this.modalService.dismissAll(this.role);

    this.getAllRole();
  });

  }
  openVerticallydelete(contentdelete,id){
    this.roleService.getRole(id).subscribe(res =>{this.role=res as Role});
    this.modalService.open(contentdelete);
  }

}

