// 유저가 seller일때 마이프로덕트페이지에서 본인의 판매 상품 리스트를 보여주는 컴포넌트입니다.
import React, { useEffect, useState } from "react";
import useCustomAxios from "../../../../services/useCustomAxios";
import { useNavigate } from "react-router-dom";
import MediaQuery from "../../../UI/MediaQuery";
import classes from "./OrderHistory.module.css";
import Loading from "../../../common/Loading";
import { useBoundStore } from "../../../../store";
import MediaQueryMain from "../../../UI/MediaQueryMain";
import ProductList from "./ProductList";
import { Box } from "@mui/material";



const MyProductList = () => {
  const [loading, setLoading] = useState(true);
  const isMobile = MediaQueryMain();
  const getMyProducts = useBoundStore(state=>state.getMyProducts)
  const accessToken = useBoundStore(state=>state.userToken.accessToken)
  const [myProducts, setMyProducts] = useState<ProductListType>([])
  const getAndSetMyProducts = async ()=> {
    setLoading(true)
    setMyProducts(await getMyProducts(accessToken))
    setLoading(false)
  }

  useEffect(()=>{
    getAndSetMyProducts()
  }, []);

  return (
    <>
    {loading ? <Loading /> 
    : <Box>
      <ProductList products={myProducts} isMobile={isMobile} isMyList={true}/>  
    </Box>}
    </>
  );
};

export default MyProductList;
