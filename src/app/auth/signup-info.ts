export class SignUpInfo {
  name: string;
  username: string;
  email: string;
  role: string[];
  password: string;
  tel:number;

  constructor(name: string, username: string, email: string,tel:number) {
    this.name = name;
    this.username = username;
    this.email = email;

    this.tel = tel;
    this.role = ['user'];
  }
}
