import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { JsonpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsRoutes } from './component.routing';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


import {
  MatButtonModule,
  MatCheckboxModule, MatDatepickerModule,
  MatIconModule, MatNativeDateModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';

import { AgentComponent } from './agent/agent.component';

import {SelectionModel} from '@angular/cdk/collections';
import {AgentService} from '../services/agent.service';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { PmComponent } from './pm/pm.component';

import { UserComponent } from './user/user.component';
import {httpInterceptorProviders} from '../auth/auth-interceptor';
import {HttpClientModule} from '@angular/common/http';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
    NgbModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    HttpClientModule,



  ],
  declarations: [
    AgentComponent,
    AdminComponent,
    HomeComponent,
    PmComponent,
    UserComponent,

  ],
  providers: [
    AgentService,httpInterceptorProviders


  ]

})
export class ComponentsModule {}
