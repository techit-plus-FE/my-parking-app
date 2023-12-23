import { Link } from "react-router-dom";

import { Box } from "@mui/system";
import classes from "./ProductItem.module.css";

import CARIMAGE from "../../../../assets/images/car-image.png";
import { BASE_URL } from "../../../../services/BaseUrl";

type Props = {
  key: number | undefined;
  product: ProductItemType;
};

const ProductItem: React.FC<Props> = ({ product }) => {
  const removeProductCreatedAt = product.createdAt?.slice(0, 11);
  return (
    <Box
      sx={{
        borderBottom: "1px solid #989898 ",
      }}
    >
      <Link
        to={`/products/${product._id}`}
        className={classes["link-to-detail"]}
      >
        <li className={classes.container}>
          <div className={classes["product-imgBox"]}>
            {product.mainImages!.length > 0 && product.mainImages ? (
              <img
                src={BASE_URL + product.mainImages[0].url}
                alt="게시글 사진"
              />
            ) : (
              <img src={CARIMAGE} />
            )}
          </div>
          <div className={classes["product-info"]}>
            <h4>{product.name}</h4>
            <div className={classes["product-period"]}>
              <span>대여기간</span>
              <div className={classes["period-content"]}>
                <small>
                  {product.extra?.startDate
                    ? product.extra?.startDate
                    : "등록날짜가 없습니다."}
                  ~
                </small>
                <small>
                  {product.extra?.endDate
                    ? product.extra?.endDate
                    : "등록날짜가 없습니다."}
                </small>
              </div>
            </div>
            <div className={classes["product-createdAt"]}>
              <span>등록날짜</span>
              <small>{removeProductCreatedAt}</small>
            </div>
            <p className={classes["product-price"]}>{product.price}원</p>
          </div>
        </li>
      </Link>
    </Box>
  );
};

export default ProductItem;
