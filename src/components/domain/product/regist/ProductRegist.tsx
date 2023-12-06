import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ProductForm from "./ProductForm";
import useCustomAxios from "../../../../services/useCustomAxios";

const ProductRegist = () => {
  const navigate = useNavigate();
  const axiosInstance = useCustomAxios();

  const initialProduct: ProductItemType = {
    name: "",
    content: "",
    price: 0,
    mainImages: [],
    extra: {
      startDate: "",
      endDate: "",
      address: "",
      lat: "",
      lng: "",
    },
  };

  const handleSubmit = async (
    formData: ProductItemType,
    mainImages: string[]
  ) => {
    // 1. 파일 업로드 http post
    const imagesRes = await axiosInstance.post(`/files`, mainImages);
    console.log(imagesRes.data.file.path);

    // 2. 바이너리양식 이미지 추출해서 최종 Post 보내기
    const sendAllData = {
      name: formData.name,
      content: formData.content,
      price: formData.price,
      mainImages: imagesRes.data.file.path,
      extra: {
        startDate: formData.extra?.startDate,
        endDate: formData.extra?.endDate,
        address: formData.extra?.address,
        lat: formData.extra?.lat,
        lng: formData.extra?.lng,
      },
    };

    // 2. 전체 양식 http post
    const response = await axiosInstance.post(`/seller/products`, sendAllData);

    console.log(response.data);
    navigate("/home");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <ProductForm onSubmit={handleSubmit} product={initialProduct} />;
};

export default ProductRegist;
