interface Person {
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  type: string;
  extra: extraType;
}

type extraType = {
  x_position?: string;
  y_position?: string;
  carNumber?: string;
  profileImage?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface AuthSlice {
  userToken : TokenType
  userBasicInfo : UserBasicInfoType, 
  isLoggedIn : boolean,
  signUp: (UserInput: UserInputType) => Promise<boolean>;
  verifyEmail: (email: string) => void;
  login: (email: string, password: string) => Promise<UserBasicInfoType & {token : TokenType}>;
  updateUserBasicInfo: (userToken: TokenType, userBasicInfo: UserBasicInfoType) => void;
  logout: () => void;
}



interface AuthResponseType {
  config: object;
  data: {
    ok: number;
    message?: string;
  };
}
interface UserBasicInfoType {
  _id: number;
  email: string;
  name: string;
  type: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

interface TokenType {
    accessToken: string;
    refreshToken: string;
  }

interface LoginResponseType {
  config: object;
  data: {
    ok: number;
    item : UserBasicInfoType & {token : TokenType},
  };
} 