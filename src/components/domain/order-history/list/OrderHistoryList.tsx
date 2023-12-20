import React, { useEffect, useState } from "react";
import useCustomAxios from "../../../../services/useCustomAxios";
import OrderCard from "../ordercard/OrderCard";
import { useNavigate } from "react-router-dom";
import MediaQuery from "../../../UI/MediaQuery";
import classes from "./OrderHistory.module.css";
import { BASE_URL } from "../../../../services/BaseUrl";

const OrderHistoryList: React.FC = () => {
  const navigate = useNavigate();
  const mediaQuery = MediaQuery();

  //주문 목록 조회 데이터
  const [getOrderHistoryData, setGetOrderHistoryData] = useState<
    OrderHistoryProduct[]
  >([]);
  const axiosInstance = useCustomAxios();

  useEffect(() => {
    const getOrdersData = async () => {
      //orders 로 주문 목록 조회 데이터
      const getOrdersData = await axiosInstance<OrderHistoryData>("/orders");
      return setGetOrderHistoryData(getOrdersData.data.item);
    };

    getOrdersData();
  }, []);

  const handleNavigate = (_id: number, productItems: OrderHistoryProduct) => {
    const productItemsData = {
      updatedAt: productItems.updatedAt,
      _id: productItems._id,
      products: productItems.products,
    };

    // 상품 디테일 페이지로 이동하기
    // 이동할 페이지 path: "/order-history/:orderId"
    navigate(`/order-history/${_id}`, {
      //   주문목록 조회시 렌더링 된 Item 배열의 값
      // OrderHistoryDetailList 컴포넌트로 가져감
      state: { orderHistoryData: productItemsData },
    });
  };

  return (
    <>
      {mediaQuery || (
        <div className={classes.orderHistoryListContainer}>
          <ul>
            <li>상품정보</li>
            <li>결제금액</li>
          </ul>
        </div>
      )}
      {getOrderHistoryData?.map((item) => {
        return (
          <div key={item._id}>
            <OrderCard
              orderItems={item.products.length}
              title={item.products[0].name}
              image={
                item.products[0].image?.url &&
                BASE_URL + item.products[0].image?.url
              }
              buyDate={item.extra?.buyDate}
              onClick={() => handleNavigate(item._id, item)}
              totalPrice={item.cost.total}
              productPrice={item.products[0].price}
            />
          </div>
        );
      })}
    </>
  );
};

export default OrderHistoryList;
