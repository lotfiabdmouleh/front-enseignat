import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";

import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../../auth/token-storage.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

import {DemandeTirage} from "../../models/demandeTirage";

import {DepartementService} from "../../services/departement.service";
import {MatiereService} from "../../services/matiere.service";
import {EnseignantService} from "../../services/enseignant.service";
import {GroupeService} from "../../services/groupe.service";
import {SemestreService} from "../../services/semestre.service";
import {AnneeService} from "../../services/annee.service";
import {EnseignementService} from "../../services/enseignement.service";
import {DemandetirageService} from "../../services/demandetirage.service";
import {UploadFileService} from "../../services/upload-file.service";
import {UserService} from "../../services/user.service";
import {DatePipe} from '@angular/common';
import {Enseignant} from "../../models/enseignant";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-demande-tirage',
  templateUrl: './demande-tirage.component.html',
  styleUrls: ['./demande-tirage.component.css']
})
export class DemandeTirageComponent implements OnInit{

  displayedColumns: string[] = ['dateAjout',  'dateModification', 'file', 'nb_copie','groupe','matiere','departement', 'etatt','actions'];
  dataSource: MatTableDataSource<DemandeTirage>=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  id:any;
  enseignant:Enseignant=new Enseignant();
  progress: { percentage: number } = { percentage: 0 };
  date:any;
  listdemande: DemandeTirage[]=[];
  demande: DemandeTirage = new DemandeTirage();
  info: any;

  data: any;

  constructor(private route: Router, private http: HttpClient, private token: TokenStorageService,
              private depService: DepartementService, private modalService: NgbModal,
              private matiereService: MatiereService, private enseignantService: EnseignantService,
              private  groupeService: GroupeService, private semService: SemestreService,
              private uploadService: UploadFileService,public datepipe: DatePipe,
              private anneeService: AnneeService,private userService : UserService,
              private enseignementService: EnseignementService, private demandeService: DemandetirageService
    ,private title:Title,private translate: TranslateService
  ) {

  }

  ngOnInit() {
    this.translate.stream("demande.dem").subscribe(res=>{this.title.setTitle(res);});

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



  }

  getAllDemandeTirage() {

    this.demandeService.getAlldemandeTiragebyuser(this.token.getUsername())
      .subscribe(res => {
        this.listdemande = res as DemandeTirage[];
        this.dataSource = new MatTableDataSource(this.listdemande);
        this.dataSource.filterPredicate = (data, filter) => {
          let valid = false;

          const transformedFilter = filter.trim().toLowerCase();

          Object.keys(data).map(key => {
            if (
              key === 'enseignement' &&
              (data.enseignement.departement.nom_dep.toLowerCase().includes(transformedFilter) )||

             key === 'enseignement' &&
              (data.enseignement.groupe.nom_grp.toLowerCase().includes(transformedFilter) )||
              key === 'enseignement' &&
              (data.enseignement.matiere.nom_mat.toLowerCase().includes(transformedFilter) )||
              key === 'enseignement' &&
              (data.enseignement.enseignant.name.toLowerCase().includes(transformedFilter) )||
              key === 'enseignement' &&
              (data.enseignement.semestre.semestre.toString().toLowerCase().includes(transformedFilter) )||
              key === 'enseignement' &&
              (data.enseignement.annee.annee.toLowerCase().includes(transformedFilter) )
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


  aller(){
    this.route.navigate(['/full/component/adddemandetirage']);
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

  deleteDemande() {
    this.demandeService.deletedemandeTirage(this.demande.id).subscribe(res => {
    this.c();
    this.getAllDemandeTirage();
  });
  }

  openVerticallydelete(contentdelete, id) {
    this.demandeService.getdemandeTirage(id).subscribe(res => {
      this.demande = res as DemandeTirage;

    });
    this.modalService.open(contentdelete,{centered:true, backdrop : 'static', keyboard : false});
  }



}
