// 첫번째 양식 컴포넌트
// 카카오 지도 api로 등록할 주차장의 좌표 위치를 stirng값으로 전달받는다.
import { useState } from "react";
import KakaoMap from "../../../common/KakaoMap";

import classes from "./FirstRegistForm.module.css";

type Props = {
  onNext: () => void;
  onSubmit: (l: ProductLocationType) => void;
};

const FirstRegistForm = ({ onSubmit, onNext }: Props) => {
  const [location, setLocation] = useState<ProductLocationType>({
    x: "",
    y: "",
  }); // 위치 정보를 저장할 상태 변수

  const handleNext = () => {
    onSubmit(location); // 상태 변수를 전달하여 부모 컴포넌트의 onSubmit 함수 호출
    onNext();
  };
  return (
    <div className={classes.container}>
      <h2>위치를 선택해 주세요.</h2>
      <div className={classes["map-wrapper"]}>
        {/* 카카오 지도에서 가져온 위경도 데이터를 받아와야함!!? */}
        <KakaoMap setLocation={setLocation} />
      </div>
      <div className={classes.active}>
        <button className={classes.prevBtn}>이전</button>
        <button className={classes.nextBtn} onClick={handleNext}>
          다음
        </button>
      </div>
    </div>
  );
};

export default FirstRegistForm;
