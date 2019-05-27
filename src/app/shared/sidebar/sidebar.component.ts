import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  config = {
    paddingAtStart: true,
    classname: 'my-custom-class',
    listBackgroundColor: '',
    fontColor: '#473f3f' ,
    backgroundColor: '',
    selectedListFontColor: 'blue',
  };
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
          label: 'Role',
          link: '/full/component/role',
          icon: 'compare_arrows'
        },
        {
          label: 'Utilisateurs',
          icon: 'group',
          items:[
            {
              label: 'users',
              link: '/full/component/user',
              icon: 'format_color_fill'
            },{
              label: 'Agent',
              link: '/full/component/Agent',
              icon: 'person'
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
              label: 'Agent',
              link: '/full/component/historique',
              icon: 'person'
            }
          ]
        },

      ]
    },
    {
      label: 'Demande de tirage',
      link: '/full/component/demande',
      icon: 'school'
    },
    {
      label: 'Tirage',
      link: '/full/component/tirage',
      icon: 'menu'
    },
    ];

  
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  // End open close
  ngOnInit() {
  }
  selectedItem($event){
    this.router.navigate([$event.link]);
  }
}
