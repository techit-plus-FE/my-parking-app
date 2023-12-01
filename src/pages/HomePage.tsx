// 상품 전체 페이지가 곧 홈페이지가 될겁니다.

import SearchHeader from "../components/layouts/SearchHeader";

import MockMapImg from "../assets/images/mock-map-img.png";
import ProductList from "../components/domain/product/list/ProductList";

const HomePage = () => {
  return (
    <>
      <SearchHeader />
      <div>
        <img src={MockMapImg} />
      </div>

      <ProductList />
    </>
  );
};

export default HomePage;
