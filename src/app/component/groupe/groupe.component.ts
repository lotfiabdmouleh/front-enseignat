import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../../auth/token-storage.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Groupe} from "../../models/groupe";
import {GroupeService} from "../../services/groupe.service";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

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
              private changed:ChangeDetectorRef,private title:Title,private translate: TranslateService) {
    this.getAllGroupes();

  }

  ngOnInit() {
    this.translate.stream("groupe.grp").subscribe(res=>{this.title.setTitle(res);});

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
    this.groupeService.addgroupe(this.groupe).subscribe(res=>{
      this.c();

      this.getAllGroupes();
    });

  }
  openVerticallyCentered(content) {

    this.modalService.open(content, { centered: true });

  }

  openVerticallyCenteredEdit(content,id) {

    this.groupeService.getgroupe(id).subscribe(res =>{this.groupe=res as Groupe; });

    this.modalService.open(content, { centered: true });
  }


  editGroupe(){
    this.groupeService.updategroupe(this.groupe).subscribe(res=>{this.ngOnInit()});
    this.c();  }

  getAllGroupes(){
    this.groupeService.getAllgroupe()
      .subscribe(res => {
        this.data=res;
        this.listGroupe = res as Groupe[];

        this.dataSource = new MatTableDataSource(this.listGroupe);
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


  c(){
    this.groupe.filiere='';this.groupe.niveau=null;this.groupe.nb_etd=null;this.groupe.nom_grp='';

    this.modalService.dismissAll();
  }

  deleteGroupe(){
    this.groupeService.deletegroupe(this.groupe.id).subscribe(res => {
    this.modalService.dismissAll(this.groupe);

    this.getAllGroupes();
  });

  }
  openVerticallydelete(contentdelete,id){
    this.groupeService.getgroupe(id).subscribe(res =>{this.groupe=res as Groupe;});
    this.modalService.open(contentdelete);
  }

}
