import React, {useEffect} from "react";
import { useBoundStore } from "../../../store";
import { useNavigate} from "react-router-dom";
import { CommonButtonMiddle } from "../../UI/CommonButton";
import Box from "@mui/material/Box";

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

    <Box>
      <div>
        {/*프로필 이미지 표시*/}
        <img src={`${myInfo.extra?.profileImage}`}/>
      </div>
      <div>
        회원유형 : {myInfo.type === 'seller' ?'판매자' : '일반회원'}
      </div>
      <div>
        이름 : {myInfo.name}
      </div>
      <div>
        이메일 : {myInfo.email}
      </div>
      <div>
        전화번호 : {myInfo.phone}
      </div>
      <div>
        주소 : {myInfo.address}
      </div>
      <div>
        차량번호 : {myInfo.extra?.carNumber}
      </div>
    </Box>
    {/* 버튼들 */}
    {myInfo.type === 'seller' ?
      <CommonButtonMiddle text = "내상품 목록"/>
    :
      <CommonButtonMiddle text = "주문 목록"/>
    }
    <CommonButtonMiddle text = "리뷰 관리"/>

  </>)
};

export default MyProfile;