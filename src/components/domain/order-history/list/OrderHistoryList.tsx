import React, { useEffect, useState } from "react";
import useCustomAxios from "../../../../services/useCustomAxios";
import OrderCard from "../ordercard/OrderCard";
import { useNavigate } from "react-router-dom";

const OrderHistoryList: React.FC = () => {
  const navigate = useNavigate();
  const [getOrderHistoryData, setGetOrderHistoryData] =
    useState<OrderHistoryItem[]>();
  const axiosInstance = useCustomAxios();

  useEffect(() => {
    const getOrdersData = async () => {
      //주문 목록 조회
      const response = await axiosInstance<OrderHistoryData>("/orders");
      return setGetOrderHistoryData(response.data.item);
    };

    getOrdersData();
  }, []);

  const handleNavigate = (_id: number, productItems: OrderHistoryItem) => {
    const productItemsData = {
      updatedAt: productItems.updatedAt,
      _id: productItems._id,
      address: productItems.address,
      products: productItems.products,
    };

    // 상품 디테일 페이지로 이동하기
    // 이동할 페이지 path: "/order-history/:orderId"
    navigate(`/order-history/${_id}`, {
      //   주문목록 조회시 얻은 Item 배열의 값
      // OrderHistoryDetailList로 가져감
      state: { orderHistoryData: productItemsData },
    });
  };

  return (
    <>
      {getOrderHistoryData?.map((item) => {
        return (
          <div key={item._id}>
            <OrderCard
              orderItems={item.products.length}
              title={item.products[0].name}
              image={item.products[0].image}
              buyDate={item.updatedAt}
              onClick={() => handleNavigate(item._id, item)}
              totalPrice={item.cost.total}
            />
          </div>
        );
      })}
    </>
  );
};

export default OrderHistoryList;
