interface UserInputType {
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
  signUp: (UserInput: UserInputType) => void;
  verifyEmail: (email: string) => void;
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

interface AuthResponseType {
  config: object;
  data: {
    ok: number;
    message?: string;
  };
}
interface UserBasicDataType {
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

interface PersistStoreType {
  userToken?: string;
  isLoggedIn?: boolean;

  userBasicInfo?: UserBasicDataType;
  updateUserToken?: (email: string, password: string) => Promise<void>;
  updateUserBasicInfo?: (email: string, password: string) => Promise<void>;
}

