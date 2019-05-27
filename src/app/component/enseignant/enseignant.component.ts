import {ChangeDetectorRef, Component, ElementRef,  OnInit,  ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../../auth/token-storage.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EnseignantService} from "../../services/enseignant.service";
import {Enseignant} from "../../models/enseignant";
import {SignUpInfo} from "../../auth/signup-info";
import {DemandeTirage} from "../../models/demandeTirage";
import {Enseignemant} from "../../models/enseignemant";

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.css']
})
export class EnseignantComponent implements OnInit {
  displayedColumnsdemande: string[] = ['date', 'file', 'nbgrp'];
  dataSourcedemande: MatTableDataSource<DemandeTirage>;

  displayedColumns: string[] = ['nom','login','email','telephone','actions'];
  dataSource: MatTableDataSource<Enseignant>;
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table:MatTable<any>;
  @ViewChild('fileInput')
  fileInput: ElementRef;
  listEnseignant:Enseignant[];
  enseignant:Enseignant=new Enseignant();
  enseignement:Enseignemant=new Enseignemant();
  listDemande:DemandeTirage[];
  info:any;

  data:any;
  constructor(private route:Router,private http: HttpClient,private token: TokenStorageService,
              private enseignantService:EnseignantService,private modalService: NgbModal,
              private changed:ChangeDetectorRef) {
    this.getAllEnseignants();

  }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if(this.info.token!=null){
      this.getAllEnseignants();
    }else {
      this.route.navigate(['login'])
    }

  }


  openVerticallyCentered(content) {

    this.modalService.open(content, { centered: true });

  }

  openVerticallyCenteredEdit(content,id) {

    this.enseignantService.getEnseignant(id).subscribe(res =>{this.enseignant=res as Enseignant;console.log(this.enseignant);});

    this.modalService.open(content, { centered: true });
  }

  editEnseignant(){
    this.enseignantService.updateEnseignant(this.enseignant).subscribe(res=>{this.ngOnInit()});
    this.c();  }

  getAllEnseignants(){
    this.enseignantService.getAllenseignants()
      .subscribe(res => {
        this.data=res,console.log(this.data);
        this.listEnseignant = res as Enseignant[];

        this.dataSource = new MatTableDataSource(this.listEnseignant);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        console.log(err);
      });

  }
  openVerticallyCenteredMenu(contentMenu,id){
    this.enseignantService.getEnseignant(id).subscribe(res=>{
      this.enseignant=res as Enseignant;

      this.listDemande=this.enseignant.demandeTirages as DemandeTirage[];
            this.dataSourcedemande=new MatTableDataSource(this.listDemande);
      this.dataSourcedemande.paginator=this.paginator;
      this.dataSourcedemande.sort=this.sort;
    }      ,err=>{console.log(err)});
    this.modalService.open(contentMenu,{centered:true});

}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }}

  Imprimer(){
    this.enseignantService.impression().subscribe(res=>{this.ngOnInit()});
  }

  c(){
    this.form.name='';
      this.form.username='';
      this.form.email='';
      this.form.password='';
      this.form.tel='';
    this.modalService.dismissAll();
  }

  deleteEnseignant(){
    this.enseignantService.deleteenseignant(this.enseignant.id).subscribe(res => {console.log('deleted') });
    this.modalService.dismissAll(this.enseignant);
    this.getAllEnseignants();


  }
  openVerticallydelete(contentdelete,id){
    this.enseignantService.getEnseignant(id).subscribe(res =>{this.enseignant=res as Enseignant;console.log(this.enseignant);});
    this.modalService.open(contentdelete);
  }
  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password,
      this.form.tel,);

    this.enseignantService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;

        this.c();

        this.getAllEnseignants();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
