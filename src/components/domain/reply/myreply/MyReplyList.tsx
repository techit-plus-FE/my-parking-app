import React, { useEffect, useState } from "react";
import useCustomAxios from "../../../../services/useCustomAxios";
import ReviewCard from "../ReviewCard";
import { BASE_URL } from "../../../../services/BaseUrl";
import classes from "./MyPeplyList.module.css";

const MyReplyList: React.FC = () => {
  const axiosInstance = useCustomAxios();
  const [myReplies, setMyReplies] = useState<MyRepliesItem[]>([]);

  // {{url}}/replies

  useEffect(() => {
    const getReplies = async () => {
      const response = await axiosInstance<MyReplies>("/replies");
      return setMyReplies(response.data.item);
    };
    getReplies();
  }, []);

  return (
    <>
      {myReplies.length !== 0 ? (
        myReplies.map((item) => {
          return (
            <ReviewCard
              title={item.content}
              src={BASE_URL + item.product.image?.url}
              ratingValue={item.rating}
            />
          );
        })
      ) : (
        <p className={classes.text}>후기 목록이 없습니다</p>
      )}
    </>
  );
};

export default MyReplyList;
