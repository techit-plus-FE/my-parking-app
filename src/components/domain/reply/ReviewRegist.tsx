import React, { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import useCustomAxios from "../../../services/useCustomAxios";
import ReviewRegistForm from "./ReviewRegistForm";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./ReviewRegist.module.css";

const ReviewRegist: React.FC = () => {
  const navigate = useNavigate();
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
      await axiosInstance.get(`/products/${productId}`);
    };
    getProductDetailData();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating === 0) {
      alert("별점을 입력해주세요");
    } else {
      //Post 할 때 필수 값지정
      const body: RepliesPostType = {
        order_id: Number(orderId),
        product_id: Number(productId),
        rating: rating,
        content: repliesInput,
      };

      const response = await axiosInstance.post("/replies", body);
      if (response.data.ok === 1) {
        navigate("/reply/replies");
      }
    }
  };

  const handleDrag = (e: SyntheticEvent) => {
    const targetElement = e.target as HTMLInputElement;
    const rating = Number(targetElement.value);
    setRating(rating);
  };

  return (
    <div className={classes.reviewRegistContainer}>
      <ReviewRegistForm
        value={repliesInput}
        onChange={(e) => setRepliesInput(e.target.value)}
        onSubmit={handleSubmit}
        handleDrag={handleDrag}
        ratingValue={rating}
      />
    </div>
  );
};
export default ReviewRegist;
