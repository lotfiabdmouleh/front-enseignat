import {DemandeTirage} from "./demandeTirage";

export class Enseignant {
  public id: number;
  public username: string;
  public password: string;
  public name: string;
  public email: string;
  public tel: number;
  public etat:boolean;
public demandeTirages:DemandeTirage[];
  constructor(
  ) { }
}
