// 이전 모바일 스타일 등록하기 양식을 하나로 합쳐진 양식 폼입니다.
// 해당 상품 등록하기 폼은 추후 수정할 페이지와 공통으로 사용할 컴포넌트로 생각하고 구성한 컴포넌트입니다.
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import classes from "./ProductForm.module.css";

import KakaoMap from "../../../common/map/KakaoMap";

import { BASE_URL } from "../../../../services/BaseUrl";
import { PROTOCAL } from "../../../../services/BaseUrl";
import { HOST } from "../../../../services/BaseUrl";
import { PORT } from "../../../../services/BaseUrl";

type Props = {
  title: string;
  onSubmit: (data: ProductItemType, images: string[] | undefined) => void;
  product: ProductItemType;
};

// 이미지 파일 응답 데이터 타입
type FilesResType = {
  originalname: string;
  name: string;
  path: string;
};
const ProductForm = ({ title, onSubmit, product }: Props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProductItemType>({
    name: product.name,
    content: product.content,
    price: product.price,
    extra: {
      startDate: product.extra?.startDate,
      endDate: product.extra?.endDate,
      address: product.extra?.address,
      lat: product.extra?.lat,
      lng: product.extra?.lng,
    },
  });
  // 이미지서버응답값중 path값만 추출해서 담은 배열 -> 추후 상품등록하기때 첨부할 이미지 파일배열 상태
  const [mainImages, setMainImages] = useState<string[] | undefined>([]);
  // 미리보기 이미지 배열 상태
  const [images, setImages] = useState<string[] | undefined>(
    product.mainImages
  );

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    // extra 필드일땐 한번더 중첩복사
    if (["startDate", "endDate"].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        extra: {
          ...prevData.extra,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddImagesChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const imageLists = event.target.files;

    if (imageLists !== null) {
      // formData 사용
      const formData = new FormData();

      for (let i = 0; i < imageLists.length; i++) {
        formData.append("attach", imageLists[i]);
      }

      try {
        const imagesRes = await axios.post(`${BASE_URL}/files`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(imagesRes.data);
        // 응답에서 'path' 값만 추출하여 배열로
        let imageUrlLists: string[] = [];

        if (imagesRes.data.files) {
          imageUrlLists = imagesRes.data.files.map(
            (file: FilesResType) => `${PROTOCAL}://${HOST}:${PORT}${file.path}`
          );
        }
        if (imagesRes.data.file) {
          const imagePath = `${PROTOCAL}://${HOST}:${PORT}${imagesRes.data.file.path}`;
          imageUrlLists.push(imagePath);
        }

        // 최대 10개까지만
        const slicedImageUrlLists = imageUrlLists.slice(0, 10);
        console.log(slicedImageUrlLists);
        setMainImages(slicedImageUrlLists);
      } catch (err) {
        console.error("이미지를 업로드하는데 문제가 발생하였습니다.", err);
      }
    }

    // 기존 미리보기 이미지 출력 로직
    if (imageLists) {
      let imageUrlLists: string[] = [...images!];
      for (let i = 0; i < imageLists!.length; i++) {
        // 해당 filelist 객체를 url로 반환시켜주는 메소드 적용
        const currentImageUrl = URL.createObjectURL(imageLists![i]);
        imageUrlLists.push(currentImageUrl);
      }

      // 최대 10장까지만 받기
      if (imageUrlLists.length > 10) {
        imageUrlLists = imageUrlLists.slice(0, 10);
      }

      setImages(imageUrlLists);
    }
  };

  // 클릭 시 이미지 삭제 -> issues: 서버에 이미 보낸 이미지파일이라 삭제가 안됨.. 미리보기 사진만 없어지는 문제있음
  const handleDeleteImage = (id: number) => {
    // 클릭한 이미지의 path 값을 가져오기
    const deletedImagePath = mainImages?.[id];

    // images 상태에서 클릭한 이미지를 제거
    const updatedImages = images?.filter((_, index: number) => index !== id);
    setImages(updatedImages);

    // mainImages 상태에서도 클릭한 이미지의 path를 제거
    if (deletedImagePath) {
      const updatedMainImages = mainImages?.filter(
        (imagePath) => imagePath !== deletedImagePath
      );
      setMainImages(updatedMainImages);
    }
  };

  // 최종 서버로 상태 끌어올리기
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(formData, mainImages);
  };

  return (
    <form
      encType="multipart/form-data"
      className={classes["form-container"]}
      onSubmit={handleSubmit}
    >
      <h2>내 주차장 {title}하기</h2>
      <div className={classes["info-wrapper"]}>
        <label htmlFor="name">제목</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="content">내용</label>
        <textarea
          name="content"
          id="content"
          value={formData.content}
          cols={30}
          rows={10}
          required
          onChange={handleChange}
        />

        <label htmlFor="startDate">대여 시작일</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.extra?.startDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="endDate">대여 종료일</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.extra?.endDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="price">대여 비용(원)</label>
        <input
          type="number"
          id="price"
          name="price"
          min={0}
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div className={classes["images-wrapper"]}>
        <label htmlFor="images">파일 선택하기</label>
        <input
          type="file"
          id="images"
          name="images"
          multiple
          onChange={handleAddImagesChange}
        />

        {/* 이미지 미리보기 */}
        <div className={classes["img-pre-list"]}>
          {images?.map((image, id) => (
            <div key={id} className={classes["img-pre-item"]}>
              <img src={image} alt={`${image}-${id}`} />
              <button type="button" onClick={() => handleDeleteImage(id)}>
                삭제
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={classes["location-wrapper"]}>
        <label>위치 선택하기</label>
        <KakaoMap
          formData={formData}
          setFormData={setFormData}
          product={product}
        />
      </div>

      <div className={classes.action}>
        <button type="button" onClick={() => navigate(-1)}>
          취소
        </button>
        <button type="submit">저장</button>
      </div>
    </form>
  );
};

export default ProductForm;
