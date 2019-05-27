import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";
import {DemandeTirage} from "../../models/demandeTirage";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {HttpClient, HttpEventType, HttpResponse} from "@angular/common/http";
import {TokenStorageService} from "../../auth/token-storage.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MatiereService} from "../../services/matiere.service";
import {EnseignantService} from "../../services/enseignant.service";

import {UserService} from "../../services/user.service";
import {DemandetirageService} from "../../services/demandetirage.service";
import {PapierService} from "../../services/papier.service";
import {PhotocopieurService} from "../../services/photocopieur.service";
import {Photocopieur} from "../../models/photocopieur";
import {Papier} from "../../models/papier";
import {TirageService} from "../../services/tirage.service";

@Component({
  selector: 'app-tirage',
  templateUrl: './tirage.component.html',
  styleUrls: ['./tirage.component.css']
})
export class TirageComponent implements OnInit {


  displayedColumns: string[] = ['date',  'ens', 'file', 'nbgrp','actions'];
  dataSource: MatTableDataSource<DemandeTirage>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  id:any;



  listPh: Photocopieur[]=[];
  listPapier: Papier[]=[];
  listdemande: DemandeTirage[]=[];
  demande: DemandeTirage = new DemandeTirage();
  info: any;

  selectedph: Photocopieur;
  selectedpapier: Papier;
  data: any;
  user:User=new User();
  constructor(private route: Router, private http: HttpClient, private token: TokenStorageService,
           private modalService: NgbModal,private phService:PhotocopieurService,
              private matiereService: MatiereService, private enseignantService: EnseignantService,private tirageService:TirageService,
              private userService : UserService,private papierService:PapierService,
              private demandeService: DemandetirageService
  ) {


  }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if (this.info.token != null) {
      this.getAllDemandeTirage()
    } else {
      this.route.navigate(['login'])
    }


    this.phService.getAllphotocopieur()
      .subscribe(res => {
          this.listPh = res as Photocopieur[];
        },
        err => {
          console.log(err);
        });
    this.papierService.getAllpapier()
      .subscribe(res => {
          this.listPapier = res as Papier[];
        },
        err => {
          console.log(err);
        });
    this.userService.getUserByName(this.token.getUsername()).subscribe(res=>this.user=res as User);
  }

  getAllDemandeTirage() {
    this.tirageService.getdemande()
      .subscribe(res => {
        this.data = res, console.log(this.data);
        this.listdemande = res as DemandeTirage[];
        this.dataSource = new MatTableDataSource(this.listdemande);
        this.dataSource.filterPredicate = (data, filter) => {
          let valid = false;

          const transformedFilter = filter.trim().toLowerCase();

          Object.keys(data).map(key => {
            if (
             key === 'enseignement' &&
              (data.enseignement.groupe.nom_grp.toLowerCase().includes(transformedFilter) )||
              key === 'enseignement' &&
              (data.enseignement.enseignant.name.toLowerCase().includes(transformedFilter) )
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

  addTirage() {
console.log(this.demande);
    this.tirageService.addtirage(this.demande,  this.user.id, this.selectedpapier,this.selectedph);
    this.getAllDemandeTirage();
    this.c();
  }

  openVerticallyCentered(content) {

    this.modalService.open(content, {centered: true});

  }

  openVerticallyCenteredEdit(content, id) {

    this.demandeService.getdemandeTirage(id).subscribe(res => {
      this.demande = res as DemandeTirage;
      console.log(this.demande);
    });

    this.modalService.open(content, {centered: true});
  }



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  Imprimer() {
    this.demandeService.impressiondemandeTirage().subscribe(res => {
      this.ngOnInit()
    });
  }

  c() {

    this.modalService.dismissAll();
  }


  openVertically(content, id) {
    this.demandeService.getdemandeTirage(id).subscribe(res => {
      this.demande = res as DemandeTirage;
    });
    this.modalService.open(content);
  }

  openVerticallyValid(id){
    this.demandeService.getdemandeTirage(id).subscribe(res=>{
      this.demande=res as DemandeTirage;
      this.tirageService.modFile("Votre document est en cours d impression",id);
      this.getAllDemandeTirage();
    },err=>
    {console.log(err);});
}

openVerticallyInvalid(id){
    this.demandeService.getdemandeTirage(id).subscribe(res=>{
      this.demande=res as DemandeTirage;
      this.tirageService.modFile("Interdit d'imprimer un document cours",id);
        this.getAllDemandeTirage();

      },err=>{console.log(err);}
    );
}




}
