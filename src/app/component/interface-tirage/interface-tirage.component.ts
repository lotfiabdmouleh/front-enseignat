import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";
import {DemandeTirage} from "../../models/demandeTirage";
import {Papier} from "../../models/papier";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../../auth/token-storage.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PhotocopieurService} from "../../services/photocopieur.service";
import {EnseignantService} from "../../services/enseignant.service";
import {DemandetirageService} from "../../services/demandetirage.service";
import {PapierService} from "../../services/papier.service";
import {UserService} from "../../services/user.service";
import {TirageService} from "../../services/tirage.service";
import {MatiereService} from "../../services/matiere.service";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-interface-tirage',
  templateUrl: './interface-tirage.component.html',
  styleUrls: ['./interface-tirage.component.css']
})
export class InterfaceTirageComponent implements OnInit,OnDestroy  {



  displayedColumns: string[] = ['dateAjout',  'ens', 'file', 'nbgrp','actions'];
  dataSource: MatTableDataSource<DemandeTirage>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  id:any;


  papier:Papier=new Papier();

  listdemande: DemandeTirage[]=[];
  demande: DemandeTirage = new DemandeTirage();
  info: any;
  b=true;
  private alive: boolean;

  data: any;
  user:User=new User();
  constructor(private route: Router, private http: HttpClient, private token: TokenStorageService,
              private modalService: NgbModal,private phService:PhotocopieurService,
              private matiereService: MatiereService, private enseignantService: EnseignantService,private tirageService:TirageService,
              private userService : UserService,private papierService:PapierService,
              private demandeService: DemandetirageService ,private title:Title,private translate: TranslateService
  ) {

  }

  ngOnInit() {
    this.translate.stream("demande.gest").subscribe(res=>{this.title.setTitle(res);});

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if (this.info.token != null) {
    this.getAllDemandeTirage();

    } else {
      this.route.navigate(['login'])
    }


    this.userService.getUserByName(this.token.getUsername()).subscribe(res=>this.user=res as User);

  }



  getAllDemandeTirage() {
    this.tirageService.getdemande()
      .subscribe(res => {
        this.data = res;
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

      });

  }



  openVerticallyCentered(content) {

    this.modalService.open(content, {centered: true});

  }

  openVerticallyCenteredEdit(content, id) {

    this.demandeService.getdemandeTirage(id).subscribe(res => {
      this.demande = res as DemandeTirage;

    });

    this.modalService.open(content, {centered: true});
  }



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  c() {

    this.modalService.dismissAll();
  }




  openVerticallyValid(id){
    this.demandeService.getdemandeTirage(id).subscribe(res=>{
      this.demande=res as DemandeTirage;
      this.tirageService.modFile("Votre document est en cours d impression",id);
      this.getAllDemandeTirage();
    },err=>
    { });
  }

  openVerticallyInvalid(id){
    this.demandeService.getdemandeTirage(id).subscribe(res=>{
        this.demande=res as DemandeTirage;
        this.tirageService.modFile("Interdit d'imprimer un document cours",id);
        this.getAllDemandeTirage();

      },err=>{}
    );
  }

  ngOnDestroy(){
    this.alive = false;
  }



}
