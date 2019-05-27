import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";
import {Ancre} from "../../models/ancre";
import {Photocopieur} from "../../models/photocopieur";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../../auth/token-storage.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Enseignemant} from "../../models/enseignemant";
import {EnseignementService} from "../../services/enseignement.service";
import {DepartementService} from "../../services/departement.service";
import {MatiereService} from "../../services/matiere.service";
import {EnseignantService} from "../../services/enseignant.service";
import {GroupeService} from "../../services/groupe.service";
import {Departement} from "../../models/departement";
import {Enseignant} from "../../models/enseignant";
import {Matiere} from "../../models/matiere";
import {Groupe} from "../../models/groupe";
import {SemestreService} from "../../services/semestre.service";
import {AnneeService} from "../../services/annee.service";
import {Annee} from "../../models/annee";
import {Semester} from "../../models/semestre";

@Component({
  selector: 'app-enseignement',
  templateUrl: './enseignement.component.html',
  styleUrls: ['./enseignement.component.css']
})
export class EnseignementComponent implements OnInit {


  displayedColumns: string[] = ['date','departement','enseignant','groupe','matiere','sem','annee','actions'];
  dataSource: MatTableDataSource<Enseignemant>;

 @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table:MatTable<any>;
  listEnseignemant:Enseignemant[];
  listDepartement:Departement[];
  listEnseignant:Enseignant[];
  listMatiere:Matiere[];
  listGroupe:Groupe[];
  listAnnee:Annee[];
  listSemestre:Semester[];

  enseignemant:Enseignemant=new Enseignemant();
  info:any;
  selectedens:Enseignant;
  selecteddep:Departement;
  selectedmat:Matiere;
  selectedgrp:Groupe;
  selectedsem:Semester;
  selectedann:Annee;
  data:any;
  constructor(private route:Router,private http: HttpClient,private token: TokenStorageService,
              private depService:DepartementService,private modalService: NgbModal,
              private matiereService:MatiereService,private enseignantService:EnseignantService,
              private  groupeService:GroupeService,private semService:SemestreService,private anneeService:AnneeService,
              private enseignementService:EnseignementService
  ) {
    this.getAllEnseignemants();


  }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if(this.info.token!=null){
      this.getAllEnseignemants();
    }else {
      this.route.navigate(['login'])
    }
    this.depService.getAlldepartement()
      .subscribe(res => {this.listDepartement = res as Departement[];},
          err => {
        console.log(err);
      });

    this.groupeService.getAllgroupe()
      .subscribe(res => {this.listGroupe = res as Groupe[];},
          err => {
        console.log(err);
      });

    this.matiereService.getAllmatiere()
      .subscribe(res => {this.listMatiere = res as Matiere[];},
          err => {
        console.log(err);
      });
    this.anneeService.getAllAnnee()
      .subscribe(res => {this.listAnnee = res as Annee[];},
          err => {
        console.log(err);
      });
    this.semService.getAllsemestre()
      .subscribe(res => {this.listSemestre = res as Semester[];},
          err => {
        console.log(err);
      });
 this.enseignantService.getAllenseignants()
      .subscribe(res => {this.listEnseignant = res as Enseignant[];},
          err => {
        console.log(err);
      });


  }

  addEnseignemant() {

    this.enseignementService.addenseignemant(this.enseignemant,this.selecteddep,this.selectedens,this.selectedgrp,this.selectedmat,this.selectedsem,this.selectedann);
    this.c();
    this.getAllEnseignemants();
  }
  openVerticallyCentered(content) {

    this.modalService.open(content, { centered: true });

  }

  openVerticallyCenteredEdit(content,id) {

    this.enseignementService.getdenseignemant(id).subscribe(res =>{this.enseignemant=res as Enseignemant;console.log(this.enseignemant);});

    this.modalService.open(content, { centered: true });
  }


  editEnseignemant(){
    this.enseignementService.updateenseignemant(this.enseignemant,this.selecteddep,this.selectedens,this.selectedgrp,this.selectedmat,this.selectedsem,this.selectedann).subscribe(res=>{this.ngOnInit()});
    this.c();
  }

  getAllEnseignemants(){
    this.enseignementService.getAllenseignemant()
      .subscribe(res => {
        this.data=res,console.log(this.data);
        this.listEnseignemant = res as Enseignemant[];

        this.dataSource = new MatTableDataSource(this.listEnseignemant);
        this.dataSource.filterPredicate = (data, filter) => {
          let valid = false;

          const transformedFilter = filter.trim().toLowerCase();

          Object.keys(data).map(key => {
            if (
              key === 'departement' &&
              (data.departement.nom_dep.toLowerCase().includes(transformedFilter) )||
              key === 'groupe' &&
              (data.groupe.nom_grp.toLowerCase().includes(transformedFilter) )||
              key === 'matiere' &&
              (data.matiere.nom_mat.toLowerCase().includes(transformedFilter) )||
              key === 'enseignant' &&
              (data.enseignant.name.toLowerCase().includes(transformedFilter) )||
              key === 'semestre' &&
              (data.semestre.semestre.toString().toLowerCase().includes(transformedFilter) )||
              key === 'annee' &&
              (data.annee.annee.toLowerCase().includes(transformedFilter) )
            ) {
              valid = true;
            } else {
              if (('' + data[key]).toLowerCase().includes(transformedFilter)) {
                valid = true;
              }
            }
          });

          return valid;
        }
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
    }
    }

  Imprimer(){
    this.enseignantService.impression().subscribe(res=>{this.ngOnInit()});
  }

  c(){

    this.modalService.dismissAll();
  }

  deleteEnseignemant(){
    this.enseignementService.deleteenseignemant(this.enseignemant.id).subscribe(res => {console.log('deleted') });
    this.c();
    this.getAllEnseignemants();


  }

  openVerticallydelete(contentdelete,id){
    this.enseignementService.getdenseignemant(id).subscribe(res =>{this.enseignemant=res as Enseignemant;console.log(this.enseignemant);});
    this.modalService.open(contentdelete);
  }

}
