import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import useCustomAxios from "../../../services/useCustomAxios";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../services/BaseUrl";

const SellerRepliesList: React.FC = () => {
  const { sellerId } = useParams();
  console.log(sellerId);
  const [RepliesListData, setRepliesList] = useState([]);
  const axiosInstance = useCustomAxios();
  useEffect(() => {
    const getRepliesData = async () => {
      try {
        const response = await axiosInstance.get(`/replies/seller/${sellerId}`);
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
        return (
          <div key={item._id}>
            <ReviewCard
              src={BASE_URL + item.image.url}
              title={item.name}
              price={item.price}
              // 하나의 상품에 여러 리뷰가 올 수 없기 때문에 첫번쨰 리뷰만 보여집니다
              content={item.replies[0].content}
              ratingValue={item.replies[0].rating}
            />
          </div>
        );
      })}
    </>
  );
};

export default SellerRepliesList;
