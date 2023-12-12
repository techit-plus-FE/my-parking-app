import { useNavigate } from "react-router-dom";
import classes from "./PriceAndBtnComponent.module.css";

import HEARTICON from "../../../../assets/images/heart-icon.png";
import { Box } from "@mui/system";
import { useBoundStore } from "../../../../store";
import { CommonButtonSmall } from "../../../UI/CommonButton";

const PriceAndBtnComponent = ({ product }: { product: ProductItemType }) => {
  const navigate = useNavigate();
  const isDark = useBoundStore((state) => state.isDark);

  return (
    <Box
      sx={{
        backgroundColor: isDark ? "" : "var(--color-white)",
        display: "flex",
        alignItems: "center",
        position: "fixed",
        bottom: "10px",
        zIndex: 1002,
        width: "var(--main-max-width)",
        justifyContent: "space-around",
        padding: "20px",
      }}
    >
      <div className={(classes["util-box"], classes.wrapper)}>
        <img src={HEARTICON} />
        <p>{product.price}원</p>
      </div>
      <button type="button" onClick={() => navigate("/purchase")}>
        결제하기
      </button>
    </Box>
  );
};

export default PriceAndBtnComponent;
