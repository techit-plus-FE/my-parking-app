import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// 모든페이지에서 최초접속시 자동으로 스크롤 맨위로 오게하는 컴포넌트입니다.
const ScrollTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default ScrollTop;
