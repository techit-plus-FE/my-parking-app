import React, { useEffect, useState } from "react";
import PurchaseForm from "./PurchaseForm";
import OrderCard from "../order-history/ordercard/OrderCard";
import { useBoundStore } from "../../../store";
import useCustomAxios from "../../../services/useCustomAxios";
import OrderTitleBox from "../order-history/ordercard/OrderTitleBox";
import { useNavigate } from "react-router-dom";

const Purchase = () => {
  const navigate = useNavigate();
  const productDetailData = useBoundStore((state) => state.productDetailData);
  const axiosInstance = useCustomAxios();
  const userBasicInfo = useBoundStore((state) => state.userBasicInfo);
  const [checked, setChecked] = useState({ name: "", value: false });
  const [todayDate, setTodayDate] = useState({
    dateString: "",
    timeString: "",
  });

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

  // 오늘 날짜 받아오는 로직
  const getDateNow = () => {
    const today = new Date();
    const dateString = today.toLocaleDateString("ko-KR");
    const timeString = today.toLocaleTimeString("ko-KR");
    const todayDate = {
      dateString: dateString,
      timeString: timeString,
    };

    return todayDate;
  };

  const postData = async () => {
    console.log(productDetailData);
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
    };

    console.log(body);

    try {
      await axiosInstance.post("/orders", body);
      alert("결제가 완료 되었습니다");
      navigate("/purchase/result");
    } catch (error) {
      console.error("결제 에러");
    }
  };

  useEffect(() => {
    setTodayDate(getDateNow());
  }, []);

  return (
    <>
      <OrderTitleBox
        pageTitle="결제하기"
        option1="상품정보"
        option2="대여기간"
        option4="총 금액"
      />
      <OrderCard
        title={productDetailData.name}
        image={productDetailData.mainImages[0]}
        buyDate={todayDate.dateString}
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
