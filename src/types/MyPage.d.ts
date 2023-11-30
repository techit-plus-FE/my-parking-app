import {Person} from './Auth.d'

interface MyPageSlice {
  myInfo: MyInfo
  fetchAndSetMyInfo: (id: number) => void
}

type MyInfo = Person & {
  _id : number,
  createdAt: string,
  updatedAt: string
}

interface MyPageResponseType {
  config: object;
  data: {
    ok : number,
    message? : string
    item?: MyInfo
  }
}