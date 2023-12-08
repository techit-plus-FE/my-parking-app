import classes from "./Error.module.css";
import ERRORIMAGE from "../../assets/images/error-image.png";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <h1>해당 페이지는 잘못 접근한 페이지 입니다.</h1>
      <div>
        <img src={ERRORIMAGE} />
        <button type="button" onClick={() => navigate(-1)}>
          이전 페이지로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default Error;
