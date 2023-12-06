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

export class UserBasicInfo implements UserBasicInfoType {
  _id: number;
  email: string;
  name: string;
  type: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;

  constructor(){
    this._id = -1
    this.email = ""
    this.name = ""
    this.type = ""
    this.phone = ""
    this.address = ""
    this.createdAt = ""
    this.updatedAt = ""
  }
}