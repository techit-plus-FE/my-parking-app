import React from "react";
import classes from "./ReviewCard.module.css";
import { Rating } from "@mui/material";

interface ReviewCardProps {
  src: string;
  title: string;
  price: number;
  content: string;
  ratingValue: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  src,
  title,
  price,
  content,
  ratingValue,
}) => {
  return (
    <div className={classes.reviewCardContainer}>
      <div className={classes.imgWrapper}>
        <img src={src} alt="" />
      </div>
      <div>
        <h2>{title}</h2>
        <div>
          <p>금액: {price}</p>
          <Rating
            name="basic"
            value={ratingValue}
            disabled
            sx={{
              "&.Mui-disabled": {
                opacity: 1, // 기본 opacity를 취소하고 1로 설정
              },
              "& .MuiRating-iconFilled": {
                color: "#ffda09", // 채워진 별의 빨간색 설정
              },
            }}
          />
          <div>{content}</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
