import {Routes} from '@angular/router';

import {FullComponent} from './layouts/full/full.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {PasswordComponent} from "./password/password.component";

export const Approutes: Routes = [
  {
    path: 'full',
    component: FullComponent,
    children: [
      { path: '', redirectTo: 'component', pathMatch: 'full' },
      {
        path: 'starter',
        loadChildren: './starter/starter.module#StarterModule'
      },
      {
        path: 'component',
        loadChildren: './component/component.module#ComponentsModule'
      }
    ]
  },

  {
    path: '',
    redirectTo: '/login',pathMatch:'full'
  },
  {
    path: 'passeword',
    component: PasswordComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },




];
