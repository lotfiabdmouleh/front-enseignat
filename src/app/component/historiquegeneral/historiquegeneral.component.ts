import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from '../../auth/token-storage.service';
import {HistoriqueService} from '../../services/historique.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-historiquegeneral',
  templateUrl: './historiquegeneral.component.html',
  styleUrls: ['./historiquegeneral.component.css']
})
export class HistoriquegeneralComponent implements OnInit {
  displayedColumns: string[] = ['user', 'action', 'date'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginatordetail: MatPaginator;
  @ViewChild(MatSort) sortdetail: MatSort;
  Historique:any;
  listhistory: any;
  listDetail:any;
  info: any;

  constructor(private route: Router, private http: HttpClient, private token: TokenStorageService,
              private historiqueService: HistoriqueService,private modalService: NgbModal,private title:Title,private translate: TranslateService) {
  }

  ngOnInit() {
    this.translate.stream("historique.hist").subscribe(res=>{this.title.setTitle(res);});

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if (this.info.token != null) {
      this.getAllHistory();
      this.historiqueService.getAllHistory().subscribe()

    } else {
      this.route.navigate(['login'])
    }
  }

  getAllHistory() {
    this.historiqueService.getAllHistory()
      .subscribe((res:any) => {
        this.listhistory = res ;
        this.dataSource = new MatTableDataSource(this.listhistory);
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




}
