import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {TokenStorageService} from "../../auth/token-storage.service";

declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls:['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  appitems = [
    {
      label: 'accueil',
      link: '/full/component/home',
      icon: 'home'
    },
    {

      label: 'Parametrage',
      icon: 'settings',
      items:[

        {
          label: 'Utilisateurs',
          icon: 'group',
          items:[
            {
              label: 'users',
              link: '/full/component/user',
              icon: 'format_color_fill'
            },

            {
              label: 'Enseignant',
              link: '/full/component/enseignant',
              icon: 'local_library'
            },
            {
              label: 'Agent Tirage',
              link: '/full/component/agenttirage',
              icon: 'person'
            },
          ]
        },
        {
          label: 'Consommable',
          icon: 'attach_money',
          items: [
            {
              label: 'Ancre',
              link: '/full/component/ancre',
              icon: 'format_color_fill'
            } ,{
              label: 'Divers',
              link: '/full/component/divers',
              icon: 'attach_file'
            }
          ]
        },
        {
          label: 'Departement',
          link: '/full/component/departement',
          icon: 'account_balance'
        },
        {
          label: 'Semestre',
          link: '/full/component/semestre',
          icon: 'today'
        },
        {
          label: 'Annee',
          link: '/full/component/annee',
          icon: 'calendar_today'
        },
        {
          label: 'Enseignement',
          link: '/full/component/enseignement',
          icon: 'school'
        },
        {
          label: 'Matiere',
          link: '/full/component/matiere',
          icon: 'book'
        },
        {
          label: 'Groupe',
          link: '/full/component/groupe',
          icon: 'group'
        },
        {
          label: 'Papier',
          link: '/full/component/papier',
          icon: 'filter_2'
        },
        {
          label: 'Intervention',
          link: '/full/component/intervention',
          icon: 'work'
        },
        {
          label: 'Photocopieur',
          link: '/full/component/photocopieur',
          icon: 'print'
        },
        {
          label: 'Recharge',
          link: '/full/component/recharge',
          icon: 'filter_frames'
        },
        {
          label: 'Historique',
          icon: 'history',
          items: [

            {
              label: 'Historique Générales',
              link: '/full/component/allhistory',
              icon: 'history'
            }

          ]
        },

      ]
    },
    {
      label: 'Approadmin',
      link: '/full/component/Approadmin',
      icon: 'add_shopping_cart'
    }
  ];
  ngOnInit() {

    if(this.token.getAuthorities()[0]==="ROLE_ADMIN"){
      this.ref();
    } if(this.token.getAuthorities()[0]==="ROLE_USER"){
    this.appitems=[];
    }
 if(this.token.getAuthorities()[0]==="ROLE_AGENT"){
   this.router.navigate(['/full/component/tirage']);
   this.appitems = [

     {
       label: 'Tirage',
       link: '/full/component/tirage',
       icon: 'print'
     },
     {
       label: 'Approvisionnement',
       link: '/full/component/Approvisionnement',
       icon: 'add_shopping_cart'
     },
   ];
      this.refagent();
    }
 if(this.token.getAuthorities()[0]==="ROLE_DIRDEP"){
   this.router.navigate(['/full/component/interfacetirage']);
   this.appitems = [

     {
       label: 'Gérer les demandes de tirages',
       link: '/full/component/interfacetirage',
       icon: 'print'
     },
   ];
      this.refdirdep();
    }
 if(this.token.getAuthorities()[0]==="ROLE_ENSEIGNANT"){
   this.router.navigate(['/full/component/demande']);
   this.appitems = [

     {
       label: 'Demande de tirage',
       link: '/full/component/demande',
       icon: 'picture_as_pdf'
     },

   ];
      this.refens();
    }


  }

  constructor(private router:Router,private translate:TranslateService,private token:TokenStorageService){

  }
  config = {
    paddingAtStart: true,
    classname: 'my-custom-class',
    listBackgroundColor: '',
    fontColor: '#473f3f' ,
    backgroundColor: '',
    selectedListFontColor: 'blue',
  };




  selectedItem($event){
    this.router.navigate([$event.link]);
  }
ref(){
  this.translate.stream("agent.accueil").subscribe(res=>{this.appitems[0].label=res;});
  this.translate.stream("button.para").subscribe(res=>{this.appitems[1].label=res;});
  this.translate.stream("user.users").subscribe(res=>{this.appitems[1].items[0].label=res;});
  this.translate.stream("user.user").subscribe(res=>{this.appitems[1].items[0].items[0].label=res;});
  this.translate.stream("enseignant.ens").subscribe(res=>{this.appitems[1].items[0].items[1].label=res;});
  this.translate.stream("agenttirage.agt").subscribe(res=>{this.appitems[1].items[0].items[2].label=res;});
  this.translate.stream("consommable.cons").subscribe(res=>{this.appitems[1].items[1].label=res;});
  this.translate.stream("consommable.ancre").subscribe(res=>{this.appitems[1].items[1].items[0].label=res;});
  this.translate.stream("consommable.divers").subscribe(res=>{this.appitems[1].items[1].items[1].label=res;});
  this.translate.stream("departement.dep").subscribe(res=>{this.appitems[1].items[2].label=res;});
  this.translate.stream("semestre.sem").subscribe(res=>{this.appitems[1].items[3].label=res;});
  this.translate.stream("annee.annee").subscribe(res=>{this.appitems[1].items[4].label=res;});
  this.translate.stream("enseignement.ens").subscribe(res=>{this.appitems[1].items[5].label=res;});
  this.translate.stream("matiere.mat").subscribe(res=>{this.appitems[1].items[6].label=res;});
  this.translate.stream("groupe.grp").subscribe(res=>{this.appitems[1].items[7].label=res;});
  this.translate.stream("papier.papier").subscribe(res=>{this.appitems[1].items[8].label=res;});
  this.translate.stream("intervention.inter").subscribe(res=>{this.appitems[1].items[9].label=res;});
  this.translate.stream("photocopieur.ph").subscribe(res=>{this.appitems[1].items[10].label=res;});
  this.translate.stream("recharge.rech").subscribe(res=>{this.appitems[1].items[11].label=res;});
 this.translate.stream("historique.hist").subscribe(res=>{this.appitems[1].items[12].label=res;});
  this.translate.stream("historique.hd").subscribe(res=>{this.appitems[1].items[12].items[0].label=res;});
  this.translate.stream("approvisionnement.app").subscribe(res=>{this.appitems[2].label=res;});
}
  refagent(){
    this.translate.stream("tirage.tirage").subscribe(res=>{this.appitems[0].label=res;});
    this.translate.stream("approvisionnement.app").subscribe(res=>{this.appitems[1].label=res;});

  }

  refens(){
    this.translate.stream("demande.dem").subscribe(res=>{this.appitems[0].label=res;});

  }refdirdep(){
    this.translate.stream("demande.gest").subscribe(res=>{this.appitems[0].label=res;});

  }
}
