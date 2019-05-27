import {Enseignant} from "./enseignant";
import {Papier} from "./papier";
import {Photocopieur} from "./photocopieur";
import {DemandeTirage} from "./demandeTirage";

export class Tirage {
  public id: number;
public DateAjout:Date;
public file:string;
public enseignant:Enseignant;
public papier:Papier;
public Photocopieur:Photocopieur;
  public demandeTirages:DemandeTirage[];
  constructor(
  ) { }
}
