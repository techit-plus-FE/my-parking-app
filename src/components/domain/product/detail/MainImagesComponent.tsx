import classes from "./MainImagesComponent.module.css";

const MainImagesComponent = ({ product }: { product: ProductItemType }) => {
  return (
    <div className={classes.wrapper}>
      <img src={product.mainImages[0]} alt="이미지 미리보기"></img>
      {/* 추후) 케러셀로 여러 이미지 출력하기 */}
    </div>
  );
};

export default MainImagesComponent;
