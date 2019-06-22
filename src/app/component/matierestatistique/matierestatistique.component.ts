import {Component, OnInit, ViewChild} from '@angular/core';
import {MatInput, MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";
import {DemandetirageService} from "../../services/demandetirage.service";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-matierestatistique',
  templateUrl: './matierestatistique.component.html',
  styleUrls: ['./matierestatistique.component.css']
})
export class MatierestatistiqueComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table:MatTable<any>;
  @ViewChild('input',{read:MatInput}) input :MatInput;
  @ViewChild('inputf',{read:MatInput}) inputf :MatInput;
  min=new Date(2019,6,1);
  etat=false;
  disabled=true;
  dated: any;
  datef: any;
  startDate = new Date();
  displayedColumns: string[] = ['matiere', 'nb_copie'];
  dataSource: MatTableDataSource<any>;
  lstcop:any=[];
  constructor(private demandeService:DemandetirageService  ,private title:Title,private translate: TranslateService) { }

  ngOnInit() {
    this.translate.stream("matiere.mat").subscribe(res=>{this.title.setTitle(res);});

    this.inputf.disabled=true;


    this.demandeService.getNbCopieMat().subscribe(res=>{
      this.lstcop=res;
      this.dataSource = new MatTableDataSource(this.lstcop);
      this.dataSource.filterPredicate = (data, filter) => {
        let valid = false;

        const transformedFilter = filter.trim().toLowerCase();

        Object.keys(data).map(key => {
          if (
            key === 'matiere' &&
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
    this.demandeService.ImpRapEnsDate(this.dated,this.datef,"rappmat.jrxml").subscribe();
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
    this.demandeService.getNbCopieMatParDate(this.dated,this.datef).subscribe(res=>{
      this.lstcop=res;

      this.dataSource = new MatTableDataSource(this.lstcop);
      this.dataSource.filterPredicate = (data, filter) => {
        let valid = false;

        const transformedFilter = filter.trim().toLowerCase();

        Object.keys(data).map(key => {
          if (
            key === 'matiere' &&
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
