import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";
import {Departement} from "../../models/departement";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../../auth/token-storage.service";
import {DepartementService} from "../../services/departement.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Matiere} from "../../models/matiere";
import {MatiereService} from "../../services/matiere.service";

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css']
})
export class MatiereComponent implements OnInit {

 displayedColumns: string[] = ['Matiere','actions'];
  dataSource: MatTableDataSource<Matiere>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table:MatTable<any>;
  listMatiere:Matiere[];
  matiere:Matiere=new Matiere();
  info:any;

  selected:any;
  data:any;
  constructor(private route:Router,private http: HttpClient,private token: TokenStorageService,
              private matiereService:MatiereService,private modalService: NgbModal,
              private changed:ChangeDetectorRef) {
    this.getAllMatieres();

  }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if(this.info.token!=null){
      this.getAllMatieres();
    }else {
      this.route.navigate(['login'])
    }}

  addMatiere() {
    this.matiereService.addmatiere(this.matiere);
    this.c();
    this.getAllMatieres();
  }
  openVerticallyCentered(content) {

    this.modalService.open(content, { centered: true });

  }

  openVerticallyCenteredEdit(content,id) {

    this.matiereService.getmatiere(id).subscribe(res =>{this.matiere=res as Matiere;console.log(this.matiere);});

    this.modalService.open(content, { centered: true });
  }


  editMatiere(){
    this.matiereService.updatematiere(this.matiere).subscribe(res=>{this.ngOnInit()});
    this.c();  }

  getAllMatieres(){
    this.matiereService.getAllmatiere()
      .subscribe(res => {
        this.data=res,console.log(this.data);
        this.listMatiere = res as Matiere[];

        this.dataSource = new MatTableDataSource(this.listMatiere);
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
    this.matiereService.impression().subscribe(res=>{this.ngOnInit()});
  }

  c(){
  this.matiere.nom_mat='';

    this.modalService.dismissAll();
  }

  deleteMatiere(){
    this.matiereService.deletematiere(this.matiere.id).subscribe(res => {console.log('deleted') });
    this.modalService.dismissAll(this.matiere);
    this.getAllMatieres();


  }
  openVerticallydelete(contentdelete,id){
    this.matiereService.getmatiere(id).subscribe(res =>{this.matiere=res as Matiere;console.log(this.matiere);});
    this.modalService.open(contentdelete);
  }


}
