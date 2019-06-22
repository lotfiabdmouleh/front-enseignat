import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../../auth/token-storage.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Recharge} from "../../models/recharge";
import {RechargeService} from "../../services/recharge.service";
import {Ancre} from "../../models/ancre";
import {Photocopieur} from "../../models/photocopieur";
import {AncreService} from "../../services/ancre.service";
import {PhotocopieurService} from "../../services/photocopieur.service";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {

  displayedColumns: string[] = ['date','datem','photocopieur','ancre','actions'];
  dataSource: MatTableDataSource<Recharge>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table:MatTable<any>;
  listRecharge:Recharge[];
  listAncre:any;
  listPhotocopieur:any;
  recharge:Recharge=new Recharge();
  info:any;
  selectedan:Ancre;
  selectedph:Photocopieur;
  data:any;
  constructor(private route:Router,private http: HttpClient,private token: TokenStorageService,
              private rechargeservice:RechargeService,private modalService: NgbModal,
              private ancreService:AncreService,private photService:PhotocopieurService,private title:Title,private translate: TranslateService
  ) {
    this.getAllRecharges();

  }

  ngOnInit() {
    this.translate.stream("recharge.rech").subscribe(res=>{this.title.setTitle(res);});

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if(this.info.token!=null){
      this.getAllRecharges();
    }else {
      this.route.navigate(['login'])
    }
    this.ancreService.getAllAncre()
      .subscribe(res => {

        this.listAncre = res as Ancre[];

      }, err => {

      });

    this.photService.getAllphotocopieur()
      .subscribe(res => {
        this.listPhotocopieur = res as Photocopieur[];

      }, err => {

      });

  }

  addRecharge() {

      this.rechargeservice.addrecharge(this.recharge,this.selectedph,this.selectedan).subscribe(res=>{
        this.c();

        this.getAllRecharges();
      });

  }
  openVerticallyCentered(content) {

    this.modalService.open(content, { centered: true });

  }

  openVerticallyCenteredEdit(content,id) {

    this.rechargeservice.getrecharge(id).subscribe(res =>{this.recharge=res as Recharge;});

    this.modalService.open(content, { centered: true });
  }


  editRecharge(){
    this.rechargeservice.updaterecharge(this.recharge,this.selectedph,this.selectedan).subscribe(res=>{this.ngOnInit()});
    this.c();
  }

  getAllRecharges(){
    this.rechargeservice.getAllrecharge()
      .subscribe(res => {
        this.data=res;
        this.listRecharge = res as Recharge[];

        this.dataSource = new MatTableDataSource(this.listRecharge);
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
this.selectedan=null;
    this.modalService.dismissAll();
  }

  deleteRecharge(){
    this.rechargeservice.deleterecharge(this.recharge.id).subscribe(res => {
    this.c();
    this.getAllRecharges();
  });

  }

  openVerticallydelete(contentdelete,id){
    this.rechargeservice.getrecharge(id).subscribe(res =>{this.recharge=res as Recharge });
    this.modalService.open(contentdelete);
  }


}
