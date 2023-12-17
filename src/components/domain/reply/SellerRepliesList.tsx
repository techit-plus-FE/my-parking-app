import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import useCustomAxios from "../../../services/useCustomAxios";

const SellerRepliesList: React.FC = () => {
  const [RepliesListData, setRepliesList] = useState([]);
  const axiosInstance = useCustomAxios();
  useEffect(() => {
    const getRepliesData = async () => {
      try {
        const response = await axiosInstance.get("/replies/seller/3");
        setRepliesList(response.data.item);
      } catch (error) {
        console.error("리뷰 리스트 에러");
      }
    };

    getRepliesData();
  }, []);
  return (
    <>
      {RepliesListData.map((item: RepliesGetItemType) => {
        console.log(item);
        return (
          <ReviewCard
            src={item.image}
            title={item.name}
            price={item.price}
            // 하나의 상품에 여러 리뷰가 올 수 없기 때문에 첫번쨰 리뷰만 보여집니다
            content={item.replies[0].content}
          />
        );
      })}
    </>
  );
};

export default SellerRepliesList;
