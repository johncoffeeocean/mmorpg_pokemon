import React, { useState } from "react";
import imgBackground from "../../assets/images/dashboard_background.jpg";
import imgBackBoy from "../../assets/images/dashboard_boy.png";
import imgBackGirl from "../../assets/images/dashboard_girl.png";
import imgBackMon from "../../assets/images/dashboard_monster.png";
import Footer from "./Footer";

const BRANDS = ["Mercedes", "Ferrari", "Porsche", "Lamborghini"];

const Dashboard = () => {
  const [playFlag,setPlayFlag] = useState(false)
  return (
    <div>
      <div className="main_prom">
        <div className="main_prom_banner carousel" id="carouselMainPromotion">
          <ul className="carousel_list">
            <li className="carousel_item" data-type="light">
              <a href="#" className="carousel_link">
                <div className="main_prom_info">
                  <h3 className="main_prom_title">This is sample text</h3>
                  <p className="main_prom_desc">
                    Learn about this sample text.{" "}
                  </p>
                  <button
                    type="button"
                    className="main_prom_more"
                    onClick={() => {
                      // location.href = "#";
                    }}
                  >
                    Learn more<i className="ico_comm ico_more_r"></i>
                  </button>
                </div>
              </a>
              <div className="main_prom_img">
                <img
                  className="main_prom_banner"
                  src={imgBackground}
                  alt="backgroundImage"
                  data-xblocker="passed"
                />

                <img className="main_boy_img" src={imgBackBoy} alt="boyImage" />

                <img
                  className="main_gil_img"
                  src={imgBackGirl}
                  alt="gilImage"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Dashboard;
