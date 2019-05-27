import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";
import {Annee} from "../../models/annee";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../../auth/token-storage.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AncreService} from "../../services/ancre.service";
import {AnneeService} from "../../services/annee.service";

@Component({
  selector: 'app-annee',
  templateUrl: './annee.component.html',
  styleUrls: ['./annee.component.css']
})
export class AnneeComponent implements OnInit {

  displayedColumns: string[] = ['annee','actions'];
  dataSource: MatTableDataSource<Annee>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table:MatTable<any>;
  listAnnee:Annee[];
  annee:Annee=new Annee();

  info:any;
  selected:any;
  data:any;
  constructor(private route:Router,private http: HttpClient,private token: TokenStorageService,
              private anneeService:AnneeService,private modalService: NgbModal) {
    this.getAllAnnees();
  }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if(this.info.token!=null){
      this.getAllAnnees();
    }else {
      this.route.navigate(['login'])
    }}

  addAnnee() {
    this.anneeService.addAnnee(this.annee);
    this.c();
    this.getAllAnnees();
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  openVerticallyCenteredEdit(content,id) {
    this.anneeService.getAnnee(id).subscribe(res =>{this.annee=res as Annee;console.log(this.annee);});
    this.modalService.open(content, { centered: true });
  }

  editAnnee(){
    this.anneeService.updateAnnee(this.annee).subscribe(res=>{this.ngOnInit()});
    this.c();
  }

  getAllAnnees(){
    this.anneeService.getAllAnnee()
      .subscribe(res => {
        this.data=res,console.log(this.data);
        this.listAnnee = res as Annee[];
        this.dataSource = new MatTableDataSource(this.listAnnee);
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
    this.annee.annee='';
    this.modalService.dismissAll();
  }

  deleteAnnee(){
    this.anneeService.deleteAnnee(this.annee.id).subscribe(res => {console.log('deleted') });
    this.modalService.dismissAll(this.annee);
    this.getAllAnnees();
  }

  openVerticallydelete(contentdelete,id){
    this.anneeService.getAnnee(id).subscribe(res =>{this.annee=res as Annee;console.log(this.annee);});
    this.modalService.open(contentdelete);

  }
  Imprimer(){
    this.anneeService.impression().subscribe(res=>{this.ngOnInit()});
  }
}
