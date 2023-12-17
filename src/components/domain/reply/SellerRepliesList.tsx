import React, { useEffect } from "react";
import ReviewCard from "./ReviewCard";
import useCustomAxios from "../../../services/useCustomAxios";

const SellerRepliesList: React.FC = () => {
  const axiosInstance = useCustomAxios();
  useEffect(() => {
    const getRepliesData = async () => {
      const response = await axiosInstance.get("/replies/seller/3");
      console.log(response);
    };
    getRepliesData();
  }, []);
  return (
    <>
      <div>
        <ReviewCard />
      </div>
    </>
  );
};

export default SellerRepliesList;
