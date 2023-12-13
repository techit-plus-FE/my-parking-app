import { Link } from "react-router-dom";

import classes from "./ProductItem.module.css";

import NOIMAGES from "../../../../assets/images/no-images.png";
import OrderCard from "../../order-history/ordercard/OrderCard";

type Props = {
  key: number | undefined;
  product: ProductItemType;
  flexDirection?: string;
};

const ProductItem: React.FC<Props> = ({ product, flexDirection }) => {
  // const { productId } = useParams<{ productId: string }>();

  return (
    <Link to={`/products/${product._id}`} className={classes["link-to-detail"]}>
      <OrderCard
        title={product.name}
        productPrice={product.price}
        image={
          product.mainImages!.length > 0
            ? product.mainImages && product.mainImages[0]
            : NOIMAGES
        }
        flexDirection={flexDirection}
      />
    </Link>
  );
};

export default ProductItem;
