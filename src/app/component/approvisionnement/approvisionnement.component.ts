import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../../auth/token-storage.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Approvisionnement} from "../../models/approvisionnement";
import {ApprovisionnementService} from "../../services/approvisionnement.service";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-approvisionnement',
  templateUrl: './approvisionnement.component.html',
  styleUrls: ['./approvisionnement.component.css']
})
export class ApprovisionnementComponent implements OnInit {

  displayedColumns: string[] = ['dateAjout','agenttirage','message','actions'];
  dataSource: MatTableDataSource<Approvisionnement>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table:MatTable<any>;
  listapprovisionnement:Approvisionnement[];
  approvisionnement:Approvisionnement=new Approvisionnement();

  info:any;

  data:any;
  constructor(private route:Router,private http: HttpClient,private token: TokenStorageService,
              private approvisionnementService:ApprovisionnementService,private modalService: NgbModal
    ,private title:Title,private translate: TranslateService) {
    this.getAllapprovisionnements();
  }

  ngOnInit() {

    this.translate.stream("approvisionnement.app").subscribe(res=>{this.title.setTitle(res);});

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if(this.info.token!=null){
      this.getAllapprovisionnements();
    }else {
      this.route.navigate(['login'])
    }}

  addApprovisionnement() {
    this.approvisionnementService.addApp(this.approvisionnement).subscribe(res=>{
      this.c();
      this.getAllapprovisionnements();
    });


  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }



  openVerticallyCenteredEdit(content,id) {
    this.approvisionnementService.getApp(id).subscribe(res =>{this.approvisionnement=res as Approvisionnement; });
    this.modalService.open(content, { centered: true });
  }

  editApp(){
    this.approvisionnementService.updateApp(this.approvisionnement).subscribe(res=>{this.ngOnInit()});
    this.c();
  }

  getAllapprovisionnements(){
    this.approvisionnementService.getAllApp()
      .subscribe(res => {
        this.data=res;
        this.listapprovisionnement = res as Approvisionnement[];
        this.dataSource = new MatTableDataSource(this.listapprovisionnement);
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
    this.approvisionnement.message=null;
    this.modalService.dismissAll();
  }

  deleteApp(){
    this.approvisionnementService.deleteApp(this.approvisionnement.id).subscribe(res => {
    this.modalService.dismissAll(this.approvisionnement);
    this.getAllapprovisionnements();});
  }

  openVerticallydelete(contentdelete,id){
    this.approvisionnementService.getApp(id).subscribe(res =>{this.approvisionnement=res as Approvisionnement;});
    this.modalService.open(contentdelete);

  }

}
