import { Link } from "react-router-dom";

import classes from "./ProductItem.module.css";

import NOIMAGES from "../../../../assets/images/no-images.png";
import { Box } from "@mui/system";

type Props = {
  key: number | undefined;
  product: ProductItemType;
};

const ProductItem: React.FC<Props> = ({ product }) => {
  // const { productId } = useParams<{ productId: string }>();
  console.log(product);
  return (
    <Link to={`/products/${product._id}`} className={classes["link-to-detail"]}>
      <Box
        sx={{
          borderBottom: "1px solid #989898 ",
        }}
      >
        <li className={classes.container}>
          <div className={classes["product-imgBox"]}>
            {product.mainImages!.length > 0 ? (
              <img
                src={product.mainImages && product.mainImages[0]}
                alt="게시글 사진"
              />
            ) : (
              <img src={NOIMAGES} />
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
      </Box>
    </Link>
  );
};

export default ProductItem;
