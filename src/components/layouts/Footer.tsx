import React from "react";
import IconUser from "../../assets/icon/icon-user.svg?react";
import IconHome from "../../assets/icon/icon-home.svg?react";
import IconSearch from "../../assets/icon/icon-search.svg?react";
import { NavLink } from "react-router-dom";
const Footer: React.FC = () => {
  //수정하기 변경하기
  const iconActiveFill = "var(--color-gray-400)";

  return (
    <nav>
      <h1>footer !!</h1>
      <div>
        <NavLink to="/main">
          {({ isActive }) => (
            <IconUser fill={isActive ? iconActiveFill : "none"} />
          )}
        </NavLink>
        <NavLink to="/home">
          {({ isActive }) => (
            <IconHome fill={isActive ? iconActiveFill : "none"} />
          )}
        </NavLink>
        <NavLink to="/search">
          {({ isActive }) => (
            <IconSearch fill={isActive ? iconActiveFill : "none"} />
          )}
        </NavLink>
        <NavLink to="/login">로그인 하러가기</NavLink>
      </div>
    </nav>
  );
};

export default Footer;
