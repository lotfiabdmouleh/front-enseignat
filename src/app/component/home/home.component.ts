import {Component, OnInit} from '@angular/core';
import {PhotocopieurService} from "../../services/photocopieur.service";
import {Photocopieur} from "../../models/photocopieur";
import {TirageService} from "../../services/tirage.service";
import {Stat} from "../../models/stat";
import {Chart} from 'chart.js';
import {DemandetirageService} from "../../services/demandetirage.service";
import {DepartementService} from "../../services/departement.service";

import {Router} from "@angular/router";

import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";


const months=["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  BarChart = [];
   lstph: Photocopieur[];
  lst: Stat[] = [];
  xx: any;
dd :Chart;
  lstnomdep: any = [];
  lstnbcopdep: any = [];

  lstnommat: any = [];
  lstnbcopmat: any = [];
  lstmat: any = [];
lstphline:any=[];
  lstnomens: any = [];
  lstnbcopens: any = [];
  id: any;
  s: Stat = new Stat();
  lstdep: any = [];
  lstens: any = [];
  labelspie= [];
  pie='line';
  datapie= [];
  constructor(private router: Router, private photocpieurService: PhotocopieurService, private modalService: NgbModal,
              private depService: DepartementService, private tirageService: TirageService,
              private demandeService: DemandetirageService ,private title:Title,private translate: TranslateService) {

  }

  ngOnInit() {


    this.translate.stream("agent.accueil").subscribe(res=>{this.title.setTitle(res);});

    this.photocpieurService.getAllphotocopieur().subscribe(res => {
      this.lstph = res as Photocopieur[];
      for (let i = 0; i < this.lstph.length; i++) {
        this.photocpieurService.getnb(this.lstph[i].id).subscribe(res => {
          this.xx = res;
          this.lst.push({
            "id": this.lstph[i].id, "reference": this.lstph[i].reference, "interventions": this.lstph[i].interventions,
            "recharges": this.lstph[i].recharges, "des": this.lstph[i].des, "nb_copie": this.xx
          });


        });
      }
    });

    this.demandeService.getNbCopieDep().subscribe(res => {
      this.lstdep = res;
      for (let i = 0; i < this.lstdep.length; i++) {
        this.lstnomdep.push(this.lstdep[i][0]);
        this.lstnbcopdep.push(this.lstdep[i][1])
      }



      this.BarChart = new Chart('barChart', {
        type: 'bar',
        data: {
          labels: this.lstnomdep,
          datasets: [{
            label: '',
            data: this.lstnbcopdep,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(100, 200, 21, 0.2)',
              'rgba(153, 102, 255, 0.2)',

            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(100, 200, 21, 1)',
              'rgba(153, 102, 255, 1)',

            ],
            borderWidth: 1
          }]
        },
        options: {
          title: {
            text: "Nombre de papiers imprimé par chaque département",
            display: true
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });


    });


    this.demandeService.getNbCopieEns().subscribe(res => {
      this.lstens = res;
      for (let i = 0; i < 5; i++) {
        this.lstnomens.push(this.lstens[i][0]);
        this.lstnbcopens.push(this.lstens[i][1])
      }
      this.BarChart = new Chart('ens', {
        type: 'bar',
        data: {
          labels: this.lstnomens,
          datasets: [{
            label: '',
            data: this.lstnbcopens,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(100, 200, 21, 0.2)',
              'rgba(153, 102, 255, 0.2)',

            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(100, 200, 21, 1)',
              'rgba(153, 102, 255, 1)',

            ],
            borderWidth: 1
          }]
        },
        options: {
          title: {
            text: "Les enseignants qui ont imprimés le plus ",
            display: true
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    });

    this.demandeService.getNbCopieMat().subscribe(res => {
      this.lstmat = res;
      for (let i = 0; i < this.lstmat.length; i++) {
        this.lstnommat.push(this.lstmat[i][0]);
        this.lstnbcopmat.push(this.lstmat[i][1])
      }
      this.BarChart = new Chart('mat', {
        type: 'bar',
        data: {
          labels: this.lstnommat,
          datasets: [{
            label: '',
            data: this.lstnbcopmat,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(100, 200, 21, 0.2)',
              'rgba(153, 102, 255, 0.2)',

            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(100, 200, 21, 1)',
              'rgba(153, 102, 255, 1)',

            ],
            borderWidth: 1
          }]
        },
        options: {
          title: {
            text: "Les matiéres qui ont imprimés le plus ",
            display: true
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    });


  }

c(){
    this.datapie=[];
    this.labelspie=[];
    this.modalService.dismissAll();
}

  ph(content,id) {


this.photocpieurService.getPhLine(id).subscribe(res=>{

  this.lstphline= res;
    for(let i=0;i<this.lstphline.length;i++){
      this.labelspie.push(months[this.lstphline[i][0]-1]);
      this.datapie.push(this.lstphline[i][1]);
      }
  this.modalService.open(content,{size:"lg",backdrop:"static",keyboard:false});
    })

  }

  mat() {
    this.router.navigate(['full/component/matstat']);
  }

  dep() {
    this.router.navigate(['full/component/depstat']);
  }



  go() {
    this.router.navigate(["full/component/ensstat"])
  }


}
