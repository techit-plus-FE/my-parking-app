import MediaQuery from "../../../UI/MediaQuery";
import ShowKakaoMap from "../../../common/map/ShowKakaoMap";
import classes from "./DetailComponent.module.css";
import { Typography } from "@mui/material";

const DetailComponent = ({ product }: { product: ProductItemType }) => {
  const { createdAt: productCreatedAt } = product;
  const removeProductCreatedAt = productCreatedAt?.slice(0, 11);
  const isMobile = MediaQuery();

  return (
    <div className={classes.wrapper}>
      <Typography
        variant="h3"
        fontSize={isMobile ? "25px" : "35px"}
        sx={{ color: "var(--color-primary-700)", fontWeight: "600" }}
      >
        {product.name}
      </Typography>

      <Typography className={classes.createdAt}>
        {removeProductCreatedAt}
      </Typography>

      <Typography
        className={classes.content}
        fontSize={isMobile ? "12px" : "18px"}
      >
        {product.content}
      </Typography>

      <div className={classes.period}>
        <Typography
          fontSize={isMobile ? "15px" : "24px"}
          sx={{
            color: "var(--color-primary-700)",
            fontWeight: "600",
            marginBottom: "20px",
          }}
        >
          대여기간
        </Typography>
        <div>
          <span>{product.extra?.startDate} </span>
          <span> {product.extra?.endDate}</span>
        </div>
      </div>

      <div className={classes["location-box"]}>
        <Typography
          fontSize={isMobile ? "15px" : "24px"}
          sx={{
            color: "var(--color-primary-700)",
            fontWeight: "600",
            marginBottom: "20px",
          }}
        >
          위치
        </Typography>
        <ShowKakaoMap product={product} />
      </div>

      <div className={classes["replies-list"]}>
        {/* <h3>리뷰</h3>
        {product.replies?.map((reply) => {
          return (
            <div key={reply._id} className={classes["reply-box"]}>
              <div className={classes["reply-box-info"]}>
                <small>{reply.userName}</small>
                <small>{reply.createdAt.slice(0, 11)}</small>
              </div>
              <p>{reply.content}</p>
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default DetailComponent;
