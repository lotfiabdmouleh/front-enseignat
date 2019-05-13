import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";
import {Departement} from "../../models/departement";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../../auth/token-storage.service";
import {DepartementService} from "../../services/departement.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Groupe} from "../../models/groupe";
import {GroupeService} from "../../services/groupe.service";

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.css']
})
export class GroupeComponent implements OnInit {

  displayedColumns: string[] = ['groupe','nbetd','niveau','filiere','actions'];
  dataSource: MatTableDataSource<Groupe>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table:MatTable<any>;
  listGroupe:Groupe[];
  groupe:Groupe=new Groupe();
  info:any;

  selected:any;
  data:any;
  constructor(private route:Router,private http: HttpClient,private token: TokenStorageService,
              private groupeService:GroupeService,private modalService: NgbModal,
              private changed:ChangeDetectorRef) {
    this.getAllGroupes();

  }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if(this.info.token!=null){
      this.getAllGroupes();
    }else {
      this.route.navigate(['login'])
    }}

  addGroupe() {
    this.groupeService.addgroupe(this.groupe);

    this.modalService.dismissAll(this.groupe);
    this.getAllGroupes();
  }
  openVerticallyCentered(content) {

    this.modalService.open(content, { centered: true });

  }

  openVerticallyCenteredEdit(content,id) {

    this.groupeService.getgroupe(id).subscribe(res =>{this.groupe=res as Groupe;console.log(this.groupe);});

    this.modalService.open(content, { centered: true });
  }


  editGroupe(){
    this.groupeService.updategroupe(this.groupe).subscribe(res=>{this.ngOnInit()});
    this.modalService.dismissAll(this.groupe);
  }

  getAllGroupes(){
    this.groupeService.getAllgroupe()
      .subscribe(res => {
        this.data=res,console.log(this.data);
        this.listGroupe = res as Groupe[];

        this.dataSource = new MatTableDataSource(this.listGroupe);
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
    this.groupeService.impression().subscribe(res=>{this.ngOnInit()});
  }

  c(){

    this.modalService.dismissAll();
  }

  deleteGroupe(){
    this.groupeService.deletegroupe(this.groupe.id).subscribe(res => {console.log('deleted') });
    this.modalService.dismissAll(this.groupe);

    this.getAllGroupes();


  }
  openVerticallydelete(contentdelete,id){
    this.groupeService.getgroupe(id).subscribe(res =>{this.groupe=res as Groupe;console.log(this.groupe);});
    this.modalService.open(contentdelete);
  }

}
