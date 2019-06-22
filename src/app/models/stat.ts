import {Recharge} from "./recharge";
import {Intervention} from "./intervention";

export class Stat {
  public id: number;
  public reference :string;
  public des:string;
  public recharges:Recharge[];
  public interventions:Intervention[];
  public nb_copie:any;

  constructor(
  ) { }
}
