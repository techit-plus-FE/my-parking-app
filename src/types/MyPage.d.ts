import {Person} from './ classImplementations'


type MyInfo = Person & {
  _id : number,
  createdAt: string,
  updatedAt: string
}


interface MyPageSlice {
  myInfo: MyInfo
  fetchAndSetMyInfo: (id: number) => void
}


interface MyPageResponseType {
  config: object;
  data: {
    ok : number,
    message? : string
    item?: MyInfo
  }
}