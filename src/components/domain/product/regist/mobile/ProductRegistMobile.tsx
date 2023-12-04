import { useState } from "react";
import FirstRegistForm from "./FirstRegistForm";
import SecondRegistForm from "./SecondRegistForm";
import ThirdRegistForm from "./ThirdRegistForm";
import axios from "axios";
import { BASE_URL } from "../../../../../services/BaseUrl";

import classes from "../mobile/ProductRegistMobile.module.css";
import { useBoundStore } from "../../../../../store";

const ProductRegistMobile = () => {
  const token = useBoundStore((state) => state.userToken);
  // console.log(token);
  // 현재 단계를 나타내는 상태 변수
  const [step, setStep] = useState(1);
  // 각 컴포넌트에서 받은 데이터를 저장할 상태 변수
  const [formData, setFormData] = useState<ProductAllFormDataType>({
    location: {
      address: "",
      lat: "",
      lng: "",
    },
    startDate: "",
    endDate: "",
    othersInfo: {
      name: "",
      price: "",
      content: "",
    },
    mainImages: [],
    shippingFees: 0,
    show: true,
    active: true,
  });

  // 최종 Submit
  const handleFormSubmit = async (formData: ProductAllFormDataType) => {
    // const token = localStorage.getItem('token', token)
    console.log(formData);
    // 서버 데이터필드에 맞게 데이터들 정제해서 세팅하기
    const sendFormData = {
      name: formData.othersInfo.name,
      content: formData.othersInfo.content,
      price: Number(formData.othersInfo.price),
      mainImages: formData.mainImages,
      extra: {
        startDate: formData.startDate,
        endDate: formData.endDate,
        address: formData.location.address,
        lat: formData.location.lat,
        lng: formData.location.lng,
      },
      shippingFees: 0,
      show: true,
      active: true,
    };

    console.log(sendFormData);

    const response = await axios.post(
      `${BASE_URL}/seller/products`,
      sendFormData,
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    console.log(data);
  };

  // 첫번째 양식 받기
  const handleFirstFormSubmit = (location: ProductLocationType) => {
    setFormData((prevData) => ({
      ...prevData,
      location: location,
    }));
  };

  // 두번째 양식 받기
  const handleSecondFormSubmit = (startDate: string, endDate: string) => {
    setFormData((prevData) => ({
      ...prevData,
      startDate: startDate,
      endDate: endDate,
    }));
  };

  // 세번째 양식 받기
  const handleThirdFormSubmit = (
    mainImages: string[],
    othersInfo: ProductOthersInfoType
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      othersInfo: othersInfo,
      mainImages: mainImages,
    }));
    // 모든 양식이 작성되었을 때 서버에 폼 데이터 전송
    handleFormSubmit(formData);
  };

  // 다음 단계로 이동
  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };
  // 이전 단계로 이동
  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className={classes.container}>
      {step === 1 && (
        <FirstRegistForm onSubmit={handleFirstFormSubmit} onNext={handleNext} />
      )}
      {step === 2 && (
        <SecondRegistForm
          onSubmit={handleSecondFormSubmit}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
      {step === 3 && (
        <ThirdRegistForm onSubmit={handleThirdFormSubmit} onPrev={handlePrev} />
      )}
    </div>
  );
};

export default ProductRegistMobile;

// flow
// 1. 첫번째 컴포넌트에서 onSubmit함수로부터 location을 받아 formData의 location 필드를 업데이트 해준다
// 2. 두번째 컴포넌트에서 onSubmit함수로부터 startDate,endDate를 받아 formData의 startDate,endDate필드를 업데이트 해준다.
// 3. 마지막 컴포넌트에서 나머지 additionalInfo객체값을 받아주고 최종 서버로 post요청을 보내준다.(handleFormSubmit)