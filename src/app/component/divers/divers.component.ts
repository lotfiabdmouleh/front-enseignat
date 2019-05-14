import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";
import {Ancre} from "../../models/ancre";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../../auth/token-storage.service";
import {AncreService} from "../../services/ancre.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Divers} from "../../models/divers";
import {DiversService} from "../../services/divers.service";

@Component({
  selector: 'app-divers',
  templateUrl: './divers.component.html',
  styleUrls: ['./divers.component.css']
})
export class DiversComponent implements OnInit {


  displayedColumns: string[] = ['des','qte','seuil','actions'];
  dataSource: MatTableDataSource<Divers>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table:MatTable<any>;
  listDivers:Divers[];
  divers:Divers=new Divers();
  info:any;

  selected:any;
  data:any;
  constructor(private route:Router,private http: HttpClient,private token: TokenStorageService,
              private diversService:DiversService,private modalService: NgbModal,
  ) {
    this.getAllDivers();

  }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if(this.info.token!=null){
      this.getAllDivers();
    }else {
      this.route.navigate(['login'])
    }}

  addDivers() {
    this.diversService.addDivers(this.divers);

    this.c();
    this.getAllDivers();
  }
  openVerticallyCentered(content) {

    this.modalService.open(content, { centered: true });

  }

  openVerticallyCenteredEdit(content,id) {

    this.diversService.getdivers(id).subscribe(res =>{this.divers=res as Divers;console.log(this.divers);});

    this.modalService.open(content, { centered: true });
  }


  editDivers(){
    this.diversService.updatedivers(this.divers).subscribe(res=>{this.ngOnInit()});
    this.c();
  }

  getAllDivers(){
    this.diversService.getAlldivers()
      .subscribe(res => {
        this.data=res,console.log(this.data);
        this.listDivers = res as Divers[];

        this.dataSource = new MatTableDataSource(this.listDivers);
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

  c(){
    this.divers.des='';
    this.divers.qte_stck=null;this.divers.seuil_max=null;
    this.modalService.dismissAll();
  }

  deleteDivers(){
    this.diversService.deletedivers(this.divers.id).subscribe(res => {console.log('deleted') });
    this.modalService.dismissAll(this.divers);

    this.getAllDivers();


  }
  openVerticallydelete(contentdelete,id){
    this.diversService.getdivers(id).subscribe(res =>{this.divers=res as Divers;console.log(this.divers);});
    this.modalService.open(contentdelete);
  }
  Imprimer(){
    this.diversService.impression().subscribe(res=>{this.ngOnInit()});
  }

}
