import React, { useEffect, useState } from "react";
import OrderHistoryItem from "./OrderHistoryItem";
import axios from "axios";

const OrderHistoryList: React.FC = () => {
  const [getData, setGetData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("https://localhost/api//products");
      console.log(response.data.item);
      return setGetData(response.data.item);
    };

    getData();
  }, []);

  return (
    <>
      {getData?.map((data: OrderHistoryMapData) => {
        {
          console.log(data);
        }
        return (
          <div key={data._id}>
            <OrderHistoryItem
              orderId={data._id}
              orderTitle={"이거 샀어요!!"}
              orderDate={"2032년50월1일"}
              orderPrice={"10000원"}
            />
          </div>
        );
      })}
    </>
  );
};

export default OrderHistoryList;
