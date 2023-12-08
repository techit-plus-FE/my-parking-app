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
import MyProductPage from "./pages/my-services/MyProductPage";
import ReplyPage from "./pages/reply/ReplyPage";

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
    id: "withSearchHeaderAndFooterLayout",
    element: (
      <RootLayout
        isNeedLoggedIn={true}
        hasHeader={false}
        hasFooter={true}
        hasSearchHeader={true}
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
          {
            path: "my-product",
            element: <MyProductPage />,
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
            path: ":orderId",
            element: <OrderHistoryDetailPage />,
          },
        ],
      },
      // 구매
      {
        id: "purchase",
        path: "purchase",
        children: [
          {
            index: true,
            element: <PurchasePage />,
          },
          {
            path: "result",
            element: <PurchaseResultPage />,
          },
        ],
      },
      // 후기
      {
        id: "reply",
        path: "reply/:userId",
        element: <ReplyPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
