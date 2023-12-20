import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductItem from "./ProductItem";
import { useBoundStore } from "../../../../store";

import classes from "./ProductList.module.css";
import { IconButton } from "@mui/material";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type Props = {
  products: ProductListType | undefined;
  isMobile: boolean;
};
const ProductList = ({ products, isMobile }: Props) => {
  const navigate = useNavigate();
  const user = useBoundStore((state) => state.userBasicInfo);

  const [selectValue, setSelectValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  // select의 item의 value값을 받아 처리하는 함수 -> 여기서 받아오는 값에 따라 정렬 요청 트리거를 생성해주어야 합니다.
  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectValue(event.target.value as string);
  };

  const handleMoveRegist = () => {
    if (user.type === "seller") {
      navigate("/products/regist");
    } else {
      alert("판매자로 가입한 회원만 등록이 가능합니다.");
      if (confirm("판매자로 회원가입을 하시겠습니까?")) {
        navigate("/signup");
      }
    }
  };

  return (
    <>
      {isMobile ? (
        <div className={classes.containerMobile}>
          <div className={classes["product-utils"]}>
            <IconButton size="large" onClick={handleMoveRegist}>
              <AddLocationIcon
                fontSize="large"
                sx={{ color: "var(--color-primary-600)" }}
              />
            </IconButton>

            <Box sx={{ minWidth: 100 }}>
              <FormControl fullWidth>
                <InputLabel id="filter">필터</InputLabel>
                <Select
                  labelId="filter"
                  id="filter-select"
                  label="filter"
                  value={selectValue}
                  open={open}
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="choice">
                    <em>선택</em>
                  </MenuItem>
                  <MenuItem value={10}>날짜순</MenuItem>
                  <MenuItem value={20}>최신순</MenuItem>
                  <MenuItem value={30}>저렴한순</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>

          <ul className={classes["product-list"]}>
            {products && products.length > 0 ? (
              products.map((product) => {
                return <ProductItem key={product._id} product={product} />;
              })
            ) : (
              <p>등록된 상품이 암것도 없어요ㅠㅠ</p>
            )}
          </ul>
        </div>
      ) : (
        <div className={classes.container}>
          <div className={classes["product-utils"]}>
            <IconButton size="medium" onClick={handleMoveRegist}>
              <AddLocationIcon
                fontSize="large"
                sx={{
                  color: "var(--color-white)",
                  borderRadius: "10px",
                }}
              />
            </IconButton>

            <Box sx={{ minWidth: 100 }}>
              <FormControl fullWidth>
                <InputLabel id="filter">필터</InputLabel>
                <Select
                  labelId="filter"
                  id="filter-select"
                  label="filter"
                  value={selectValue}
                  open={open}
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="choice">
                    <em>선택</em>
                  </MenuItem>
                  <MenuItem value={10}>날짜순</MenuItem>
                  <MenuItem value={20}>최신순</MenuItem>
                  <MenuItem value={30}>저렴한순</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>

          <ul className={classes["product-list"]}>
            {products && products.length > 0 ? (
              products.map((product) => {
                return <ProductItem key={product._id} product={product} />;
              })
            ) : (
              <p>해당 위치에 등록된 주차장이 없네요😭</p>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default ProductList;
