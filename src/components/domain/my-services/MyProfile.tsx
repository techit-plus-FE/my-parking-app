import React, {useEffect} from "react";
import {MyInfo} from "../../../types/MyPage.d";
import { useBoundStore } from "../../../store";

const MyProfile = () => {
  const Store = useBoundStore((state)=>state)
  const myInfo: MyInfo = useBoundStore((state)=>state.myInfo) 
  // const id: number  = Store.userDetailInfo._id as number
  const id = 4
  const fetchAndSetMyInfo = Store.fetchAndSetMyInfo
  useEffect(() => {
    console.log('useEffect')
    fetchAndSetMyInfo(id)
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  //id 받아오기
  //fetchAndSetMyInfo(id)

  return (
  <div>
    {/* 프로필 카드 */}
    <div> 
      <div>
        {/*프로필 이미지 표시*/}
        {/* <img src={`${myInfo.extra?.profileImage}`}/> */}
      </div>
      <div>
        {/* 이름 표서 */}
        {myInfo.name}
      </div>
      <div>
        {myInfo.email}
      </div>
      <div>
        {myInfo.phone}
      </div>
      <div>
        {myInfo.extra?.carNumber}
      </div>
      <div>
        {myInfo.address}
      </div>
    </div>
    {/* 버튼들 */}
    <button>주문 목록</button>
    <button>리뷰 관리</button>
  </div>
)};

export default MyProfile;