import {Component, OnInit, ViewChild} from '@angular/core';
import {Papier} from "../../models/papier";
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";
import {TokenStorageService} from "../../auth/token-storage.service";
import {HttpClient} from "@angular/common/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PapierService} from "../../services/papier.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-papier',
  templateUrl: './papier.component.html',
  styleUrls: ['./papier.component.css']
})
export class PapierComponent implements OnInit {

  displayedColumns: string[] = ['format','nb_f','actions'];
  dataSource: MatTableDataSource<Papier>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table:MatTable<any>;
  listPapier:Papier[];
  papier:Papier=new Papier();
  info:any;

  selected:any;
  data:any;
  constructor(private route:Router,private http: HttpClient,private token: TokenStorageService,
              private papierService:PapierService,private modalService: NgbModal,
             ) {
    this.getAllPapiers();

  }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if(this.info.token!=null){
      this.getAllPapiers();
    }else {
      this.route.navigate(['login'])
    }}

  addPapier() {
    this.papierService.addpapier(this.papier);

    this.c();
    this.getAllPapiers();
  }
  openVerticallyCentered(content) {

    this.modalService.open(content, { centered: true });

  }

  openVerticallyCenteredEdit(content,id) {

    this.papierService.getpapier(id).subscribe(res =>{this.papier=res as Papier;console.log(this.papier);});

    this.modalService.open(content, { centered: true });
  }


  editPapier(){
    this.papierService.updatepapier(this.papier).subscribe(res=>{this.ngOnInit()});
    this.c();
  }

  getAllPapiers(){
    this.papierService.getAllpapier()
      .subscribe(res => {
        this.data=res,console.log(this.data);
        this.listPapier = res as Papier[];

        this.dataSource = new MatTableDataSource(this.listPapier);
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

  Imprimer(){
    this.papierService.impression().subscribe(res=>{this.ngOnInit()});
  }

  c(){

    this.modalService.dismissAll();
  }

  deletePapier(){
    this.papierService.deletepapier(this.papier.id).subscribe(res => {console.log('deleted') });
    this.modalService.dismissAll(this.papier);

    this.getAllPapiers();


  }
  openVerticallydelete(contentdelete,id){
    this.papierService.getpapier(id).subscribe(res =>{this.papier=res as Papier;console.log(this.papier);});
    this.modalService.open(contentdelete);
  }


}
