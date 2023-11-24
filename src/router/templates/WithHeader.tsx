import { ReactNode, FC } from "react";
import Header from "../../components/layouts/Header";

interface WithHeaderProps {
  children: ReactNode;
}

// 헤더컴포넌트를 포함하는 컴포넌트들을 리턴해주는 컴포넌트함수(함수체이닝)
const WithHeader: (Component: FC<WithHeaderProps>) => FC<WithHeaderProps> = (
  Component
) => {
  const WithHeaderComponent: FC<WithHeaderProps> = ({ children, ...rest }) => {
    return (
      <>
        <Header />
        <Component {...rest}>{children}</Component>
      </>
    );
  };

  return WithHeaderComponent;
};

export default WithHeader;
