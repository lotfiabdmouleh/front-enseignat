import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../../auth/token-storage.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Departement} from "../../models/departement";
import {DepartementService} from "../../services/departement.service";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css']
})
export class DepartementComponent implements OnInit  {

  displayedColumns: string[] = ['departement','actions'];
  dataSource: MatTableDataSource<Departement>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table:MatTable<any>;
  listDepartement:Departement[];
  departement:Departement=new Departement();
  info:any;

  selected:any;
  data:any;
  constructor(private route:Router,private http: HttpClient,private token: TokenStorageService,
              private departementService:DepartementService,private modalService: NgbModal,
              private changed:ChangeDetectorRef ,private title:Title,private translate: TranslateService) {
    this.getAllDepartements();

  }

  ngOnInit() {
    this.translate.stream("departement.dep").subscribe(res=>{this.title.setTitle(res);});

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if(this.info.token!=null){
      this.getAllDepartements();
    }else {
      this.route.navigate(['login'])
    }}

  addDepartement() {
    this.departementService.adddepartement(this.departement).subscribe(res=>{
      this.c();

      this.getAllDepartements();
    });


  }
  openVerticallyCentered(content) {

    this.modalService.open(content, { centered: true });

  }

  openVerticallyCenteredEdit(content,id) {

    this.departementService.getdepartement(id).subscribe(res =>{this.departement=res as Departement;});

    this.modalService.open(content, { centered: true });
  }


  editDepartement(){
    this.departementService.updatedepartement(this.departement).subscribe(res=>{this.ngOnInit()});
    this.c();
  }

  getAllDepartements(){
    this.departementService.getAlldepartement()
      .subscribe(res => {
        this.data=res;
        this.listDepartement = res as Departement[];

        this.dataSource = new MatTableDataSource(this.listDepartement);
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

  Imprimer(){
    this.departementService.impression().subscribe(res=>{this.ngOnInit()});
  }

  c(){
    this.departement.nom_dep='';
    this.modalService.dismissAll();
  }

  deleteDepartement(){
    this.departementService.deletedepartement(this.departement.id).subscribe(res => {
    this.modalService.dismissAll(this.departement);

    this.getAllDepartements();
  });

  }
  openVerticallydelete(contentdelete,id){
    this.departementService.getdepartement(id).subscribe(res =>{this.departement=res as Departement; });
    this.modalService.open(contentdelete);
  }


}
