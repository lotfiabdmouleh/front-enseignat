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
import {UserprofileComponent} from './userprofile/userprofile.component';
import {EnseignantComponent} from "./enseignant/enseignant.component";
import {AgenttirageComponent} from "./agenttirage/agenttirage.component";
import {GroupeComponent} from "./groupe/groupe.component";
import {PapierComponent} from "./papier/papier.component";
import {PhotocopieurComponent} from "./photocopieur/photocopieur.component";
import {RechargeComponent} from "./recharge/recharge.component";
import {AncreComponent} from "./ancre/ancre.component";
import {DiversService} from "../services/divers.service";
import {DiversComponent} from "./divers/divers.component";
import {EnseignementComponent} from "./enseignement/enseignement.component";
import {AnneeComponent} from "./annee/annee.component";
import {SemestreComponent} from "./semestre/semestre.component";
import {InterventionComponent} from "./intervention/intervention.component";
import {DemandeTirage} from "../models/demandeTirage";
import {DemandeTirageComponent} from "./demande-tirage/demande-tirage.component";
import {TirageComponent} from "./tirage/tirage.component";
import {AjoutDemandeComponent} from "./ajout-demande/ajout-demande.component";

export const ComponentsRoutes: Routes = [

  { path: '', redirectTo: 'Agent', pathMatch: 'full' },
  {
    path: 'Agent',
    component: AgentComponent
  },
  {
    path: 'matiere',
    component: MatiereComponent
  },{
    path: 'enseignant',
    component: EnseignantComponent
  },
  {
    path: 'departement',
    component: DepartementComponent
  },{
    path: 'ancre',
    component: AncreComponent
  },
  {
    path: 'demande',
    component: DemandeTirageComponent
  },
  {
    path: 'adddemandetirage',
    component: AjoutDemandeComponent
  },
  {
    path: 'tirage',
    component: TirageComponent
  },
  {
    path: 'annee',
    component: AnneeComponent
  },
  {
    path: 'intervention',
    component: InterventionComponent
  },
  {
    path: 'semestre',
    component: SemestreComponent
  },
  {
    path: 'divers',
    component: DiversComponent
  },{
    path: 'enseignement',
    component: EnseignementComponent
  },{
    path: 'photocopieur',
    component: PhotocopieurComponent
  },{
    path: 'recharge',
    component: RechargeComponent
  },
  {
    path: 'historique',
    component: HistoriqueComponent
  },{
    path: 'agenttirage',
    component: AgenttirageComponent
  },{
    path: 'groupe',
    component: GroupeComponent
  },{
    path: 'papier',
    component: PapierComponent
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
  {
    path: 'userdetail',
    component: UserprofileComponent
  },

];
