import { ReactNode, FC } from "react";
import Footer from "../../components/layouts/Footer";

interface WithFooterProps {
  children: ReactNode;
}

// 푸터컴포넌트를 포함하는 컴포넌트들을 리턴해주는 컴포넌트함수(함수체이닝)
const WithFooter: (Component: FC<WithFooterProps>) => FC<WithFooterProps> = (
  Component
) => {
  const WithFooterComponent: FC<WithFooterProps> = ({ children, ...rest }) => {
    return (
      <>
        <Component {...rest}>{children}</Component>
        <Footer />
      </>
    );
  };

  return WithFooterComponent;
};

export default WithFooter;
