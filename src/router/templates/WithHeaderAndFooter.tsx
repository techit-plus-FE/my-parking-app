import { ReactNode, FC } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";

interface WithHeaderAndFooterProps {
  children: ReactNode;
}

// 푸터컴포넌트를 포함하는 컴포넌트들을 리턴해주는 컴포넌트함수(함수체이닝)
const WithHeaderAndFooter: (
  Component: FC<WithHeaderAndFooterProps>
) => FC<WithHeaderAndFooterProps> = (Component) => {
  const WithFooterAndFooterComponent: FC<WithHeaderAndFooterProps> = ({
    children,
    ...rest
  }) => {
    return (
      <>
        <Header />
        <Component {...rest}>{children}</Component>
        <Footer />
      </>
    );
  };

  return WithFooterAndFooterComponent;
};

export default WithHeaderAndFooter;
