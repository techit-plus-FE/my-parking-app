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
* git pull https://github.com/uzoolove/FESP01-project.git
* cd api
* npm i
* npm start
