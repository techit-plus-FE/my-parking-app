import React, { useEffect, useState } from "react";
import PurchaseForm from "./PurchaseForm";
import OrderCard from "../order-history/ordercard/OrderCard";
import { useBoundStore } from "../../../store";
import useCustomAxios from "../../../services/useCustomAxios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../services/BaseUrl";
import classes from "./purchase.module.css";
import MediaQuery from "../../UI/MediaQuery";

const Purchase = () => {
  const navigate = useNavigate();
  const isMobile = MediaQuery();
  const productDetailData = useBoundStore((state) => state.productDetailData);

  const axiosInstance = useCustomAxios();
  const userBasicInfo = useBoundStore((state) => state.userBasicInfo);
  const [checked, setChecked] = useState({ name: "", value: false });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 결제수단을 입력하지 않을 시 경고 창
    if (!checked.value) {
      alert("결제수단을 선택해주세요");
    } else if (checked.value) {
      postData();
    }
  };

  const handleOnChange = (
    e:
      | React.SyntheticEvent<Element, Event>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedValue = (e as React.ChangeEvent<HTMLInputElement>).target
      .value;

    //체크된 라디오 버튼이 있는지 검사
    setChecked((prev) => ({
      ...prev,
      name: selectedValue,
      value: true,
    }));
  };

  // 오늘 날짜 받아오는 함수
  const nowDate = () => {
    const year = new Date().getFullYear() + 1;
    const month = new Date().getMonth();
    const day = new Date().getDate();
    return `${year}.${month}.${day}`;
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
        value: productDetailData.name,
      },
      extra: {
        buyDate: nowDate(),
      },
    };

    try {
      await axiosInstance.post("/orders", body);
      alert("결제가 완료 되었습니다");
      navigate("/purchase/result");
    } catch (error) {
      console.error("결제 에러");
    }
  };

  return (
    <>
      {isMobile || (
        <div className={classes.purchaseContainer}>
          <ul>
            <li>상품정보</li>
            <li>대여기간</li>
            <li>결제금액</li>
          </ul>
        </div>
      )}

      <OrderCard
        title={productDetailData.name}
        image={BASE_URL + productDetailData.mainImages[0].url}
        totalPrice={productDetailData.price}
        isVisible={false}
        startDate={productDetailData.extra.startDate}
        endDate={productDetailData.extra.endDate}
        sellerId={productDetailData.seller_id}
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
