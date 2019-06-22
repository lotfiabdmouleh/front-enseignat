import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";

import {Photocopieur} from "../../models/photocopieur";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../../auth/token-storage.service";
import {RechargeService} from "../../services/recharge.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PhotocopieurService} from "../../services/photocopieur.service";
import {Intervention} from "../../models/intervention";
import {InterventionService} from "../../services/intervention.service";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.css']
})
export class InterventionComponent implements OnInit {

  displayedColumns: string[] = ['date','soc','disc','photocopieur','actions'];
  dataSource: MatTableDataSource<Intervention>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table:MatTable<any>;
  listIntervention:Intervention[];

  listPhotocopieur:any;
  inter:Intervention=new Intervention();
  info:any;

  selectedph:Photocopieur;
  data:any;
  constructor(private route:Router,private http: HttpClient,private token: TokenStorageService,
              private rechargeservice:RechargeService,private modalService: NgbModal,
              private interService:InterventionService,private photService:PhotocopieurService
    ,private title:Title,private translate: TranslateService
  ) {
    this.getAllInterventions();

  }

  ngOnInit() {
    this.translate.stream("intervention.inter").subscribe(res=>{this.title.setTitle(res);});

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if(this.info.token!=null){
      this.getAllInterventions();
    }else {
      this.route.navigate(['login'])
    }

    this.photService.getAllphotocopieur()
      .subscribe(res => {
        this.listPhotocopieur = res as Photocopieur[];

      }, err => {

      });


  }

  addIntervention() {

    this.interService.addinter(this.inter,this.selectedph).subscribe(res=>{
      this.c();

      this.getAllInterventions();
    });

  }
  openVerticallyCentered(content) {

    this.modalService.open(content, { centered: true });

  }

  openVerticallyCenteredEdit(content,id) {

    this.interService.getInter(id).subscribe(res =>{this.inter=res as Intervention;});

    this.modalService.open(content, { centered: true });
  }


  editInter(){
    this.interService.updaterecharge(this.inter,this.selectedph).subscribe(res=>{this.ngOnInit()});
    this.c();
  }

  getAllInterventions(){
    this.interService.getAllinterventions()
      .subscribe(res => {
        this.data=res;
        this.listIntervention = res as Intervention[];

        this.dataSource = new MatTableDataSource(this.listIntervention);
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
    this.selectedph=null;
    this.inter.nom_Societe='';
    this.inter.disc='';
    this.modalService.dismissAll();
  }

  deleteinter(){
    this.interService.deleteInter(this.inter.id).subscribe(res => {
    this.c();
    this.getAllInterventions();
  });

  }

  openVerticallydelete(contentdelete,id){
    this.interService.getInter(id).subscribe(res =>{this.inter=res as Intervention;});
    this.modalService.open(contentdelete);
  }


}
