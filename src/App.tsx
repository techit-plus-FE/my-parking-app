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

// 라우터 설정
const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
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
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      // 회원
      {
        id: "mypage",
        path: "/mypage/:userId",
        children: [
          {
            path: "/mypage/:userId",
            element: <MyPage />,
          },
          {
            path: "/mypage/:userId/edit",
            element: <MyPageEditPage />,
          },
        ],
      },
      // 상품
      {
        id: "products",
        path: "/products",
        children: [
          {
            path: "/products/regist",
            element: <ProductRegistPage />,
          },
          {
            id: "product-detail",
            path: "products/:productId",
            children: [
              {
                path: "/products/:productId",
                element: <ProductDetailPage />,
              },
              {
                path: "/products/:productId/edit",
                element: <ProductEditPage />,
              },
            ],
          },
        ],
      },
      // 주문
      {
        id: "order-history",
        path: "/order-history",
        children: [
          {
            path: "/order-history",
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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
