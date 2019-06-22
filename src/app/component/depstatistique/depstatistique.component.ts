import {Component, OnInit, ViewChild} from '@angular/core';
import {MatInput, MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";
import {DemandetirageService} from "../../services/demandetirage.service";
import {AgenttirageService} from "../../services/agenttirage.service";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-depstatistique',
  templateUrl: './depstatistique.component.html',
  styleUrls: ['./depstatistique.component.css']
})
export class DepstatistiqueComponent implements OnInit {
  etat=false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table:MatTable<any>;
  @ViewChild('input',{read:MatInput}) input :MatInput;
  @ViewChild('inputf',{read:MatInput}) inputf :MatInput;
  min=new Date(2019,6,1);
  disabled=true;
  dated: any;
  datef: any;
  startDate = new Date();
  lstcop:any=[];
  displayedColumns: string[] = ['departement', 'nb_copie'];
  dataSource: MatTableDataSource<any>;
  constructor(private demService:DemandetirageService,private agentTirageService:AgenttirageService  ,private title:Title,private translate: TranslateService) { }

  ngOnInit() {
    this.inputf.disabled=true;
    this.translate.stream("departement.dep").subscribe(res=>{this.title.setTitle(res);});



        this.demService.getNbCopieDep().subscribe(res=>{
        this.lstcop=res;
          this.dataSource = new MatTableDataSource(this.lstcop);
          this.dataSource.filterPredicate = (data, filter) => {
            let valid = false;

            const transformedFilter = filter.trim().toLowerCase();

            Object.keys(data).map(key => {
              if (
                key === 'departement' &&
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

        })


  }
  imprimer(){
    if(this.dated!=null && this.datef!=null){
      this.etat=false;
      this.demService.ImpRapEnsDate(this.dated,this.datef,"rappdep.jrxml").subscribe();

    }else{
      this.etat=true;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }}

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
    this.demService.getNbCopieDepParDate(this.dated,this.datef).subscribe(res=>{
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
}
