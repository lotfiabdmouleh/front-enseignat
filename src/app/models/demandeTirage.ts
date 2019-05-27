import {Enseignant} from "./enseignant";
import {Matiere} from "./matiere";
import {Groupe} from "./groupe";
import {Departement} from "./departement";
import {Semester} from "./semestre";
import {Annee} from "./annee";
import {Enseignemant} from "./enseignemant";

export class DemandeTirage {
  public id: number;
  public file:string;
  public nb_copie:number;
  public enseignant:Enseignant;
  public dateAjout:Date;
  public matiere:Matiere;
  public groupe:Groupe;
  public departement:Departement;
  public semestre : Semester;
  public enseignement:Enseignemant;
  public annee:Annee;
  constructor(
  ) { }
}
