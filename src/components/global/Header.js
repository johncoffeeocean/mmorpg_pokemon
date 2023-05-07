import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="header_wrap">
        <h1 className="header_bi">
          <a href="" className="link ir_bd">
            LOGO
          </a>
        </h1>
        <div className="header_nav">
          <ul className="gnb">
            <li className="gnb_item ">
              <a href="#" id="main_menu0" className="gnb_link">
                News
              </a>
              <div className="lnb">
                <ul className="lnb_list">
                  <a href="#">
                    <li className="lnb_item">
                      {" "}
                      <span className="lnb_link ">ITEM 1</span>{" "}
                    </li>
                  </a>
                </ul>
              </div>
            </li>
          </ul>

          <ul className="gnb">
            <li className="gnb_item ">
              <a href="#" id="main_menu0" className="gnb_link">
                Game Information
              </a>
              <div className="lnb">
                <ul className="lnb_list">
                  <a href="#">
                    <li className="lnb_item">
                      <span className="lnb_link ">ITEM 1</span>{" "}
                    </li>
                    <li className="lnb_item">
                      <span className="lnb_link ">ITEM 2</span>{" "}
                    </li>
                    <li className="lnb_item">
                      <span className="lnb_link ">ITEM 3</span>{" "}
                    </li>
                  </a>
                </ul>
              </div>
            </li>
          </ul>

          <ul className="gnb">
            <li className="gnb_item ">
              <a href="#" id="main_menu0" className="gnb_link">
                Community
              </a>
              <div className="lnb">
                <ul className="lnb_list">
                  <a href="#">
                    <li className="lnb_item">
                      <span className="lnb_link ">ITEM 1</span>{" "}
                    </li>
                    <li className="lnb_item">
                      <span className="lnb_link ">ITEM 2</span>{" "}
                    </li>
                  </a>
                </ul>
              </div>
            </li>
          </ul>

          <ul className="gnb">
            <li className="gnb_item ">
              <a href="#" id="main_menu0" className="gnb_link">
                Cashshop
              </a>
              <div className="lnb">
                <ul className="lnb_list">
                  <a href="#">
                    <li className="lnb_item">
                      <span className="lnb_link ">ITEM 1</span>{" "}
                    </li>
                    <li className="lnb_item">
                      <span className="lnb_link ">ITEM 2</span>{" "}
                    </li>
                  </a>
                </ul>
              </div>
            </li>
          </ul>

          <ul className="util">
            <li className="util_item">
              <a href="#" className="util_link util_link--login" title="Log-in">
                <i className="ico_comm ico_user"></i>
                <span className="headtext">Login</span>
                <span className="ir_pm">Log-in</span>
              </a>
            </li>
          </ul>

          <Link to="/gamewindow" className="header_gamestart">
            Play Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
