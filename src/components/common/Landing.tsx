import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// import { content as Logo } from "../../assets/images/logo.svg";

import classes from "./Landing.module.css";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 522222000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={classes.container}>
      {/* <Logo /> */}
      <span>로고</span>
      <p className={classes.title}>마이파킹</p>
    </div>
  );
};

export default Landing;
