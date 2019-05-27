import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from '../../auth/token-storage.service';
import {HistoriqueService} from '../../services/historique.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-historiquegeneral',
  templateUrl: './historiquegeneral.component.html',
  styleUrls: ['./historiquegeneral.component.css']
})
export class HistoriquegeneralComponent implements OnInit {
  displayedColumns: string[] = ['id','user', 'action', 'date','actions'];
  dataSource: MatTableDataSource<any>;
  dataSourcedetail:MatTableDataSource<any>;
  displayedColumnsdetail:string[] = ['user','nom','prenom', 'date'];

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
              private historiqueService: HistoriqueService,private modalService: NgbModal) {
  }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if (this.info.token != null) {
      this.getAllHistory();
      this.historiqueService.getAllHistory().subscribe(res=>console.log(res))

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
        console.log(res);
      }, err => {
        console.log(err);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }}

  applyFilterdetail(filterValue: string) {
    this.dataSourcedetail.filter = filterValue.trim().toLowerCase();

    if (this.dataSourcedetail.paginator) {
      this.dataSourcedetail.paginator.firstPage();
    }}
  historyDetail(id:any){
    console.log(id);
    this.historiqueService.getHistoryDetail(id).subscribe((res:any) => {
      this.listDetail = res ;
      this.dataSourcedetail = new MatTableDataSource(this.listDetail);
      this.dataSourcedetail.paginator = this.paginatordetail;
      this.dataSourcedetail.sort = this.sortdetail;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  openVerticallydetail(contentdetail,id){
    this.historyDetail(id);
    this.modalService.open(contentdetail);
  }
}
