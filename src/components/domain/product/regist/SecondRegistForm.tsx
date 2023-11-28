// 두번째 양식 컴포넌트
// 주차장 대여 기간을 받는 양식이 필요함
import { useState } from "react";
import classes from "./SecondRegistForm.module.css";

type Props = {
  onNext: () => void;
  onPrev: () => void;
  onSubmit: (d1: string, d2: string) => void;
};
const SecondRegistForm = ({ onSubmit, onNext, onPrev }: Props) => {
  const [startDate, setStartDate] = useState(""); // 대여 시작일을 저장할 상태 변수
  const [endDate, setEndDate] = useState(""); // 대여 종료일을 저장할 상태 변수

  const handleNext = () => {
    onSubmit(startDate, endDate); // 상태 변수들을 전달하여 부모 컴포넌트의 onSubmit 함수 호출
    onNext();
  };

  const handlePrev = () => {
    onPrev();
  };

  return (
    <div className={classes.container}>
      <h2>기간을 설정 하세요.</h2>
      <div className={classes["date-box"]}>
        <label htmlFor="startDate">언제부터</label>
        <input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div className={classes["date-box"]}>
        <label htmlFor="endDate">언제까지</label>
        <input
          id="endDate"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className={classes.active}>
        <button className={classes.prevBtn} onClick={handlePrev}>
          이전
        </button>
        <button className={classes.nextBtn} onClick={handleNext}>
          다음
        </button>
      </div>
    </div>
  );
};

export default SecondRegistForm;
