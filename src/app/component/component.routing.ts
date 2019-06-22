import {Routes} from '@angular/router';
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
import {DiversComponent} from "./divers/divers.component";
import {EnseignementComponent} from "./enseignement/enseignement.component";
import {HistoriquegeneralComponent} from './historiquegeneral/historiquegeneral.component';
import {AnneeComponent} from "./annee/annee.component";
import {SemestreComponent} from "./semestre/semestre.component";
import {InterventionComponent} from "./intervention/intervention.component";
import {DemandeTirageComponent} from "./demande-tirage/demande-tirage.component";
import {TirageComponent} from "./tirage/tirage.component";
import {AjoutDemandeComponent} from "./ajout-demande/ajout-demande.component";
import {InterfaceTirageComponent} from "./interface-tirage/interface-tirage.component";
import {ApprovisionnementComponent} from "./approvisionnement/approvisionnement.component";
import {ApproadminComponent} from "./approadmin/approadmin.component";
import {EnseignantstatistiqueComponent} from "./enseignantstatistique/enseignantstatistique.component";
import {MatierestatistiqueComponent} from "./matierestatistique/matierestatistique.component";
import {DepstatistiqueComponent} from "./depstatistique/depstatistique.component";

export const ComponentsRoutes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'ensstat',
    component: EnseignantstatistiqueComponent
  },
 {
    path: 'Agent',
    component: AgentComponent
  },


  {
    path: 'matstat',
    component: MatierestatistiqueComponent
  },
  {
    path: 'depstat',
    component: DepstatistiqueComponent
  },

  {
    path: 'Approadmin',
    component: ApproadminComponent
  },{
    path: 'Approvisionnement',
    component: ApprovisionnementComponent
  },
  {
    path: 'matiere',
    component: MatiereComponent
  },{
    path: 'enseignant',
    component: EnseignantComponent
  },
  {
    path: 'interfacetirage',
    component: InterfaceTirageComponent
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
  {
    path: 'allhistory',
    component: HistoriquegeneralComponent
  },

];
