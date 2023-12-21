import classes from "./MainImagesComponent.module.css";

import NOIMAGES from "../../../../assets/images/no-images.png";
import { BASE_URL } from "../../../../services/BaseUrl";
import { Box } from "@mui/system";

const MainImagesComponent = ({ product }: { product: ProductItemType }) => {
  return (
    <Box className={classes.wrapper}>
      {product.mainImages && product.mainImages!.length > 0 ? (
        <img src={BASE_URL + product.mainImages[0].url} alt="이미지 미리보기" />
      ) : (
        <img src={NOIMAGES} />
      )}

      {/* 추후) 케러셀로 여러 이미지 출력하기 */}
    </Box>
  );
};

export default MainImagesComponent;
