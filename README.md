# MY PARKING APP

### 주차장 오픈 마켓 서비스를 제공하는 프로젝트입니다.


```
my-parking-app
├─ .env
├─ README.md
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ src
│  ├─ App.tsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ components
│  │  ├─ UI
│  │  │  ├─ Button.tsx
│  │  │  └─ Input.tsx
│  │  ├─ common
│  │  │  ├─ Error.tsx
│  │  │  ├─ Landing.tsx
│  │  │  └─ Loading.tsx
│  │  ├─ domain
│  │  │  ├─ auth
│  │  │  │  ├─ Login.tsx
│  │  │  │  ├─ LoginForm.tsx
│  │  │  │  ├─ SignUp.tsx
│  │  │  │  └─ SignUpForm.tsx
│  │  │  ├─ my-services
│  │  │  │  ├─ MyProfile.tsx
│  │  │  │  ├─ MyProfileEdit.tsx
│  │  │  │  └─ MyProfileEditForm.tsx
│  │  │  ├─ order-history
│  │  │  │  ├─ detail
│  │  │  │  │  ├─ OrderHistoryDetailItem.tsx
│  │  │  │  │  └─ OrderHistoryDetailList.tsx
│  │  │  │  └─ list
│  │  │  │     ├─ OrderHistoryItem.tsx
│  │  │  │     └─ OrderHistoryList.tsx
│  │  │  ├─ product
│  │  │  │  ├─ detail
│  │  │  │  │  └─ ProductDetail.tsx
│  │  │  │  ├─ edit
│  │  │  │  │  └─ ProductEdit.tsx
│  │  │  │  ├─ list
│  │  │  │  │  ├─ ProductItem.tsx
│  │  │  │  │  └─ ProductList.tsx
│  │  │  │  └─ regist
│  │  │  │     ├─ ProductRegist.tsx
│  │  │  │     └─ ProductRegistForm.tsx
│  │  │  └─ purchase
│  │  │     ├─ PaymentMethod.tsx
│  │  │     ├─ Purchase.tsx
│  │  │     ├─ PurchaseForm.tsx
│  │  │     └─ PurchaseResult.tsx
│  │  └─ layouts
│  │     ├─ Card.tsx
│  │     ├─ Footer.tsx
│  │     ├─ Header.tsx
│  │     └─ SearchHeader.tsx
│  ├─ hooks
│  │  ├─ useForm.tsx
│  │  └─ useInput.tsx
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
│  │  │  └─ MyPageEditPage.tsx
│  │  ├─ order-hisotry
│  │  │  ├─ OrderHistoryDetailPage.tsx
│  │  │  └─ OrderHistoryPage.tsx
│  │  ├─ products
│  │  │  ├─ ProductDetailPage.tsx
│  │  │  ├─ ProductEditPage.tsx
│  │  │  └─ ProductRegistPage.tsx
│  │  └─ purchase
│  │     ├─ PaymentPage.tsx
│  │     ├─ PurchaseFormPage.tsx
│  │     └─ PurchaseResultPage.tsx
│  ├─ router
│  │  ├─ RouterData.ts
│  │  └─ templates
│  │     ├─ Template.tsx
│  │     ├─ WithFooter.tsx
│  │     ├─ WithHeader.tsx
│  │     ├─ WithHeaderAndFooter.tsx
│  │     └─ WithSearchHeader.tsx
│  ├─ store
│  │  └─ index.ts
│  ├─ styles
│  │  ├─ UI
│  │  │  ├─ Button.module.css
│  │  │  └─ Input.module.css
│  │  ├─ domain
│  │  │  └─ auth
│  │  │     ├─ Login.module.css
│  │  │     ├─ LoginForm.module.css
│  │  │     ├─ SignUp.module.css
│  │  │     └─ SignUpForm.module.css
│  │  └─ global.css
└─ vite.config.ts

```
### How to Run
**개발 서버 오픈** 
* git pull https://github.com/uzoolove/FESP01-project.git
* npm i
* npm run dev


**api 정보**
* api server : [https://github.com/uzoolove/FESP01-project]
* - git pull https://github.com/uzoolove/FESP01-project.git
* - cd api
* - npm i
* - npm start

