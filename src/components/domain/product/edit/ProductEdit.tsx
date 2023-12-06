import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../regist/ProductForm";
import useCustomAxios from "../../../../services/useCustomAxios";

const ProductEdit = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
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

  const handleSumbit = async (
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

    const response = await axiosInstance.patch(
      `seller/products/${productId}`,
      sendAllData
    );
    console.log(response.data);

    navigate(`/products/${productId}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <ProductForm onSubmit={handleSumbit} product={initialProduct} />;
};

export default ProductEdit;
