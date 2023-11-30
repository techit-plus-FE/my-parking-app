import MockMapImg from "../../assets/images/mock-map-img.png";
import ProductList from "../domain/product/list/ProductList";

import classes from "./Home.module.css";

const Home = () => {
  return (
    <div className={classes.container}>
      <div className={classes["map-box"]}>
        <img src={MockMapImg} />
      </div>

      <ProductList />
    </div>
  );
};

export default Home;
