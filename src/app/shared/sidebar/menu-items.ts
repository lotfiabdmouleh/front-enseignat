import { RouteInfo } from './sidebar.metadata';
import {HistoriqueComponent} from "../../component/historique/historique.component";

export const ROUTES: RouteInfo[] = [

  {
    path: '/full/component/home',
    title: 'agent.titre',
    icon: 'mdi mdi-gauge',
    class: '',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: []
  },

  {
    path: '/full/component/Agent',
    title: 'agent.agent',
    icon: 'mdi mdi-equal',
    class: '',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/full/component/role',
    title: 'Role',
    icon: 'mdi mdi-equal',
    class: '',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/full/component/user',
    title: 'User',
    icon: 'mdi mdi-equal',
    class: '',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/full/component/historique',
    title: '',
    icon: 'mdi mdi-equal',
    class: '',
    label: 'Historiques',
    labelClass: '',
    extralink: false,
    submenu: []
  },
];
