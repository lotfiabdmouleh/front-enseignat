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
  MatButtonModule, MatCardModule,
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
// import ngx-translate and the http loader
import {TranslateModule, TranslateLoader, TranslateCompiler} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateMessageFormatCompiler} from "ngx-translate-messageformat-compiler";
import {RoleService} from "../services/role.service";
import {RoleComponent} from "./role/role.component";
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {UserService} from "../services/user.service";
import { HistoriqueComponent } from './historique/historique.component';
import {HistoriqueService} from "../services/historique.service";
import { DepartementComponent } from './departement/departement.component';
import {DepartementService} from "../services/departement.service";
import { MatiereComponent } from './matiere/matiere.component';
import {MatiereService} from "../services/matiere.service";
import { UserprofileComponent } from './userprofile/userprofile.component';
import {UploadFileService} from '../services/upload-file.service';
import { EnseignantComponent } from './enseignant/enseignant.component';
import {EnseignantService} from "../services/enseignant.service";
import { AgenttirageComponent } from './agenttirage/agenttirage.component';
import {AgenttirageService} from "../services/agenttirage.service";
import { GroupeComponent } from './groupe/groupe.component';
import {GroupeService} from "../services/groupe.service";
import { PapierComponent } from './papier/papier.component';
import {PapierService} from "../services/papier.service";
import { RechargeComponent } from './recharge/recharge.component';
import { PhotocopieurComponent } from './photocopieur/photocopieur.component';
import {PhotocopieurService} from "../services/photocopieur.service";
import {AncreService} from "../services/ancre.service";
import {RechargeService} from "../services/recharge.service";
import { AncreComponent } from './ancre/ancre.component';
import { DiversComponent } from './divers/divers.component';
import {DiversService} from "../services/divers.service";
import { EnseignementComponent } from './enseignement/enseignement.component';
import {EnseignementService} from "../services/enseignement.service";
import { SemestreComponent } from './semestre/semestre.component';
import { AnneeComponent } from './annee/annee.component';
import {AnneeService} from "../services/annee.service";
import {SemestreService} from "../services/semestre.service";
import { InterventionComponent } from './intervention/intervention.component';
import {InterventionService} from "../services/intervention.service";
import { DemandeTirageComponent } from './demande-tirage/demande-tirage.component';
import {DemandetirageService} from "../services/demandetirage.service";
import { TirageComponent } from './tirage/tirage.component';
import {TirageService} from "../services/tirage.service";
import { AjoutDemandeComponent } from './ajout-demande/ajout-demande.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
    NgbModule.forRoot(),
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
    MatCardModule,
    MatNativeDateModule,
    FormsModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      }

    })

  ],
  declarations: [
    AgentComponent,
    AdminComponent,
    HomeComponent,
    PmComponent,
    UserComponent,
    RoleComponent,
    HistoriqueComponent,
    DepartementComponent,
    MatiereComponent,
    UserprofileComponent,

    EnseignantComponent,
    AgenttirageComponent,
    GroupeComponent,
    PapierComponent,
    RechargeComponent,
    PhotocopieurComponent,
    AncreComponent,
    DiversComponent,
    EnseignementComponent,
    SemestreComponent,
    AnneeComponent,
    InterventionComponent,
    DemandeTirageComponent,
    TirageComponent,
    AjoutDemandeComponent,

  ],
  providers: [
   UploadFileService,AgentService,RoleService,httpInterceptorProviders,UserService,HistoriqueService,DepartementService,MatiereService,
    AgentService,RoleService,httpInterceptorProviders,UserService,HistoriqueService,AnneeService,SemestreService,
    DepartementService,MatiereService,EnseignantService,AgenttirageService, GroupeService,InterventionService,DemandetirageService,
  PapierService,PhotocopieurService,AncreService,RechargeService,DiversService,EnseignementService,TirageService]

})
export class ComponentsModule {}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,'./assets/i18n/','.json');
}
