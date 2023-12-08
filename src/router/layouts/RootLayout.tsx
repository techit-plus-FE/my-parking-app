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
  isNeedLoggedIn: boolean;
  hasHeader: boolean;
  hasFooter: boolean;
  hasSearchHeader: boolean;
}

// isNeedLoggedIn = true : 로그인이 필요한 페이지들
// isNeedLoggedIn = false : 로그인이 필요하지 않는 페이지들
const RootLayout = (props: LayoutProps) => {
  const { isNeedLoggedIn, hasHeader, hasFooter, hasSearchHeader } = props;
  const isLogin = useBoundStore((state) => state.isLoggedIn);

  // 로그인이 되지 않은 상태에서만 확인창을 띄우기 위한 변수 추가
  const shouldShowLoginConfirmation = isNeedLoggedIn && !isLogin;

  return (
    <>
      <ScrollTop />
      {shouldShowLoginConfirmation ? (
        // 로그인이 되지 않은 상태이면서 로그인이 필요한 페이지일 때
        <>
          {confirm("로그인이 필요합니다. 로그인을 진행하시겠습니까?") ? (
            <LoginPage />
          ) : (
            <ErrorPage />
          )}
        </>
      ) : (
        // 로그인이 되어 있거나 로그인이 필요하지 않은 페이지일 때
        <PageContainer>
          {hasHeader && <Header />}
          {hasSearchHeader && <SearchHeader />}
          <Outlet />
          {hasFooter && <Footer />}
        </PageContainer>
      )}
    </>
  );
};

export default RootLayout;
