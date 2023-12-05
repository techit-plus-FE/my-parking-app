export class Person implements UserInputType {
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  type: string;
  extra: extraType;

  constructor(){
    this.email = ""
    this.password = ""
    this.name = ""
    this.phone = ""
    this.address = ""
    this.type = "user"
    this.extra = {
    }
  }
}