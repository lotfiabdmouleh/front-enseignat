import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JsonpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {ComponentsRoutes} from './component.routing';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';

import {AgentComponent} from './agent/agent.component';

import {AgentService} from '../services/agent.service';
import {AdminComponent} from './admin/admin.component';
import {HomeComponent} from './home/home.component';
import {PmComponent} from './pm/pm.component';

import {UserComponent} from './user/user.component';
import {httpInterceptorProviders} from '../auth/auth-interceptor';
import {TranslateCompiler, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateMessageFormatCompiler} from "ngx-translate-messageformat-compiler";
import {RoleService} from "../services/role.service";
import {RoleComponent} from "./role/role.component";
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {UserService} from "../services/user.service";
import {HistoriqueComponent} from './historique/historique.component';
import {HistoriqueService} from "../services/historique.service";
import {DepartementComponent} from './departement/departement.component';
import {DepartementService} from "../services/departement.service";
import {MatiereComponent} from './matiere/matiere.component';
import {MatiereService} from "../services/matiere.service";
import {UserprofileComponent} from './userprofile/userprofile.component';
import {UploadFileService} from '../services/upload-file.service';
import {EnseignantComponent} from './enseignant/enseignant.component';
import {EnseignantService} from "../services/enseignant.service";
import {AgenttirageComponent} from './agenttirage/agenttirage.component';
import {AgenttirageService} from "../services/agenttirage.service";
import {GroupeComponent} from './groupe/groupe.component';
import {GroupeService} from "../services/groupe.service";
import {PapierComponent} from './papier/papier.component';
import {PapierService} from "../services/papier.service";
import {RechargeComponent} from './recharge/recharge.component';
import {PhotocopieurComponent} from './photocopieur/photocopieur.component';
import {PhotocopieurService} from "../services/photocopieur.service";
import {AncreService} from "../services/ancre.service";
import {RechargeService} from "../services/recharge.service";
import {AncreComponent} from './ancre/ancre.component';
import {DiversComponent} from './divers/divers.component';
import {DiversService} from "../services/divers.service";
import {EnseignementComponent} from './enseignement/enseignement.component';
import {EnseignementService} from "../services/enseignement.service";
import {HistoriquegeneralComponent} from './historiquegeneral/historiquegeneral.component';
import {SemestreComponent} from './semestre/semestre.component';
import {AnneeComponent} from './annee/annee.component';
import {AnneeService} from "../services/annee.service";
import {SemestreService} from "../services/semestre.service";
import {InterventionComponent} from './intervention/intervention.component';
import {InterventionService} from "../services/intervention.service";
import {DemandeTirageComponent} from './demande-tirage/demande-tirage.component';
import {DemandetirageService} from "../services/demandetirage.service";
import {TirageComponent} from './tirage/tirage.component';
import {TirageService} from "../services/tirage.service";
import {AjoutDemandeComponent} from './ajout-demande/ajout-demande.component';
import {AlertModule} from "ngx-bootstrap";
import {Title} from "@angular/platform-browser";
import {WavesModule} from "angular-bootstrap-md";
import {InterfaceTirageComponent} from './interface-tirage/interface-tirage.component';
import {ApprovisionnementComponent} from './approvisionnement/approvisionnement.component';
import {ApprovisionnementService} from "../services/approvisionnement.service";
import {ApproadminComponent} from './approadmin/approadmin.component';
import {MatierestatistiqueComponent} from './matierestatistique/matierestatistique.component';
import {EnseignantstatistiqueComponent} from './enseignantstatistique/enseignantstatistique.component';
import {DepstatistiqueComponent} from './depstatistique/depstatistique.component';
import {ChartsModule} from "ng2-charts";


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
    ChartsModule,
    WavesModule,
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

    }),
    AlertModule,
    ChartsModule

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
    HistoriquegeneralComponent,
    SemestreComponent,
    AnneeComponent,
    InterventionComponent,
    DemandeTirageComponent,
    TirageComponent,
    AjoutDemandeComponent,
    InterfaceTirageComponent,
    ApprovisionnementComponent,
    ApproadminComponent,
     MatierestatistiqueComponent,
    EnseignantstatistiqueComponent,
    DepstatistiqueComponent,


  ],
  providers: [

   UploadFileService,AgentService,RoleService,httpInterceptorProviders,UserService,HistoriqueService,DepartementService,MatiereService,
    AgentService,RoleService,httpInterceptorProviders,UserService,HistoriqueService,AnneeService,SemestreService,ApprovisionnementService,
    DepartementService,MatiereService,EnseignantService,AgenttirageService, GroupeService,InterventionService,DemandetirageService,
  PapierService,PhotocopieurService,AncreService,RechargeService,DiversService,
    EnseignementService,TirageService,DatePipe,Title]

})
export class ComponentsModule {}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,'./assets/i18n/','.json');
}
