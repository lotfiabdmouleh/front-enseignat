import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";
import {Recharge} from "../../models/recharge";
import {Ancre} from "../../models/ancre";
import {Photocopieur} from "../../models/photocopieur";
import {Router} from "@angular/router";
import {HttpClient, HttpEventType, HttpResponse} from "@angular/common/http";
import {TokenStorageService} from "../../auth/token-storage.service";
import {RechargeService} from "../../services/recharge.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AncreService} from "../../services/ancre.service";
import {PhotocopieurService} from "../../services/photocopieur.service";
import {DemandeTirage} from "../../models/demandeTirage";
import {Enseignemant} from "../../models/enseignemant";
import {Departement} from "../../models/departement";
import {Enseignant} from "../../models/enseignant";
import {Matiere} from "../../models/matiere";
import {Groupe} from "../../models/groupe";
import {Annee} from "../../models/annee";
import {Semester} from "../../models/semestre";
import {DepartementService} from "../../services/departement.service";
import {MatiereService} from "../../services/matiere.service";
import {EnseignantService} from "../../services/enseignant.service";
import {GroupeService} from "../../services/groupe.service";
import {SemestreService} from "../../services/semestre.service";
import {AnneeService} from "../../services/annee.service";
import {EnseignementService} from "../../services/enseignement.service";
import {DemandetirageService} from "../../services/demandetirage.service";
import {Observable} from "rxjs";
import {UploadFileService} from "../../services/upload-file.service";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-demande-tirage',
  templateUrl: './demande-tirage.component.html',
  styleUrls: ['./demande-tirage.component.css']
})
export class DemandeTirageComponent implements OnInit {

  displayedColumns: string[] = ['date',  'ens', 'file', 'nb_copie','groupe','matiere','departement', 'etatt','actions'];
  dataSource: MatTableDataSource<DemandeTirage>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  id:any;
  listEnseignemant: Enseignemant[];
  listDepartement: Departement[]=[];
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  fichier:any;
  fileUploads: Observable<any>;
  listMatiere: Matiere[]=[];
  listGroupe: Groupe[]=[];
  listAnnee: Annee[]=[];
  listSemestre: Semester[]=[];
  listdemande: DemandeTirage[]=[];
  demande: DemandeTirage = new DemandeTirage();
  info: any;
  gr:Groupe=new Groupe();
  selectedens: Enseignant;
  selecteddep: Departement;
  selectedmat: Matiere;
  selectedgrp: Groupe;
  selectedsem: Semester;
  selectedann: Annee;
  data: any;
user:User=new User();
  constructor(private route: Router, private http: HttpClient, private token: TokenStorageService,
              private depService: DepartementService, private modalService: NgbModal,
              private matiereService: MatiereService, private enseignantService: EnseignantService,
              private  groupeService: GroupeService, private semService: SemestreService,
              private uploadService: UploadFileService,
              private anneeService: AnneeService,private userService : UserService,
              private enseignementService: EnseignementService, private demandeService: DemandetirageService
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



this.userService.getUserByName(this.token.getUsername()).subscribe(res=>this.user=res as User);
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
        console.log(err);
      });

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
      console.log('deleted')
    });
    this.c();
    this.getAllDemandeTirage();

  }

  openVerticallydelete(contentdelete, id) {
    this.demandeService.getdemandeTirage(id).subscribe(res => {
      this.demande = res as DemandeTirage;

    });
    this.modalService.open(contentdelete);
  }



}
