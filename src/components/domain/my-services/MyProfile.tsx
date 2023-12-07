import React, {useEffect} from "react";
import { useBoundStore } from "../../../store";
import { useNavigate} from "react-router-dom";

const MyProfile = () => {
  const Store = useBoundStore((state)=>state)
  const myInfo: UserDetailInfoType = useBoundStore((state)=>state.myInfo) 
  const id: number = Store.userBasicInfo._id
  const navigate = useNavigate()
  const fetchAndSetMyInfo = async () => {
    Store.setMyInfo(await Store.getMyInfo(id, Store.userToken.accessToken))
  }
  
  useEffect(() => {
    Store.isLoggedIn? fetchAndSetMyInfo() : (()=>{
      alert('로그인이 필요합니다'),
      navigate("/login")
    })()}, [])

  // return (<></>)
  return !Store.isLoggedIn ? (<>로그인을 해주세요</>) : 
  (<>
    {/* 프로필 카드 */}
    <div> 
      <div>
        {/*프로필 이미지 표시*/}
        <img src={`${myInfo.extra?.profileImage}`}/>
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
  </>)
};

export default MyProfile;