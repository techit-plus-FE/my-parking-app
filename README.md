# MY PARKING APP

### 주차장 오픈 마켓 서비스를 제공하는 프로젝트입니다.

### 기술 스택
#### 언어 및 라이브러리
![ts](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![zustand](https://img.shields.io/badge/react%20zustand-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB))
![axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=fff&style=flat)
#### 빌드 및 배포
![netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
#### 스타일
![mui](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
![CSS Modules Badge](https://img.shields.io/badge/CSS%20Modules-000?logo=cssmodules&logoColor=fff&style=flat)
#### 협업 및 버전관리
![github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![todoist](https://img.shields.io/badge/Todoist-E44332?style=for-the-badge&logo=todoist&logoColor=white)
#### 오픈소스 API
![Kakao Badge](https://img.shields.io/badge/Kakao-FFCD00?logo=kakao&logoColor=000&style=flat)

```
my-parking-app
├─ README.md
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ _redirects
│  └─ vite.svg
├─ src
│  ├─ App.module.css
│  ├─ App.tsx
│  ├─ components
│  │  ├─ UI
│  │  │  ├─ CommonButton.tsx
│  │  │  ├─ MediaQuery.tsx
│  │  │  ├─ MediaQueryMain.tsx
│  │  │  ├─ Theme.tsx
│  │  │  └─ Toast.tsx
│  │  ├─ common
│  │  │  ├─ Error.module.css
│  │  │  ├─ Error.tsx
│  │  │  ├─ Home.module.css
│  │  │  ├─ Home.tsx
│  │  │  ├─ Landing.module.css
│  │  │  ├─ Landing.tsx
│  │  │  ├─ Loading.tsx
│  │  │  ├─ ScrollTop.tsx
│  │  │  └─ map
│  │  │     ├─ CustomOverlayBox.module.css
│  │  │     ├─ CustomOverlayBox.tsx
│  │  │     ├─ MainKakaoMap.module.css
│  │  │     ├─ MainKakaoMap.tsx
│  │  │     ├─ RegistKakaoMap.module.css
│  │  │     ├─ RegistKakaoMap.tsx
│  │  │     ├─ ShowKakaoMap.module.css
│  │  │     └─ ShowKakaoMap.tsx
│  │  ├─ domain
│  │  │  ├─ auth
│  │  │  │  ├─ Login.module.css
│  │  │  │  ├─ Login.tsx
│  │  │  │  ├─ LoginForm.module.css
│  │  │  │  ├─ LoginForm.tsx
│  │  │  │  ├─ LoginInput.module.css
│  │  │  │  ├─ SignUp.tsx
│  │  │  │  ├─ SignUpForm.module.css
│  │  │  │  └─ SignUpForm.tsx
│  │  │  ├─ my-services
│  │  │  │  ├─ MyProfile.tsx
│  │  │  │  ├─ MyProfileEdit.tsx
│  │  │  │  ├─ MyProfileEditForm.tsx
│  │  │  │  └─ Mypage.module.css
│  │  │  ├─ order-history
│  │  │  │  ├─ detail
│  │  │  │  │  ├─ OrderHistory.module.css
│  │  │  │  │  ├─ OrderHistoryDetailItem.tsx
│  │  │  │  │  └─ OrderHistoryDetailList.tsx
│  │  │  │  ├─ list
│  │  │  │  │  ├─ OrderHistory.module.css
│  │  │  │  │  ├─ OrderHistoryItem.tsx
│  │  │  │  │  └─ OrderHistoryList.tsx
│  │  │  │  └─ ordercard
│  │  │  │     ├─ OrderCard.module.css
│  │  │  │     ├─ OrderCard.tsx
│  │  │  │     ├─ OrderTitleBox.tsx
│  │  │  │     └─ OrderTotalPrice.tsx
│  │  │  ├─ product
│  │  │  │  ├─ detail
│  │  │  │  │  ├─ DetailComponent.module.css
│  │  │  │  │  ├─ DetailComponent.tsx
│  │  │  │  │  ├─ MainImagesComponent.module.css
│  │  │  │  │  ├─ MainImagesComponent.tsx
│  │  │  │  │  ├─ PriceAndBtnComponent.module.css
│  │  │  │  │  ├─ PriceAndBtnComponent.tsx
│  │  │  │  │  ├─ ProductDetail.module.css
│  │  │  │  │  ├─ ProductDetail.tsx
│  │  │  │  │  ├─ SellerInfoComponent.module.css
│  │  │  │  │  └─ SellerInfoComponent.tsx
│  │  │  │  ├─ edit
│  │  │  │  │  └─ ProductEdit.tsx
│  │  │  │  ├─ list
│  │  │  │  │  ├─ MyProductList.tsx
│  │  │  │  │  ├─ ProductItem.module.css
│  │  │  │  │  ├─ ProductItem.tsx
│  │  │  │  │  ├─ ProductList.module.css
│  │  │  │  │  └─ ProductList.tsx
│  │  │  │  └─ regist
│  │  │  │     ├─ ProductForm.module.css
│  │  │  │     ├─ ProductForm.tsx
│  │  │  │     └─ ProductRegist.tsx
│  │  │  ├─ purchase
│  │  │  │  ├─ PaymentMethod.tsx
│  │  │  │  ├─ Purchase.tsx
│  │  │  │  ├─ PurchaseForm.tsx
│  │  │  │  ├─ PurchaseInformation.tsx
│  │  │  │  ├─ PurchaseResult.module.css
│  │  │  │  ├─ PurchaseResult.tsx
│  │  │  │  └─ purchase.module.css
│  │  │  └─ reply
│  │  │     ├─ Reply.tsx
│  │  │     ├─ ReviewCard.module.css
│  │  │     ├─ ReviewCard.tsx
│  │  │     ├─ ReviewRegist.module.css
│  │  │     ├─ ReviewRegist.tsx
│  │  │     ├─ ReviewRegistForm.module.css
│  │  │     ├─ ReviewRegistForm.tsx
│  │  │     ├─ SellerReplies.module.css
│  │  │     ├─ SellerRepliesList.tsx
│  │  │     └─ myreply
│  │  │        ├─ MyPeplyList.module.css
│  │  │        └─ MyReplyList.tsx
│  │  └─ layouts
│  │     ├─ Footer.tsx
│  │     ├─ Header.tsx
│  │     ├─ PageContainer.module.css
│  │     ├─ PageContainer.tsx
│  │     ├─ SearchHeader.tsx
│  │     ├─ SearchInput.module.css
│  │     ├─ SearchInput.tsx
│  │     ├─ SlideBar.module.css
│  │     ├─ SlideBar.tsx
│  │     └─ Toggle.tsx
│  ├─ index.css
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ ErrorPage.tsx
│  │  ├─ HomePage.tsx
│  │  ├─ LandingPage.tsx
│  │  ├─ SearchPage.tsx
│  │  ├─ auth
│  │  │  ├─ LoginPage.tsx
│  │  │  └─ SignUpPage.tsx
│  │  ├─ my-services
│  │  │  ├─ MyPage.tsx
│  │  │  ├─ MyPageEditPage.tsx
│  │  │  └─ MyProductPage.tsx
│  │  ├─ order-hisotry
│  │  │  ├─ OrderHistoryDetailPage.tsx
│  │  │  └─ OrderHistoryPage.tsx
│  │  ├─ products
│  │  │  ├─ ProductDetailPage.tsx
│  │  │  ├─ ProductEditPage.tsx
│  │  │  └─ ProductRegistPage.tsx
│  │  ├─ purchase
│  │  │  ├─ PaymentPage.tsx
│  │  │  ├─ PurchaseFormPage.tsx
│  │  │  └─ PurchaseResultPage.tsx
│  │  └─ reply
│  │     ├─ MyReplyPage.tsx
│  │     ├─ ReplyPage.tsx
│  │     └─ SellerRepliesPage.tsx
│  ├─ router
│  │  ├─ layouts
│  │  │  └─ RootLayout.tsx
│  │  └─ templates
│  │     ├─ Template.tsx
│  │     ├─ WithFooter.tsx
│  │     ├─ WithHeader.tsx
│  │     ├─ WithHeaderAndFooter.tsx
│  │     └─ WithSearchHeader.tsx
│  ├─ services
│  │  ├─ BaseUrl.ts
│  │  └─ useCustomAxios.ts
│  ├─ store
│  │  ├─ MyPageSlice.tsx
│  │  ├─ ProductSlice.tsx
│  │  ├─ PurchaseSlice.tsx
│  │  ├─ authSlice.tsx
│  │  ├─ imageSlice.tsx
│  │  ├─ index.ts
│  │  ├─ searchSlice.tsx
│  │  └─ themeSlice.ts
│  ├─ types
│  │  ├─ auth.d.ts
│  │  ├─ classImplementations.ts
│  │  ├─ image.d.ts
│  │  ├─ kakao.d.ts
│  │  ├─ myPage.d.ts
│  │  ├─ order.d.ts
│  │  ├─ products.d.ts
│  │  ├─ purchase.d.ts
│  │  ├─ reply.d.ts
│  │  ├─ search.d.ts
│  │  └─ theme.d.ts
│  ├─ utils
│  │  └─ saveInput.tsx
│  └─ vite-env.d.ts
├─ assets
│  │  ├─ custom.d.ts
│  │  ├─ fonts
│  │  │  ├─ NotoSansKR-Black.eot
│  │  │  ├─ NotoSansKR-Black.ttf
│  │  │  ├─ NotoSansKR-Bold.eot
│  │  │  ├─ NotoSansKR-Bold.ttf
│  │  │  ├─ NotoSansKR-ExtraBold.eot
│  │  │  ├─ NotoSansKR-ExtraBold.ttf
│  │  │  ├─ NotoSansKR-ExtraLight.eot
│  │  │  ├─ NotoSansKR-ExtraLight.ttf
│  │  │  ├─ NotoSansKR-Light.eot
│  │  │  ├─ NotoSansKR-Light.ttf
│  │  │  ├─ NotoSansKR-Medium.eot
│  │  │  ├─ NotoSansKR-Medium.ttf
│  │  │  ├─ NotoSansKR-Regular.eot
│  │  │  ├─ NotoSansKR-Regular.ttf
│  │  │  ├─ NotoSansKR-SemiBold.eot
│  │  │  ├─ NotoSansKR-SemiBold.ttf
│  │  │  ├─ NotoSansKR-Thin.eot
│  │  │  └─ NotoSansKR-Thin.ttf
│  │  ├─ icon
│  │  │  ├─ icon-arrow-left.svg
│  │  │  ├─ icon-home.svg
│  │  │  ├─ icon-more-vertical.svg
│  │  │  ├─ icon-search.svg
│  │  │  └─ icon-user.svg
│  │  └─ images
│  │     ├─ car-image.png
│  │     ├─ default-avatar.png
│  │     ├─ error-image.png
│  │     ├─ heart-icon-active.png
│  │     ├─ heart-icon.png
│  │     ├─ icon-_more-vertical.svg
│  │     ├─ logo-blue.png
│  │     ├─ logo-blue.svg
│  │     ├─ logo.svg
│  │     ├─ no-images.png
│  │     ├─ parking-marker-image.png
│  │     ├─ user-default-profile.png
│  │     ├─ user-marker-image.png
│  │     └─ user-marker2-image.png
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```

### How to Run
**개발 서버 오픈** 
* git pull https://github.com/uzoolove/FESP01-project.git
* npm i
* npm run dev


**api 정보**
* api server : [https://github.com/uzoolove/FESP01-project]
* git pull https://github.com/uzoolove/FESP01-project.git
* cd api
* npm i
* npm start
