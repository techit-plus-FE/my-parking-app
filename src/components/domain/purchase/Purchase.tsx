import React, { useEffect, useState } from "react";
import PurchaseForm from "./PurchaseForm";
import OrderCard from "../order-history/ordercard/OrderCard";
import { useBoundStore } from "../../../store";
import useCustomAxios from "../../../services/useCustomAxios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../services/BaseUrl";
import classes from "./purchase.module.css";
import MediaQuery from "../../UI/MediaQuery";
import { Toast } from "../../UI/Toast";

const Purchase = () => {
  const navigate = useNavigate();
  const isMobile = MediaQuery();
  const productDetailData = useBoundStore((state) => state.productDetailData);

  const axiosInstance = useCustomAxios();
  const userBasicInfo = useBoundStore((state) => state.userBasicInfo);
  const [checked, setChecked] = useState({ name: "", value: false });

  const setIsToastOpen = useBoundStore((state) => state.setIsToastOpen);
  const setAlertText = useBoundStore((state) => state.setAlertText);
  const setBgColor = useBoundStore((state) => state.setBgColor);
  const isToastOpen = useBoundStore((state) => state.isToastOpen);
  const alertText = useBoundStore((state) => state.alertText);
  const bgColor = useBoundStore((state) => state.bgColor);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 결제수단을 입력하지 않을 시 경고 창
    if (!checked.value) {
      setIsToastOpen(true);
      setAlertText("결제수단을 입력해주세요");
      setBgColor("var(--toast-error)");
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
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
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
      <Toast
        isToastOpen={isToastOpen}
        alertText={alertText}
        bgColor={bgColor}
      />
    </>
  );
};

export default Purchase;
