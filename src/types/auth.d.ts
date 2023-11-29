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
  // verifyEmail: (email: string) => void;
  // logIn:
  // 인증
  // 인가
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
