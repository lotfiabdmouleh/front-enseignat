import {Role} from "./role";

export class User {
  public id: number;
  public username: string;
  public password: string;
  public roles:Role[]
  public dateModification: Date;
  public dateAjout: Date;
  public createdBy: string;
  public lastModifiedBy: string;
  constructor(
  ) { }
}