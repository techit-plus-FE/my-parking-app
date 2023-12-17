import React from "react";
import classes from "./ReviewCard.module.css";

interface ReviewCardProps {
  src: string;
  title: string;
  price: number;
  content: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  src,
  title,
  price,
  content,
}) => {
  return (
    <div className={classes.reviewCardContainer}>
      <div className={classes.imgWrapper}>
        <img src={src} alt="" />
      </div>
      <div>
        <h2>{title}</h2>
        <div>
          <p>{price}</p>
          <div>{content}</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
