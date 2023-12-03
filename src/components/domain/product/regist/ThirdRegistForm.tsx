// 세번째 양식 컴포넌트
// 나머지 기타 정보들을 담는 양식이 필요함
import { ChangeEvent, useState } from "react";
import classes from "./ThirdRegisForm.module.css";

type Props = {
  onPrev: () => void;
  onSubmit: (images: string[], others: ProductOthersInfoType) => void;
};

const ThirdRegistForm = ({ onSubmit, onPrev }: Props) => {
  // 추가 정보를 저장할 상태 변수
  const [othersInfo, setOthersInfo] = useState<ProductOthersInfoType>({
    name: "",
    price: "",
    content: "",
  });
  // 이미지 파일 상태만 따로 배정
  const [mainImages, setMainImages] = useState<string[]>([]);

  // 이미지 저장 이벤트 함수
  const handleAddImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const imageLists = e.target.files;
    // 받은 이미지 파일들 복사후 배열에 저장
    let imageUrlLists = [...mainImages];

    for (let i = 0; i < imageLists!.length; i++) {
      // 해당 filelist 객체를 url로 반환시켜주는 메소드 적용
      const currentImageUrl = URL.createObjectURL(imageLists![i]);
      imageUrlLists.push(currentImageUrl);
    }

    // 최대 10장까지만 받기
    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }

    setMainImages(imageUrlLists);
  };
  // 클릭 시 이미지 삭제
  const handleDeleteImage = (id: number) => {
    setMainImages(mainImages.filter((_, index: number) => index !== id));
  };

  const handleChange = function (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setOthersInfo({
      ...othersInfo,
      [name]: value,
    });
  };

  // 최종 서버로 요청 전달
  const handleSubmitFinal = () => {
    onSubmit(mainImages, othersInfo); // 상태 변수를 전달하여 부모 컴포넌트의 onSubmit 함수 호출
  };

  const handlePrev = () => {
    onPrev();
  };

  return (
    <div className={classes.container}>
      <h2>주차장의 정보를 입력하세요.</h2>

      <form className={classes.form}>
        <label htmlFor="name">제목</label>
        <input
          id="name"
          type="text"
          name="name"
          value={othersInfo.name}
          onChange={handleChange}
          required
        />

        <div className={classes["img-box"]}>
          <label htmlFor="img">이미지</label>
          <input
            id="img"
            type="file"
            multiple
            required
            onChange={handleAddImagesChange}
          />

          {/* 이미지 미리보기 */}
          <div className={classes["img-pre-list"]}>
            {mainImages.map((image, id) => (
              <div key={id} className={classes["img-pre-item"]}>
                <img src={image} alt={`${image}-${id}`} />
                <button type="button" onClick={() => handleDeleteImage(id)}>
                  삭제
                </button>
              </div>
            ))}
          </div>
        </div>

        <label htmlFor="price">가격</label>
        <input
          id="price"
          type="text"
          name="price"
          value={othersInfo.price}
          onChange={handleChange}
          required
        />

        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          name="content"
          value={othersInfo.content}
          onChange={handleChange}
          required
        />
      </form>
      <div className={classes.active}>
        <button className={classes.prevBtn} onClick={handlePrev}>
          이전
        </button>
        <button className={classes.nextBtn} onClick={handleSubmitFinal}>
          등록
        </button>
      </div>
    </div>
  );
};

export default ThirdRegistForm;
