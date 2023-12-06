import classes from "./SellerInfoComponent.module.css";
import DEFAUlT_AVATAR from "../../../../assets/images/default-avatar.png";

const SellerInfoComponent = ({ user }: { user: UserBasicInfoType }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes["seller-info"]}>
        <div className={classes["avatar-box"]}>
          <img src={DEFAUlT_AVATAR} alt="" />
        </div>
        <h4>{user.name}</h4>
      </div>
      <button>스트랩버튼</button>
    </div>
  );
};

export default SellerInfoComponent;
