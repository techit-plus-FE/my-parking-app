import classes from "./MainImagesComponent.module.css";

import NOIMAGES from "../../../../assets/images/no-images.png";

const MainImagesComponent = ({ product }: { product: ProductItemType }) => {
  return (
    <div className={classes.wrapper}>
      {product.mainImages!.length > 0 ? (
        <img
          src={product.mainImages && product.mainImages[0]}
          alt="이미지 미리보기"
        />
      ) : (
        <img src={NOIMAGES} />
      )}

      {/* 추후) 케러셀로 여러 이미지 출력하기 */}
    </div>
  );
};

export default MainImagesComponent;
