import { Outlet } from "react-router-dom";

// 이 레이아웃은 헤더와 푸터가 적용되지 않은 레이아웃입니다.
// 모든 페이지에서 적용할 상태나 테마를 여기서 꾸려주어야 합니다. -> 전체 색상테마(다크모드상태), 토큰상태)
const RootLayout = () => {
  const [hasFooter, setHasFooter] = useState(false);
  const [hasHeader, setHasHeader] = useState(false);
  const [hasFooter, setHasFooter] = useState(false);
  const [hasFooter, setHasFooter] = useState();

  return (
    <>
      {}
      <Outlet />
    </>
  );
};

export default RootLayout;
