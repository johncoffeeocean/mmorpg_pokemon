// import { config } from "dotenv";
import React from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import config from "../../config";
const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="header_wrap">
        <h1 className="header_bi">
          <Link to="" className="link ir_bd">
            OurLogo
          </Link>
        </h1>
        <div className="header_nav">
          <ul className="gnb">
            <li className="gnb_item ">
              <Link to="/" id="main_menu0" className="gnb_link">
                HOME
              </Link>
            </li>
          </ul>

          <ul className="gnb">
            <li className="gnb_item ">
              <Link to="/about" id="main_menu0" className="gnb_link">
                ABOUT
              </Link>
            </li>
          </ul>

          <ul className="gnb">
            <li className="gnb_item ">
              <Link to="/items" id="main_menu0" className="gnb_link">
                ITEM
              </Link>
            </li>
          </ul>

          <ul className="gnb">
            <li className="gnb_item ">
              <Link to="/monsters" id="main_menu0" className="gnb_link">
                POKEMON
              </Link>
            </li>
          </ul>

          {/* <ul className="gnb">
            <li className="gnb_item ">
              <Link to="/gameinfo" id="main_menu0" className="gnb_link">
                Game Information
              </Link>
              <div className="lnb">
                <ul className="lnb_list">
                  <Link to="/items">
                    <li className="lnb_item">
                      <span className="lnb_link ">Items</span>
                    </li>
                  </Link>
                  <Link to="/monsters">
                    <li className="lnb_item">
                      <span className="lnb_link ">Monsters</span>
                    </li>
                  </Link>
                </ul>
              </div>
            </li>
          </ul> */}

          <ul className="gnb">
            <li className="gnb_item ">
              <Link to="#" id="main_menu0" className="gnb_link">
                Shop
              </Link>
              <div className="lnb">
                <ul className="lnb_list">
                  <Link to="/buyitem">
                    <li className="lnb_item">
                      <span className="lnb_link ">buyitem</span>
                    </li>
                    <li className="lnb_item">
                      <span className="lnb_link ">ITEM 2</span>
                    </li>
                  </Link>
                </ul>
              </div>
            </li>
          </ul>

          <ul className="gnb">
            <li className="gnb_item ">
              <Link to="/map_editor" id="main_menu0" className="gnb_link">
                Map Editor
              </Link>
              <div className="lnb">
                <ul className="lnb_list">
                  <Link to="#">
                    <li className="lnb_item">
                      <span className="lnb_link ">ITEM 1</span>
                    </li>
                    <li className="lnb_item">
                      <span className="lnb_link ">ITEM 1</span>
                    </li>
                  </Link>
                </ul>
              </div>
            </li>
          </ul>

          {!config.getUserInfo() ? (
            <ul className="util">
              <li className="util_item">
                <Link
                  to="/login"
                  className="util_link util_link--login"
                  title="Log-in"
                >
                  <i className="ico_comm ico_user"></i>
                  <span className="headtext">Login</span>
                  <span className="ir_pm">Log-in</span>
                </Link>
              </li>

              <li className="util_item">
                <Link
                  to="/register"
                  className="util_link util_link--login"
                  title="Log-in"
                >
                  <i className="ico_comm ico_user"></i>
                  <span className="headtext">Register</span>
                  <span className="ir_pm">register</span>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="util">
              <li className="util_item">
                <Link
                  onClick={() => {
                    console.log("asdf");
                    localStorage.clear();
                    window.location.href = "/login";
                  }}
                  className="util_link util_link--login"
                  title="Log-in"
                >
                  <i className="ico_comm ico_user"></i>
                  <span className="headtext">Logout</span>
                  <span className="ir_pm">Log-out</span>
                </Link>
              </li>
            </ul>
          )}

          <Link to="/gamewindow" className="header_gamestart">
            Play Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
