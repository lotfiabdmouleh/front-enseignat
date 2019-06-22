import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";
import {Approvisionnement} from "../../models/approvisionnement";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../../auth/token-storage.service";
import {ApprovisionnementService} from "../../services/approvisionnement.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-approadmin',
  templateUrl: './approadmin.component.html',
  styleUrls: ['./approadmin.component.css']
})
export class ApproadminComponent implements OnInit {


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
              private approvisionnementService:ApprovisionnementService,private modalService: NgbModal,private title:Title,private translate: TranslateService) {
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



  getAllapprovisionnements(){
    this.approvisionnementService.getAllAppvalid()
      .subscribe(res => {
        this.data=res ;
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

  changeEtat(id){

    this.approvisionnementService.getApp(id).subscribe(res=>{
      this.approvisionnement=res as Approvisionnement;
      this.approvisionnement.etat=true;
      this.approvisionnementService.updateApp(this.approvisionnement).subscribe(res=>{ })
    })
  }

}
