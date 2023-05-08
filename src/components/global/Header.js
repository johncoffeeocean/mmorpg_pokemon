import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="header_wrap">
        <h1 className="header_bi">
          <Link to="" className="link ir_bd">
            LOGO
          </Link>
        </h1>
        <div className="header_nav">
          <ul className="gnb">
            <li className="gnb_item ">
              <Link to="/news" id="main_menu0" className="gnb_link">
                News
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

          <ul className="gnb">
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
          </ul>

          <ul className="gnb">
            <li className="gnb_item ">
              <Link to="#" id="main_menu0" className="gnb_link">
                Community
              </Link>
              <div className="lnb">
                <ul className="lnb_list">
                  <Link to="#">
                    <li className="lnb_item">
                      <span className="lnb_link ">ITEM 1</span>
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
              <Link to="#" id="main_menu0" className="gnb_link">
                Cashshop
              </Link>
              <div className="lnb">
                <ul className="lnb_list">
                  <Link to="#">
                    <li className="lnb_item">
                      <span className="lnb_link ">ITEM 1</span>
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

          <ul className="util">
            <li className="util_item">
              <Link
                to="#"
                className="util_link util_link--login"
                title="Log-in"
              >
                <i className="ico_comm ico_user"></i>
                <span className="headtext">Login</span>
                <span className="ir_pm">Log-in</span>
              </Link>
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
