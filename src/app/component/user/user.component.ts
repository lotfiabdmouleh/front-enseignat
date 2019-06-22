import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
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
import {SignUpInfo} from "../../auth/signup-info";
import {AuthService} from "../../auth/auth.service";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['select','username','role','actions'];
  dataSource: MatTableDataSource<User>;
  selection = new SelectionModel<User>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table:MatTable<any>;

  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  user:User;
  listUser:User[];
  agent:Agent=new Agent();
  info:any;
  role:Role;
  listRole:any;
  selected:any;
  constructor(private route:Router,private http: HttpClient,private userService: UserService,private token: TokenStorageService,
              private agentService: AgentService,private modalService: NgbModal,private roleService:RoleService,
              private changed:ChangeDetectorRef,private authService: AuthService,private title:Title,private translate: TranslateService) {
    this.getAllUser();

  }

  ngOnInit() {
    this.translate.stream("user.user").subscribe(res=>{this.title.setTitle(res);});

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
    this.roleService.getAllRole().subscribe(res =>{this.listRole=res as Role[];})
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

      });
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }}

  affecterRole(){

    this.userService.affecterRole(this.selected,this.selection.selected).subscribe(res=>{
      this.modalService.dismissAll();
      this.selection.clear();
      this.getAllUser();
    });

  }

  openVerticallyCentered(content){
    this.modalService.open(content, { centered: true });
  }
  onSubmit() {


    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.tel,);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {

        this.authService.send(this.form.username).subscribe(res=>{
          this.isSignedUp = true;
          this.isSignUpFailed = false;
          this.form.name=null;
          this.form.username=null;
          this.form.email=null;

          this.form.tel=null;
          this.modalService.dismissAll(this.signupInfo);
          this.selection.clear();
          this.getAllUser();
        });

      },
      error => {

        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
  c(){
    this.form.name=null;
      this.form.username=null;
      this.form.email=null;
      this.form.tel=null;
    this.selection.clear();
    this.modalService.dismissAll();
  }

  deleteUser(){
    this.userService.deleteUser(this.user).subscribe(res => {
      this.modalService.dismissAll(this.user);
      this.selection.clear();
      this.getAllUser(); });



  }
  openVerticallydelete(contentdelete,id){
    this.userService.getUser(id).subscribe(res =>{this.user=res as User});
    this.modalService.open(contentdelete);
  }
}
