// import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import SearchHeader from "../../components/layouts/SearchHeader";

// 이 레이아웃은 헤더와 푸터가 적용되지 않은 레이아웃입니다.
// 모든 페이지에서 적용할 상태나 테마를 여기서 꾸려주어야 합니다. -> 전체 색상테마(다크모드상태), 토큰상태)
interface LayoutProps {
  hasHeader: boolean;
  hasFooter: boolean;
  hasSearchHeader: boolean;
}

const RootLayout = (props: LayoutProps) => {
  const { hasHeader, hasFooter, hasSearchHeader } = props;
  return (
    <>
      {hasHeader && <Header />}
      {hasSearchHeader && <SearchHeader />}
      <Outlet />
      {hasFooter && <Footer />}
    </>
  );
};

export default RootLayout;
