interface MyPageSlice {
  myInfo : UserDetailInfoType
  getMyInfo: (id: number, accessToken: string) => Promise<UserDetailInfoType>
  setMyInfo: (myInfo: UserDetailInfoType) => void
}

type UserDetailInfoType = UserBasicInfoType & {extra: ExtraType}

type MyPageResponseType = {
  config: object;
  data: {
    ok: number;
    item: UserDetailInfoType;
  };
}