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
            {product.mainImages!.length > 0 ? (
              <img
                src={product.mainImages && BASE_URL + product.mainImages[0].url}
                alt="게시글 사진"
              />
            ) : (
              <img src={CARIMAGE} />
            )}
          </div>
          <div className={classes["product-info"]}>
            <h4>{product.name}</h4>
            <div className={classes["product-period"]}>
              <small>
                {product.extra?.startDate
                  ? product.extra?.startDate
                  : "2023.10.31"}
                ~
              </small>
              <small>
                {product.extra?.endDate ? product.extra?.endDate : "2023.11.01"}
              </small>
            </div>
            <p className={classes["product-price"]}>{product.price}원</p>
          </div>
        </li>
      </Link>
    </Box>
  );
};

export default ProductItem;
