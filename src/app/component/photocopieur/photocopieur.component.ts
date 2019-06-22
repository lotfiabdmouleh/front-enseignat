import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../../auth/token-storage.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Photocopieur} from "../../models/photocopieur";
import {PhotocopieurService} from "../../services/photocopieur.service";
import {Recharge} from "../../models/recharge";
import {Intervention} from "../../models/intervention";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-photocopieur',
  templateUrl: './photocopieur.component.html',
  styleUrls: ['./photocopieur.component.css']
})
export class PhotocopieurComponent implements OnInit {

  displayedColumns: string[] = ['reference','des','actions'];
  dataSource: MatTableDataSource<Photocopieur>;
  displayedColumnsinter: string[] = ['date','intervention'];
  dataSourceinter: MatTableDataSource<Intervention>;
  displayedColumnsaff: string[] = ['date','photocopieur'];
  dataSourceaff : MatTableDataSource<Recharge>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table:MatTable<any>;
  listPhotocopieur:Photocopieur[];
  photocopieur:Photocopieur=new Photocopieur();
  info:any;
  listrech:Recharge[];
  listinter:Intervention[];
  selected:any;
  data:any;
  constructor(private route:Router,private http: HttpClient,private token: TokenStorageService,
              private photocopieurService:PhotocopieurService,private modalService: NgbModal,private title:Title,private translate: TranslateService
  ) {
    this.getAllPhotocopieurs();

  }

  ngOnInit() {
    this.translate.stream("photocopieur.ph").subscribe(res=>{this.title.setTitle(res);});

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if(this.info.token!=null){
      this.getAllPhotocopieurs();
    }else {
      this.route.navigate(['login'])
    }}

  addPhotocopieur() {
    this.photocopieurService.addphotocopieur(this.photocopieur).subscribe(res=>{

this.photocopieur.reference ='';
      this.photocopieur.des='';
      this.modalService.dismissAll();
      this.getAllPhotocopieurs();
    });

  }
  openVerticallyCentered(content) {

    this.modalService.open(content, { centered: true });

  }

  openVerticallyCenteredEdit(content,id) {

    this.photocopieurService.getphotocopieur(id).subscribe(res =>{this.photocopieur=res as Photocopieur});

    this.modalService.open(content, { centered: true });
  }


  editPhotocopieur(){
    this.photocopieurService.updatephotocopieur(this.photocopieur).subscribe(res=>{this.ngOnInit()});
    this.photocopieur.reference ='';
    this.photocopieur.des='';
    this.modalService.dismissAll();
  }

  getAllPhotocopieurs(){
    this.photocopieurService.getAllphotocopieur()
      .subscribe(res => {
        this.data=res;
        this.listPhotocopieur = res as Photocopieur[];

        this.dataSource = new MatTableDataSource(this.listPhotocopieur);
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


  openVerticallyinter(contentinter,id){
    this.photocopieurService.getphotocopieur(id).subscribe(res =>{this.photocopieur=res as Photocopieur;
      this.listinter=this.photocopieur.interventions as Intervention[];
      this.dataSourceinter = new MatTableDataSource(this.listinter);
      this.dataSourceinter.paginator = this.paginator;
      this.dataSourceinter.sort = this.sort;});


    this.modalService.open(contentinter, { centered: true });
  }
  openVertically(content,id){
    this.photocopieurService.getphotocopieur(id).subscribe(res =>{this.photocopieur=res as Photocopieur
      this.listrech=this.photocopieur.recharges as Recharge[];
      this.dataSourceaff = new MatTableDataSource(this.listrech);
      this.dataSourceaff.paginator = this.paginator;
      this.dataSourceaff.sort = this.sort;});

    this.modalService.open(content, { centered: true });
  }
  c(){
    this.photocopieur.reference ='';
    this.photocopieur.des='';
    this.modalService.dismissAll();
  }

  deletePhotocopieur(){
    this.photocopieurService.deletephotocopieur(this.photocopieur.id).subscribe(res => {

    this.modalService.dismissAll();

    this.getAllPhotocopieurs();
  });

  }
  openVerticallydelete(contentdelete,id){
    this.photocopieurService.getphotocopieur(id).subscribe(res =>{this.photocopieur=res as Photocopieur});
    this.modalService.open(contentdelete);
  }

}
