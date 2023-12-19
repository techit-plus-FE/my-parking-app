// 구매 양식 페이지
// 이 페이제에선 주문목록컴포넌트(OrderHistoryList.tsx)와 함께 결제 수단 컴포넌트(PaymentMethod.tsx)가 들어갑니다.

import Purchase from "../../components/domain/purchase/Purchase";

const PurchasePage = () => {
  return (
    <div>
      <Purchase />
    </div>
  );
};

export default PurchasePage;
