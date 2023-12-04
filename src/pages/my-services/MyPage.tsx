// 유저 정보 페이지
// type === 'user' OR type === 'seller' 일때 보여지는 렌더링 유의하기!
// 'user' => 프로필 컴포넌트(MyProfile.tsx), 주문기록 목록 컴포넌트(OrderHistoryList.tsx),
// 'seller' => 프로필 컴포넌트(MyProfile.tsx), 상품 목록 컴포넌트(ProductList.tsx),
import MyProfile from "../../components/domain/my-services/MyProfile";

const MyPage = () => {  
  return (<>
    마이 페이지 입니다.
    <div>
      <MyProfile/>
    </div>
    </>)
};

export default MyPage;
