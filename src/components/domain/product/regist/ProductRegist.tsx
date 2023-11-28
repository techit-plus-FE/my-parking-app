import { useState } from "react";
import FirstRegistForm from "./FirstRegistForm";
import SecondRegistForm from "./SecondRegistForm";
import ThirdRegistForm from "./ThirdRegistForm";
import axios from "axios";

// flow
// 1. 첫번째 컴포넌트에서 onSubmit함수로부터 location을 받아 formData의 location 필드를 업데이트 해준다
// 2. 두번째 컴포넌트에서 onSubmit함수로부터 startDate,endDate를 받아 formData의 startDate,endDate필드를 업데이트 해준다.
// 3. 마지막 컴포넌트에서 나머지 additionalInfo객체값을 받아주고 최종 서버로 post요청을 보내준다.(handleFormSubmit)

const ProductRegist = () => {
  // 현재 단계를 나타내는 상태 변수
  const [step, setStep] = useState(1);
  // 각 컴포넌트에서 받은 데이터를 저장할 상태 변수
  const [formData, setFormData] = useState<ProductAllFormDataType>({
    location: "",
    startDate: "",
    endDate: "",
    othersInfo: {
      name: "",
      price: "",
      content: "",
    },
    mainImages: [],
  });

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1); // 다음 단계로 이동
  };
  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1); // 이전 단계로 이동
  };

  const handleFormSubmit = async (formData: ProductAllFormDataType) => {
    // 폼 데이터를 서버에 전송하는 함수
    const response = await axios.post(``);
    const data = response.data;
    console.log(data);
  };

  const handleFirstFormSubmit = (location: string) => {
    setFormData((prevData) => ({
      ...prevData,
      location: location,
    }));
  };

  const handleSecondFormSubmit = (startDate: string, endDate: string) => {
    setFormData((prevData) => ({
      ...prevData,
      startDate: startDate,
      endDate: endDate,
    }));
  };

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

  return (
    <>
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
    </>
  );
};

export default ProductRegist;
