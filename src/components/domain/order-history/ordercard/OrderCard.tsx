import React from "react";
import styles from "./OrderCard.module.css";

const CommonOrderListUI: React.FC = () => {
  console.log(styles);
  return (
    <div className={styles.orderCardContainer}>
      <div className={styles.orderWrapper}>
        <div className={styles.imgWrapper}>
          <img src="https://picsum.photos/400/400" alt="" />
        </div>
        <div className={styles.itemWrapper}>
          <h4>애플트리 건물주</h4>
          <span>1201.54.4564</span>
          <address>
            <p>강남구 어쩌고</p>
          </address>
          <span className={styles.orderPrice}>1000원</span>
        </div>
      </div>
    </div>
  );
};

export default CommonOrderListUI;
