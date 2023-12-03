import { Link } from "react-router-dom";

import classes from "./ProductItem.module.css";

type Props = {
  key: number | undefined;
  product: ProductItemType;
};

const ProductItem: React.FC<Props> = ({ product }) => {
  // const { productId } = useParams<{ productId: string }>();

  return (
    <Link to={`/products/${product._id}`} className={classes["link-to-detail"]}>
      <li className={classes.container}>
        <div className={classes["product-imgBox"]}>
          <img src={product.mainImages[0]} alt="게시글 사진" />
        </div>
        <div className={classes["product-info"]}>
          <h4>{product.name}</h4>
          <div className={classes["product-period"]}>
            <small>
              {product.extra?.startDate ? product.extra?.endDate : "2023.10.31"}{" "}
              ~
            </small>
            <small>
              {" "}
              {product.extra?.endDate ? product.extra?.endDate : "2023.11.01"}
            </small>
          </div>
          <p className={classes["product-price"]}>{product.price}원</p>
        </div>
      </li>
    </Link>
  );
};

export default ProductItem;
