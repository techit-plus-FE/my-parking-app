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
import Theme from "./components/UI/Theme";
import ReplyPage from "./pages/reply/ReplyPage";
import SellerRepliesPage from "./pages/reply/SellerRepliesPage";
import MyProductPage from "./pages/my-services/MyProductPage";
import MyReplyPage from "./pages/reply/MyReplyPage";

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
        path: "/home",
        element: <HomePage />,
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
          {
            path: ":userId/mylist",
            element: <MyProductPage />,
          },
        ],
      },
      //마이페이지 주문
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
      {
        id: "myreply",
        path: "/reply",
        children: [
          // 내가 쓴 리뷰 보기
          {
            path: "replies",
            element: <MyReplyPage />,
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
    ],
  },
  // 헤더만 랜더링 되는 라우터
  {
    path: "/",
    id: "headerOnly",
    element: (
      <RootLayout
        isNeedLoggedIn={false}
        hasHeader={true}
        hasFooter={false}
        hasSearchHeader={false}
      />
    ),
    errorElement: <ErrorPage />,
    children: [
      // 리뷰
      {
        id: "reply",
        path: "/reply",
        children: [
          {
            // 리뷰 쓰는 page
            path: ":productId/:orderId",
            element: <ReplyPage />,
          },
          // 판매자의 리뷰를 볼 수 있는 page
          {
            path: "seller-replies/:sellerId",
            element: <SellerRepliesPage />,
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

function App() {
  // 다크 모드 테마 생성

  return (
    <Theme>
      <RouterProvider router={router} />
    </Theme>
  );
}

export default App;
