import { ReactNode, FC } from "react";
import SearchHeader from "../../components/layouts/SearchHeader";

interface WithHeaderProps {
  children: ReactNode;
}

// 헤더컴포넌트를 포함하는 컴포넌트들을 리턴해주는 컴포넌트함수(함수체이닝)
const WithSearchHeader: (
  Component: FC<WithHeaderProps>
) => FC<WithHeaderProps> = (Component) => {
  const WithSearchHeaderComponent: FC<WithHeaderProps> = ({
    children,
    ...rest
  }) => {
    return (
      <>
        <SearchHeader />
        <Component {...rest}>{children}</Component>
      </>
    );
  };

  return WithSearchHeaderComponent;
};

export default WithSearchHeader;
