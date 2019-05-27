import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";
import {Semester} from "../../models/semestre";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../../auth/token-storage.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SemestreService} from "../../services/semestre.service";

@Component({
  selector: 'app-semestre',
  templateUrl: './semestre.component.html',
  styleUrls: ['./semestre.component.css']
})
export class SemestreComponent implements OnInit {

  displayedColumns: string[] = ['sem','actions'];
  dataSource: MatTableDataSource<Semester>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table:MatTable<any>;
  listSemester:Semester[];
  semstre:Semester=new Semester();

  info:any;
  selected:any;
  data:any;
  constructor(private route:Router,private http: HttpClient,private token: TokenStorageService,
              private semestreService:SemestreService,private modalService: NgbModal) {
    this.getAllSemestres();
  }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if(this.info.token!=null){
      this.getAllSemestres();
    }else {
      this.route.navigate(['login'])
    }}

  addSemestre() {
    this.semestreService.addsemestre(this.semstre);
    this.c();
    this.getAllSemestres();
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  openVerticallyCenteredEdit(content,id) {
    this.semestreService.getSemestre(id).subscribe(res =>{this.semstre=res as Semester;console.log(this.semstre);});
    this.modalService.open(content, { centered: true });
  }

  editSemestre(){
    this.semestreService.updateSemestre(this.semstre).subscribe(res=>{this.ngOnInit()});
    this.c();
  }

  getAllSemestres(){
    this.semestreService.getAllsemestre()
      .subscribe(res => {
        this.data=res,console.log(this.data);
        this.listSemester = res as Semester[];
        this.dataSource = new MatTableDataSource(this.listSemester);
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

  c(){
    this.semstre.semestre=null;
    this.modalService.dismissAll();
  }

  deleteSemestre(){
    this.semestreService.deleteSemestre(this.semstre.id).subscribe(res => {console.log('deleted') });
    this.modalService.dismissAll(this.semstre);
    this.getAllSemestres();
  }

  openVerticallydelete(contentdelete,id){
    this.semestreService.getSemestre(id).subscribe(res =>{this.semstre=res as Semester;console.log(this.semstre);});
    this.modalService.open(contentdelete);

  }
  Imprimer(){
    this.semestreService.impression().subscribe(res=>{this.ngOnInit()});
  }
}
