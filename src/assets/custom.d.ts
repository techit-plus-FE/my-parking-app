// 커스터마이징한 변수나 함수를 컴파일러가 인식하게 할 수 있도록 설정해주는 파일입니다.
// ts에서 문자열로 모듈을 지정해줄 경우에 외부 모듈로 인식
// 독립성을 갖는 모듈로 만들어 줍니다.

// .svg 확장자 파일에서 ReactComponent의 존재를 인식시켜주기
declare module "*.svg" {
  import { FC, SVGProps } from "react";

  export const content: FC<SVGProps<SVGAElement>>;

  const src: string;
  export default src;
}
