import React, { useState } from "react";
import { Link,NavLink } from "react-router-dom";
import './Header.css'

const Header = () => {
  return (
    <header>
      <div className="header-i">
        <h2>
          <Link to={"/"}>오늘의 날씨</Link>
        </h2>
        <div className="gnb">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            날씨
          </NavLink>

          <NavLink
            to="/news"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            뉴스속보
          </NavLink>

          <NavLink
            to="/calc"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            기상 계산기
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
