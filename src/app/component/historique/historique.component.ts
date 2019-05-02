import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../../auth/token-storage.service";
import {AgentService} from "../../services/agent.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RoleService} from "../../services/role.service";
import {HistoriqueService} from "../../services/historique.service";
import {Agent} from "../../models/agent";
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  displayedColumns: string[] = ['user', 'action', 'date'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  Historique:any;
  listhistory: any;
  info: any;

  constructor(private route: Router, private http: HttpClient, private token: TokenStorageService,
              private historiqueService: HistoriqueService) {
  }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if (this.info.token != null) {
      this.getAllHistory();

    } else {
      this.route.navigate(['login'])
    }
  }

  getAllHistory() {
    this.historiqueService.getHistory()
      .subscribe((res:any) => {
        this.listhistory = res ;
        this.dataSource = new MatTableDataSource(this.listhistory);
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
}
