import React, { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import useCustomAxios from "../../../services/useCustomAxios";
import RepliesRegistForm from "./RepliesRegistForm";
import { useParams } from "react-router-dom";

const RepliesRegist: React.FC = () => {
  //orderHistoryDetailList에서 받아온 ID
  const { productId, orderId } = useParams();
  const axiosInstance = useCustomAxios();
  // 후기입력하는 input 창 값
  const [repliesInput, setRepliesInput] = useState<string>("");
  // 평점 1~5 까지의 값
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    //product id를 받아 상품 상세 조회 data 가져오기
    const getProductDetailData = async () => {
      const getOrderId = await axiosInstance.get(`/products/${productId}`);
      return console.log(getOrderId);
    };
    getProductDetailData();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Post 할 때 필수 값지정
    const body: RepliesPostType = {
      order_id: Number(orderId),
      product_id: Number(productId),
      rating: rating,
      content: repliesInput,
    };

    const response = await axiosInstance.post("/replies", body);
    console.log(response);
  };

  const handleDrag = (e: SyntheticEvent) => {
    const targetElement = e.target as HTMLInputElement;
    const rating = Number(targetElement.value);
    setRating(rating);
  };

  return (
    <>
      <RepliesRegistForm
        value={repliesInput}
        onChange={(e) => setRepliesInput(e.target.value)}
        onSubmit={handleSubmit}
        handleDrag={handleDrag}
        ratingValue={rating}
      />
    </>
  );
};
export default RepliesRegist;
