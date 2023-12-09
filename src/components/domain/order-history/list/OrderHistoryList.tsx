import React, { useEffect, useState } from "react";
import useCustomAxios from "../../../../services/useCustomAxios";
import OrderCard from "../ordercard/OrderCard";

const OrderHistoryList: React.FC = () => {
  const [getOrderHistoryData, setGetOrderHistoryData] = useState([]);
  const [totalOrders, setTotalOrders] = useState([]);

  const axiosInstance = useCustomAxios();

  useEffect(() => {
    const getData = async () => {
      const response = await axiosInstance.get("/orders");
      // console.log(response.data.item);
      return (
        setTotalOrders(response.data.item.length),
        setGetOrderHistoryData(response.data.item)
      );
    };

    getData();
  }, []);

  return (
    <>
      {getOrderHistoryData?.map((item: OrderHistoryDataType) => {
        console.log(item);
        console.log(item.cost.products);

        return (
          <OrderCard
            orderItems={item.products.length}
            title={item.products[0].name}
            image={item.products[0].image}
            createdAt={item.createdAt}
            total={item.cost.products}
          />
        );
      })}
    </>
  );
};

export default OrderHistoryList;
