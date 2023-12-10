import React, { useState } from "react";
import PurchaseForm from "./PurchaseForm";
import OrderCard from "../order-history/ordercard/OrderCard";
import { useBoundStore } from "../../../store";
import useCustomAxios from "../../../services/useCustomAxios";

const Purchase = () => {
  const productDetailData = useBoundStore((state) => state.productDetailData);
  const axiosInstance = useCustomAxios();
  const userBasicInfo = useBoundStore((state) => state.userBasicInfo);
  const [checked, setChecked] = useState({ name: "", value: false });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // postData();
    if (!checked.value) {
      alert("결제수단을 선택해주세요");
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    //체크된 라디오 버튼이 있는지 검사
    setChecked((prev) => ({
      ...prev,
      name: selectedValue,
      value: true,
    }));
  };

  const postData = async () => {
    const body = {
      products: [
        {
          _id: productDetailData._id,
          quantity: productDetailData.quantity,
        },
      ],
      address: {
        name: userBasicInfo.address,
        value: userBasicInfo.address,
      },
    };

    try {
      await axiosInstance.post("/orders", body);
      alert("결제가 완료 되었습니다");
    } catch (error) {
      console.error("결제 에러");
    }
  };

  return (
    <>
      <OrderCard
        title={productDetailData.name}
        image={productDetailData.mainImages[0]}
        startDate={productDetailData.extra.startDate}
        endDate={productDetailData.extra.endDate}
        total={productDetailData.price}
      />
      <PurchaseForm
        onSubmit={handleSubmit}
        onChange={handleOnChange}
        total={productDetailData.price}
      />
    </>
  );
};

export default Purchase;
