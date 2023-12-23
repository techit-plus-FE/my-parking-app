import axios from "axios";
import { RefObject } from "react";
import { BASE_URL } from "../services/BaseUrl";
import { StateCreator } from "zustand";

const requestUploadImages = async (ImageRef: RefObject<HTMLInputElement>) => {
  if (ImageRef.current === null) throw new Error();
  if (ImageRef.current.files === null) throw new Error();
  // formData 사용
  const formData = new FormData();
  for (let i = 0; i < ImageRef.current.files.length; i++) {
    formData.append("attach", ImageRef.current.files[i]);
  }

  try {
    const imagesRes: imageResponseType = await axios.post(
      `${BASE_URL}/files`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  
    // 응답에서 'path' 값만 추출하여 배열로
    let imageUrlLists: string[] = [];

    if (imagesRes.data.files) {
      imageUrlLists = imagesRes.data.files.map(
        (file: FilesResType) => `${BASE_URL+file.path}`
        // (file: FilesResType) => `${file.path}`
      );
    }
    if (imagesRes.data.file) {
      const imagePath = `${BASE_URL+imagesRes.data.file.path}`;
      // const imagePath = `${imagesRes.data.file.path}`;
      imageUrlLists.push(imagePath);
    }

    return imageUrlLists;
  } catch (err: unknown) {
    console.error("이미지를 업로드하는데 문제가 발생하였습니다.", err);
    return [] as string[];
  }
};

export const createImageSlice: StateCreator<ImageSlice, []> = () => ({
  uploadImage: (ref: RefObject<HTMLInputElement>) => {
    return requestUploadImages(ref);
  },
});
