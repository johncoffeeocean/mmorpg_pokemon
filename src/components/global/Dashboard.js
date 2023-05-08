import React, { useState } from "react";
import imgBackground from "../../assets/images/dashboard_background.jpg";
import Footer from "./Footer";

const BRANDS = ["Mercedes", "Ferrari", "Porsche", "Lamborghini"];

const Dashboard = () => {
  const [playFlag, setPlayFlag] = useState(false);
  return (
    <div>
      <div className="main_prom">
        <div className="main_prom_banner carousel" id="carouselMainPromotion">
          <ul className="carousel_list">
            <li className="carousel_item" data-type="light">
              <div className="main_prom_img">
                <img
                  className="main_prom_banner"
                  src={imgBackground}
                  alt="backgroundImage"
                  data-xblocker="passed"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <Footer/>
    </div>
  )
};

export default Dashboard;
