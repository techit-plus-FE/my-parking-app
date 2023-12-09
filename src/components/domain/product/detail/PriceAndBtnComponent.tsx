import { useNavigate } from "react-router-dom";
import classes from "./PriceAndBtnComponent.module.css";

import HEARTICON from "../../../../assets/images/heart-icon.png";

const PriceAndBtnComponent = ({ product }: { product: ProductItemType }) => {
  const navigate = useNavigate();

  return (
    <div className={classes.wrapper}>
      <div className={classes["util-box"]}>
        <img src={HEARTICON} />
        <p>{product.price}원</p>
      </div>
      <button type="button" onClick={() => navigate("/purchase")}>
        결제하기
      </button>
    </div>
  );
};

export default PriceAndBtnComponent;
