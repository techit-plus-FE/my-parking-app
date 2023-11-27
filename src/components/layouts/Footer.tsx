import React from "react";
import IconUser from "../../assets/icon/icon-user.svg?react";
import IconHome from "../../assets/icon/icon-home.svg?react";
import IconSearch from "../../assets/icon/icon-search.svg?react";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const navigatePage = (path: string) => {
    navigate(path);
  };

  return (
    <nav>
      <h1>footer !!</h1>
      <div>
        <button
          onClick={() => {
            navigatePage("/main");
          }}
        >
          <IconUser />
        </button>
        <button
          onClick={() => {
            navigatePage("/home");
          }}
        >
          <IconHome />
        </button>
        <button
          onClick={() => {
            navigatePage("/search");
          }}
        >
          <IconSearch />
        </button>
      </div>
    </nav>
  );
};

export default Footer;
