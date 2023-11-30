type UserInputType = {
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  type: string;
  extra: extraType;
};

type extraType = {
  X_position: string;
  Y_position: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface AuthSlice {
  signUp: (UserInput: UserInputType) => void;
  verifyEmail: (email: string) => void;
  // login: (email: string, password: string) => Promise<void>; // 인증
  userToken: string;
  handleLoginResponse: (email: string, password: string) => Promise<void>; // 인증
  userDetailDataInfo: UserDetailDataType;
}

interface PostLoginData {
  address: string;
  createdAt: string;
  email: string;
  extra: { X_position: string; Y_position: string };
  name: string;
  phone: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
  type: string;
  updatedAt: string;
  _id: number;
}

interface UserDetailDataType {
  _id: number;
  email: string;
  name: string;
  type: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
}
