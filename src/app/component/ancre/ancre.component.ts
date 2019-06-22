import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../../auth/token-storage.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Ancre} from "../../models/ancre";
import {AncreService} from "../../services/ancre.service";
import {Recharge} from "../../models/recharge";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-ancre',
  templateUrl: './ancre.component.html',
  styleUrls: ['./ancre.component.css']
})

export class AncreComponent implements OnInit {
  displayedColumns: string[] = ['des','qte','seuil','actions'];
  dataSource: MatTableDataSource<Ancre>;
  displayedColumnsaff: string[] = ['date','photocopieur'];
  dataSourceaff : MatTableDataSource<Recharge>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table:MatTable<any>;
  listAncre:Ancre[];
  qtestckbool=false;
  seuilbool=false;
  ancre:Ancre=new Ancre();
  listrech:Recharge[];
  info:any;
  selected:any;
  data:any;
  test:boolean=true;
  constructor(private route:Router,private http: HttpClient,private token: TokenStorageService,
              private ancreService:AncreService,private modalService: NgbModal
              ,private title:Title,private translate: TranslateService) {
    this.getAllAncres();
  }

  ngOnInit() {
    this.translate.stream("consommable.ancre").subscribe(res=>{this.title.setTitle(res);});

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if(this.info.token!=null){
      this.getAllAncres();
    }else {
      this.route.navigate(['login'])
    }}

  addAncre() {
    if(isNaN(this.ancre.qte_stck)){
      this.qtestckbool=true;
    }else
    if(isNaN(this.ancre.seuil_max)){
      this.seuilbool=true
      }
    else{
      this.seuilbool=false;
      this.qtestckbool=false;
      if(this.ancre.qte_stck>this.ancre.seuil_max){
        this.test=false}
        else{
    this.ancreService.addAncre(this.ancre).subscribe(res=>{



        this.test=true;
        this.c();
        this.getAllAncres();


    });
  }
  }}

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  openVertically(content,id){
    this.ancreService.getAncre(id).subscribe(res =>{this.ancre=res as Ancre;
      this.listrech=this.ancre.recharges as Recharge[];
      this.dataSourceaff = new MatTableDataSource(this.listrech);
      this.dataSourceaff.paginator = this.paginator;
      this.dataSourceaff.sort = this.sort;});

    this.modalService.open(content, { centered: true });
}

openVerticallyCenteredEdit(content,id) {
    this.ancreService.getAncre(id).subscribe(res =>{this.ancre=res as Ancre; });
    this.modalService.open(content, { centered: true });
  }

  editAncre(){
    if(isNaN(this.ancre.qte_stck)){
      this.qtestckbool=true;
    }else
    if(isNaN(this.ancre.seuil_max)){
      this.seuilbool=true
    }
    else{
      this.seuilbool=false;
      this.qtestckbool=false;
      if(this.ancre.qte_stck>this.ancre.seuil_max){
        this.test=false
      }
      else {
        this.ancreService.updateAncre(this.ancre).subscribe(res => {


          this.test = true;
          this.c();
          this.getAllAncres();


        });
      }}
  }

  getAllAncres(){
    this.ancreService.getAllAncre()
      .subscribe(res => {
        this.data=res;
        this.listAncre = res as Ancre[];
        this.dataSource = new MatTableDataSource(this.listAncre);
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
    this.ancre.qte_stck=null;this.ancre.seuil_max=null;this.ancre.des='';
    this.modalService.dismissAll();
  }

  deleteAncre(){
    this.ancreService.deleteAncre(this.ancre.id).subscribe(res => {
    this.modalService.dismissAll(this.ancre);
    this.getAllAncres();});
  }

  openVerticallydelete(contentdelete,id){
    this.ancreService.getAncre(id).subscribe(res =>{this.ancre=res as Ancre; });
    this.modalService.open(contentdelete);

  }

}
