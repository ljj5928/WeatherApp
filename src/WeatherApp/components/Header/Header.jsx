import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { setDark } from "../../redux/uiSlice";

const Header = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.ui.isDark);
  return (
    <header>
      <div className="header-i">
        <h2>
          <Link to={"/"}>오늘의 날씨</Link>
        </h2>
        <div className="header-menu">
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
          <div className={`darkmode-btn ${isDark ? "dark" : ""}`}>
            <button
              type="button"
              className={!isDark ? "active" : ""}
              onClick={() => dispatch(setDark(false))}
            >
              <FontAwesomeIcon icon={faSun} />
            </button>
            <button
              type="button"
              className={isDark ? "active" : ""}
              onClick={() => dispatch(setDark(true))}
            >
              <FontAwesomeIcon icon={faMoon} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
