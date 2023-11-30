import KakaoMap from "../../../common/map/KakaoMap";
import classes from "./DetailComponent.module.css";

const DetailComponent = ({ product }: { product: ProductDetailItemType }) => {
  return (
    <div className={classes.wrapper}>
      <h3 className={classes.title}>{product.name}</h3>

      <p className={classes.createdAt}>{product.createdAt}</p>

      <div className={classes["location-box"]}>
        <h3>위치</h3>
        <KakaoMap />
      </div>

      <div className={classes.period}>
        <h3>대여기간</h3>
        <span>{product.extra?.periodFrom || "2023.11.22"} </span>
        {"~"}
        <span> {product.extra?.periodTo || "2023.11.23"}</span>
      </div>

      <div className={classes["replies-list"]}>
        <h3>리뷰</h3>
        <ul>
          <li>1. 넘 좋아용</li>
          <li>2. 주인분이 넘 착함</li>
          <li>3 .안녕</li>
        </ul>
      </div>
    </div>
  );
};

export default DetailComponent;
