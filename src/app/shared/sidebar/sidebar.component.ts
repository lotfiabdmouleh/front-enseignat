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
      label: 'Agent',
      link: '/full/component/Agent',
      icon: 'menu'
    },
    {
      label: 'Role',
      link: '/full/component/role',
      icon: 'menu'
    },
    {
      label: 'Users',
      link: '/full/component/user',
      icon: 'menu'
    },
    {
      label: 'Departement',
      link: '/full/component/departement',
      icon: 'menu'
    },
{
      label: 'Matiere',
      link: '/full/component/matiere',
      icon: 'menu'
    },

    {
      label: 'Historique',
      icon: 'history',
      items: [
        {
          label: 'Agent',
          link: '/full/component/historique',
          icon: 'history'
        }
      ]
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
