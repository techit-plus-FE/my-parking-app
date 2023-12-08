import { Outlet } from "react-router-dom";

import PageContainer from "../../components/layouts/PageContainer";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import SearchHeader from "../../components/layouts/SearchHeader";
import ScrollTop from "../../components/common/ScrollTop";
import { useBoundStore } from "../../store";
import ErrorPage from "../../pages/ErrorPage";
import LoginPage from "../../pages/auth/LoginPage";

// 이 레이아웃은 헤더와 푸터가 적용되지 않은 레이아웃입니다.
// 모든 페이지에서 적용할 상태나 테마를 여기서 꾸려주어야 합니다. -> 전체 색상테마(다크모드상태), 토큰상태)
interface LayoutProps {
  isLoggedIn: boolean;
  hasHeader: boolean;
  hasFooter: boolean;
  hasSearchHeader: boolean;
}

const RootLayout = (props: LayoutProps) => {
  const { isLoggedIn, hasHeader, hasFooter, hasSearchHeader } = props;
  // 현재 로그인 상태와 로그인때만 보여줄 페이지를 비교해야합니다.
  const isLogin = useBoundStore((state) => state.isLoggedIn);

  return (
    <>
      <ScrollTop />
      {isLoggedIn === isLogin ? (
        <PageContainer>
          {hasHeader && <Header />}
          {hasSearchHeader && <SearchHeader />}
          <Outlet />
          {hasFooter && <Footer />}
        </PageContainer>
      ) : (
        <>
          {confirm(
            "해당 페이지는 회원유저에게만 보여지는 페이지입니다. 로그인을 진행하시겠습니까?"
          ) ? (
            <LoginPage />
          ) : (
            <ErrorPage />
          )}
        </>
      )}
    </>
  );
};

export default RootLayout;
