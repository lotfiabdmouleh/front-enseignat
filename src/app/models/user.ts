import {Role} from "./role";

export class User {
  public id: number;
  public username: string;
  public password: string;
  public roles:Role[];
  public dType:string;
  constructor(
  ) { }
}
