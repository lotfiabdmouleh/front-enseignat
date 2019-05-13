import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";
import {Photocopieur} from "../../models/photocopieur";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../../auth/token-storage.service";
import {PhotocopieurService} from "../../services/photocopieur.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Ancre} from "../../models/ancre";
import {AncreService} from "../../services/ancre.service";

@Component({
  selector: 'app-ancre',
  templateUrl: './ancre.component.html',
  styleUrls: ['./ancre.component.css']
})
export class AncreComponent implements OnInit {

  displayedColumns: string[] = ['des','qte','seuil','actions'];
  dataSource: MatTableDataSource<Ancre>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table:MatTable<any>;
  listAncre:Ancre[];
  ancre:Ancre=new Ancre();
  info:any;

  selected:any;
  data:any;
  constructor(private route:Router,private http: HttpClient,private token: TokenStorageService,
              private ancreService:AncreService,private modalService: NgbModal,
  ) {
    this.getAllAncres();

  }

  ngOnInit() {
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
    this.ancreService.addAncre(this.ancre);

    this.modalService.dismissAll(this.ancre);
    this.getAllAncres();
  }
  openVerticallyCentered(content) {

    this.modalService.open(content, { centered: true });

  }

  openVerticallyCenteredEdit(content,id) {

    this.ancreService.getAncre(id).subscribe(res =>{this.ancre=res as Ancre;console.log(this.ancre);});

    this.modalService.open(content, { centered: true });
  }


  editAncre(){
    this.ancreService.updateAncre(this.ancre).subscribe(res=>{this.ngOnInit()});
    this.modalService.dismissAll(this.ancre);
  }

  getAllAncres(){
    this.ancreService.getAllAncre()
      .subscribe(res => {
        this.data=res,console.log(this.data);
        this.listAncre = res as Ancre[];

        this.dataSource = new MatTableDataSource(this.listAncre);
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

    this.modalService.dismissAll();
  }

  deleteAncre(){
    this.ancreService.deleteAncre(this.ancre.id).subscribe(res => {console.log('deleted') });
    this.modalService.dismissAll(this.ancre);

    this.getAllAncres();


  }
  openVerticallydelete(contentdelete,id){
    this.ancreService.getAncre(id).subscribe(res =>{this.ancre=res as Ancre;console.log(this.ancre);});
    this.modalService.open(contentdelete);
  }
  Imprimer(){
    this.ancreService.impression().subscribe(res=>{this.ngOnInit()});
  }

}
