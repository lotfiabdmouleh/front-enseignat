import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatInput, MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";
import {DemandetirageService} from "../../services/demandetirage.service";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-enseignantstatistique',
  templateUrl: './enseignantstatistique.component.html',
  styleUrls: ['./enseignantstatistique.component.css']
})
export class EnseignantstatistiqueComponent implements OnInit,OnDestroy {
  @ViewChild('input',{read:MatInput}) input :MatInput;
  @ViewChild('inputf',{read:MatInput}) inputf :MatInput;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table:MatTable<any>;
  displayedColumns: string[] = ['enseignant', 'nb_copie'];
etat=false;

  dataSource: MatTableDataSource<any>;
  lstcop:any=[];
  min=new Date(2019,6,1);
disabled=true;
  dated: any;
  datef: any;
  startDate = new Date();

  constructor(private demandeService:DemandetirageService ,private title:Title,private translate: TranslateService) {

  }

  ngOnInit() {
    this.translate.stream("enseignant.ens").subscribe(res=>{this.title.setTitle(res);});

    this.inputf.disabled=true;
    this.demandeService.getNbCopieEns().subscribe(res=>{
      this.lstcop=res;

      this.dataSource = new MatTableDataSource(this.lstcop);
      this.dataSource.filterPredicate = (data, filter) => {
        let valid = false;

        const transformedFilter = filter.trim().toLowerCase();

        Object.keys(data).map(key => {
          if (
            key === 'enseignant' &&
            (data.departement.nom_dep.toLowerCase().includes(transformedFilter) )||
            key === 'nb_copie' &&
            (data.groupe.nom_grp.toLowerCase().includes(transformedFilter) )) {
            valid = true;
          } else {
            if (('' + data[key]).toLowerCase().includes(transformedFilter)) {
              valid = true;
            }
          }
        });

        return valid;
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }}

  imprimer(){
    if(this.dated!=null && this.datef!=null){
      this.etat=false;
    this.demandeService.ImpRapEnsDate(this.dated,this.datef,"repp.jrxml").subscribe();
  }else{
      this.etat=true;
    }
  }

  datedebut(event: Date) {

    this.dated = event.toLocaleDateString();
    this.inputf.disabled=false;
    this.disabled=false;
    this.min=new Date(event.getFullYear(),event.getMonth(),event.getDate());
  }
  datefin(event) {
    this.datef = event.toLocaleDateString();

  }
  filtrerpardate(){
    this.demandeService.getNbCopieEnsParDate(this.dated,this.datef).subscribe(res=>{
      this.lstcop=res;

      this.dataSource = new MatTableDataSource(this.lstcop);
      this.dataSource.filterPredicate = (data, filter) => {
        let valid = false;

        const transformedFilter = filter.trim().toLowerCase();

        Object.keys(data).map(key => {
          if (
            key === 'enseignant' &&
            (data.departement.nom_dep.toLowerCase().includes(transformedFilter) )||
            key === 'nb_copie' &&
            (data.groupe.nom_grp.toLowerCase().includes(transformedFilter) )) {
            valid = true;
          } else {
            if (('' + data[key]).toLowerCase().includes(transformedFilter)) {
              valid = true;
            }
          }
        });

        return valid;
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }
c(){
    this.input.value='';
    this.inputf.value='';
    this.ngOnInit();
}
  ngOnDestroy(): void {
    //this.demandeService.clearMessage();
  }

}
