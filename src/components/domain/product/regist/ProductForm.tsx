// 이전 모바일 스타일 등록하기 양식을 하나로 합쳐진 양식 폼입니다.
// 해당 상품 등록하기 폼은 추후 수정할 페이지와 공통으로 사용할 컴포넌트로 생각하고 구성한 컴포넌트입니다.
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./ProductForm.module.css";
import KakaoMap from "../../../common/map/KakaoMap";

type Props = {
  onSubmit: (data: ProductItemType, images: string[]) => void;
  product: ProductItemType;
};
const ProductForm = ({ onSubmit, product }: Props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProductItemType>({
    name: product.name,
    content: product.content,
    price: product.price,
    extra: {
      startDate: product.extra?.startDate || "",
      endDate: product.extra?.endDate || "",
      address: product.extra?.address || "",
      lat: product.extra?.lat || "",
      lng: product.extra?.lng || "",
    },
  });
  // 이미지만 따로 받기 - 바이너리 데이터로 교체하고 보내줘야해서
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
  // 이미지 저장 이벤트 함수
  const handleAddImagesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const imageLists = event.target.files;

    if (imageLists) {
      // 받은 이미지 파일들 복사후 배열에 저장
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

      event.target.value = "";

      setImages(imageUrlLists);
    }
  };

  // 클릭 시 이미지 삭제
  const handleDeleteImage = (id: number) => {
    const filteredImages = images?.filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (_: any, index: number) => index !== id
    );
    setImages(filteredImages);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(formData, images);
    onSubmit(formData, images!);
  };

  return (
    <form className={classes["form-container"]} onSubmit={handleSubmit}>
      <h2>내 주차장 등록하기</h2>
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
        />

        <label htmlFor="price">대여 비용(원)</label>
        <input
          type="number"
          id="price"
          name="price"
          min={0}
          value={formData.price}
          onChange={handleChange}
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
        <KakaoMap formData={formData} setFormData={setFormData} />
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
