import {Role} from "./role";

export class User {
  public id: number;
  public username: string;
  public password: string
  public name:string;
  public email:string;
  public image:string;
  public roles:Role[];
  public dType:string;
  constructor(
  ) { }
}
