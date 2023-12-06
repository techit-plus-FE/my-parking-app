import React from "react";
import classes from "./CommonOrderListUl.module.css";

const CommonOrderListUI: React.FC = () => {
  return (
    <div className={classes.CommonOrderListUI}>
      <div className={classes.orderWrapper}>
        <div>
          <div className={classes.imgWrapper}>
            <img src="https://picsum.photos/100/100" alt="" />
          </div>
        </div>

        <div className={classes.itemWrapper}>
          <h4>애플트리 건물주</h4>
          <span>1201.54.4564</span>
          <address>
            <p>강남구 어쩌고</p>
          </address>
          <span className={classes.orderPrice}>1000원</span>
        </div>
      </div>
    </div>
  );
};

export default CommonOrderListUI;
