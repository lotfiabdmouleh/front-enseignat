import { Routes } from '@angular/router';
import {AgentComponent} from './agent/agent.component';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';
import {PmComponent} from './pm/pm.component';
import {AdminComponent} from './admin/admin.component';
import {RoleComponent} from "./role/role.component";
import {HistoriqueComponent} from "./historique/historique.component";
import {DepartementComponent} from "./departement/departement.component";
import {MatiereComponent} from "./matiere/matiere.component";

export const ComponentsRoutes: Routes = [

  { path: '', redirectTo: 'Agent', pathMatch: 'full' },
  {
    path: 'Agent',
    component: AgentComponent
  },
  {
    path: 'matiere',
    component: MatiereComponent
  },
  {
    path: 'departement',
    component: DepartementComponent
  },
  {
    path: 'historique',
    component: HistoriqueComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'pm',
    component: PmComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'role',
    component: RoleComponent
  },

];
