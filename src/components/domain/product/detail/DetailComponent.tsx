import ShowKakaoMap from "../../../common/map/ShowKakaoMap";
import classes from "./DetailComponent.module.css";

const DetailComponent = ({ product }: { product: ProductItemType }) => {
  const { createdAt: productCreatedAt } = product;

  // 날짜 시간 제거 함수 -> 즉시 실행함수로 -> 함수로 만들어서 사용하기 실패. 나중에 다시시도
  // const removeLocalTime = (createdAt: string) => {
  //   if (createdAt === replyCreatedAt) {
  //     return replyCreatedAt.slice(0, 11);
  //   } else if (createdAt === productCreatedAt)
  //     return productCreatedAt.slice(0, 11);
  // };

  // const removeReplyCreatedAt = replyCreatedAt.slice(0, 11);
  const removeProductCreatedAt = productCreatedAt?.slice(0, 11);

  return (
    <div className={classes.wrapper}>
      <h3 className={classes.title}>{product.name}</h3>

      <p className={classes.createdAt}>{removeProductCreatedAt}</p>

      <div className={classes.content}>{product.content}</div>

      <div className={classes.period}>
        <h3>대여기간</h3>
        <span>{product.extra?.startDate} </span>
        {"~"}
        <span> {product.extra?.endDate}</span>
      </div>

      <div className={classes["location-box"]}>
        <h3>위치</h3>
        <ShowKakaoMap product={product} />
      </div>

      <div className={classes["replies-list"]}>
        <h3>리뷰</h3>
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
        })}
      </div>
    </div>
  );
};

export default DetailComponent;
