import classes from "./SellerInfoComponent.module.css";
import DEFAUlT_AVATAR from "../../../../assets/images/default-avatar.png";

const DUMMY_USER = {
  _id: 6,
  email: "swagger@market.com",
  name: "스웨거",
  type: "user",
  phone: "01011112222",
  address: "서울시 강남구 역삼동 123",
  createdAt: "2023.11.22 10:20:03",
  updatedAt: "2023.11.22 10:20:03",
};

const SellerInfoComponent = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes["seller-info"]}>
        <div className={classes["avatar-box"]}>
          <img src={DEFAUlT_AVATAR} alt="" />
        </div>
        <h4>{DUMMY_USER.name}</h4>
      </div>
      <button>스트랩버튼</button>
    </div>
  );
};

export default SellerInfoComponent;
