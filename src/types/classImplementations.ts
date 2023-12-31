export class Person implements Person {
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  type: string;
  extra: ExtraType;

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

export class UserInputClass extends Person {
  passwordCheck: string;
  constructor(){
    super(),
    this.passwordCheck = "";
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

export class UserDetailInfo extends UserBasicInfo {
  extra: ExtraType;
  constructor(){
    super(),
    this.extra = {
      lat : "",
      lng : "",
      carNumber : "",
      profileImage: "",
    }
  }
}


export class UserExtraInfo implements ExtraType {
  lat : "";
  lng : "";
  carNumber : "";
  profileImage : "";
  
  constructor(){
    this.lat = ""
    this.lng = ""
    this.carNumber = ""
    this.profileImage = ""
  }
}

