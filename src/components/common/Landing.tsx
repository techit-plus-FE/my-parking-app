import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Logo from "../../assets/images/logo.svg?react";

import classes from "./Landing.module.css";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={classes.container}>
      <Logo />
      <p className={classes.title}>마이파킹</p>
    </div>
  );
};

export default Landing;
