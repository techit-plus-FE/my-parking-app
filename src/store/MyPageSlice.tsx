import {StateCreator} from 'zustand'
import { BASE_URL } from "../services/BaseUrl"
import axios from 'axios'
import { UserDetailInfo } from '../types/classImplementations'

//index.ts Store에서 AuthSlice를 참조하기 때문에 types 파일에 AuthSlice type을 넣었습니다. 

const requestMyInfo: (id: number, accessToken: string) => Promise<UserDetailInfoType> = async (id: number, accessToken: string) => {
  // 서버로 회원가입 요청 보내기
  try {
        const response = await axios.get<number, MyPageResponseType>(`${BASE_URL}/users/${id}`,{
            headers: {Authorization: `Bearer ${accessToken}`},
          })  
        if (response.data.ok === 1) {
          return response.data.item
        } 
       }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
   catch(Error: any) {
    if (Error.response){
      alert(Error.response.data.message)
      console.log('error')
      }
    console.error("Error:", Error);
    }
    return new UserDetailInfo()
  }

function isMyInfo(obj: UserDetailInfoType|undefined): obj is UserDetailInfoType {
  // Iplement your type checing logic here
  if (obj === undefined){
    return false
  }
  return true
}


export const createMyPageSlice: StateCreator<
MyPageSlice, 
[]                                                                                                          
> = (set) => ({
  myInfo: new UserDetailInfo(),
  getMyInfo : async (id: number, accessToken: string) => {
    return await requestMyInfo(id, accessToken)
  },
  setMyInfo: async (myInfo: UserDetailInfoType) => {
    if (isMyInfo(myInfo)) 
      set(() => ({myInfo: myInfo}))
  }
})
