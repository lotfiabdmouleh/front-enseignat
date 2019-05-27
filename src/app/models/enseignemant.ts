import {Matiere} from "./matiere";
import {Groupe} from "./groupe";
import {Departement} from "./departement";
import {Enseignant} from "./enseignant";
import {Semester} from "./semestre";
import {Annee} from "./annee";

export class Enseignemant {
  public id: number;
  public dateAjout:Date;
  public matiere:Matiere;
  public groupe:Groupe;
  public departement:Departement;
  public enseignant:Enseignant;
  public semestre : Semester;
  public annee:Annee;
  constructor(
  ) { }
}
