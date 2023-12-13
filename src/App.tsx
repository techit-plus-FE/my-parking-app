import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./router/layouts/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import LandingPage from "./pages/LandingPage";
// 오오스
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
// 회원
import MyPage from "./pages/my-services/MyPage";
import MyPageEditPage from "./pages/my-services/MyPageEditPage";
// 상품
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/products/ProductDetailPage";
import ProductEditPage from "./pages/products/ProductEditPage";
import ProductRegistPage from "./pages/products/ProductRegistPage";
// 주문
import OrderHistoryPage from "./pages/order-hisotry/OrderHistoryPage";
import OrderHistoryDetailPage from "./pages/order-hisotry/OrderHistoryDetailPage";
// 구매
import PurchasePage from "./pages/purchase/PurchaseFormPage";
import PurchaseResultPage from "./pages/purchase/PurchaseResultPage";
import SearchPage from "./pages/SearchPage";
import { ThemeProvider, useTheme } from "@emotion/react";
import { Button, CssBaseline, createTheme } from "@mui/material";
import { useState } from "react";
import { useBoundStore } from "./store/index";
import classes from "./App.module.css";
import Theme from "./components/UI/Theme";

// 라우터 설정

const router = createBrowserRouter([
  {
    path: "/",
    id: "NoLayout",
    element: (
      <RootLayout
        isNeedLoggedIn={false}
        hasHeader={false}
        hasFooter={false}
        hasSearchHeader={false}
      />
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/error",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "/",
    id: "noLayoutAndNeedLoggedIn",
    element: (
      <RootLayout
        isNeedLoggedIn={true}
        hasHeader={false}
        hasFooter={false}
        hasSearchHeader={false}
      />
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
    ],
  },
  {
    path: "/",
    id: "withHeaderAndFooterLayout",
    element: (
      <RootLayout
        isNeedLoggedIn={true}
        hasHeader={true}
        hasFooter={true}
        hasSearchHeader={false}
      />
    ),
    errorElement: <ErrorPage />,
    children: [
      // 회원
      {
        id: "mypage",
        path: "mypage",
        children: [
          {
            path: ":userId",
            element: <MyPage />,
          },
          {
            path: ":userId/edit",
            element: <MyPageEditPage />,
          },
        ],
      },
      // 상품
      {
        id: "products",
        path: "products",
        children: [
          {
            path: "regist",
            element: <ProductRegistPage />,
          },
          {
            id: "product-detail",
            path: ":productId",
            children: [
              {
                index: true,
                element: <ProductDetailPage />,
              },
              {
                path: "edit",
                element: <ProductEditPage />,
              },
            ],
          },
        ],
      },

      // 주문
      {
        id: "order-history",
        path: "order-history",
        children: [
          {
            index: true,
            element: <OrderHistoryPage />,
          },
          {
            path: "/order-history/:orderId",
            element: <OrderHistoryDetailPage />,
          },
        ],
      },
      // 구매
      {
        id: "purchase",
        path: "/purchase",
        children: [
          {
            path: "/purchase",
            element: <PurchasePage />,
          },
          {
            path: "/purchase/result",
            element: <PurchaseResultPage />,
          },
        ],
      },
    ],
  },
]);

// function App() {
//   // 다크 모드 테마 생성
//   const setIsDark = useBoundStore((state) => state.setIsDark);
//   const isDark = useBoundStore((state) => state.isDark);

//   const darkTheme = createTheme({
//     palette: {
//       mode: isDark ? "dark" : "light",
//       primary: {
//         main: "#90caf9", // 다크 모드에서의 primary 색상
//       },
//       secondary: {
//         main: "#ffcc80", // 다크 모드에서의 secondary 색상
//       },
//       background: {
//         default: isDark ? "#212121" : "#fff", // 기본 배경색
//         paper: isDark ? "#2c2c2c" : "#fff", // 다크 모드에서의 페이퍼 배경색
//       },
//       text: {
//         primary: isDark ? "#fff" : "#000", // 다크 모드에서의 텍스트 색상
//         secondary: "#989898", // 다크 모드에서의 보조 텍스트 색상
//       },

//       // 기타 색상들을 필요에 따라 추가할 수 있습니다.
//     },
//   });

//   return (
//     <main className={classes.mainContainer}>
//       <button onClick={() => setIsDark(isDark)}>다크모드</button>
//       <ThemeProvider theme={darkTheme}>
//         <CssBaseline>
//           <RouterProvider router={router} />
//         </CssBaseline>
//       </ThemeProvider>
//     </main>
//   );
// }

// export default App;

function App() {
  // 다크 모드 테마 생성

  return (
    <main className={classes.mainContainer}>
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    </main>
  )
}

export default App;
