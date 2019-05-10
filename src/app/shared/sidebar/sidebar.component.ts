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
      icon: 'person'
    },
    {
      label: 'Role',
      link: '/full/component/role',
      icon: 'compare_arrows'
    },
    {
      label: 'Users',
      link: '/full/component/user',
      icon: 'group'
    },
    {
      label: 'Enseignant',
      link: '/full/component/enseignant',
      icon: 'local_library'
    },
    {
      label: 'Departement',
      link: '/full/component/departement',
      icon: 'school'
    },

    {
      label: 'Matiere',
      link: '/full/component/matiere',
      icon: 'book'
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
