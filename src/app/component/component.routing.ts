import { Routes } from '@angular/router';
import {AgentComponent} from './agent/agent.component';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';
import {PmComponent} from './pm/pm.component';
import {AdminComponent} from './admin/admin.component';

export const ComponentsRoutes: Routes = [

  { path: '', redirectTo: 'Agent', pathMatch: 'full' },
  {
    path: 'Agent',
    component: AgentComponent
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

];
