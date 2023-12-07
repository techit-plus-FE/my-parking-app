import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductForm from "./ProductForm";
// import useCustomAxios from "../../../../services/useCustomAxios";
import { BASE_URL } from "../../../../services/BaseUrl";
import { useBoundStore } from "../../../../store";

const ProductRegist = () => {
  const navigate = useNavigate();
  const token = useBoundStore((s) => s.userToken.accessToken);
  // const axiosInstance = useCustomAxios();

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
    data: ProductItemType,
    mainImages: string[] | undefined
  ) => {
    // 2. 바이너리양식 이미지 추출해서 최종 Post 보내기
    const sendAllData = {
      name: data.name,
      content: data.content,
      shippingFees: 0,
      price: Number(data.price),
      mainImages: mainImages,
      show: true, // 기본값
      active: true, // 기본값
      quantity: 1, // 기본값
      buyQuantity: 0, // 기본값
      extra: {
        startDate: data.extra?.startDate,
        endDate: data.extra?.endDate,
        address: data.extra?.address,
        lat: data.extra?.lat,
        lng: data.extra?.lng,
      },
    };

    const response = await axios.post(
      `${BASE_URL}/seller/products`,
      sendAllData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    navigate("/home");
  };

  return (
    <ProductForm
      title="등록"
      onSubmit={handleSubmit}
      product={initialProduct}
    />
  );
};

export default ProductRegist;
