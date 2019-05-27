import {Recharge} from "./recharge";
import {Intervention} from "./intervention";

export class Photocopieur {
  public id: number;
  public reference :string;
  public des:string;
  public recharges:Recharge[];
  public interventions:Intervention[];

  constructor(
  ) { }
}
