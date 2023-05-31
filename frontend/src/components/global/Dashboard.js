import React, { useState } from "react";
import imgBackground from "../../assets/images/dashboard_background.jpg";
import Footer from "./Footer";

const BRANDS = ["Mercedes", "Ferrari", "Porsche", "Lamborghini"];

const Dashboard = () => {
  const [playFlag, setPlayFlag] = useState(false);
  return (
    <div>
      <div className="main_prom">
        <div className=" carousel" id="carouselMainPromotion">
          <ul className="carousel_list">
            <li className="carousel_item" data-type="light">
              <div className="main_prom_img">
                <img
                  className="main_prom_banner"
                  src="/img/main_background.png"
                  alt="backgroundImage"
                  data-xblocker="passed"
                />
              </div>

              <div className="container-text-middle">
                <div className="container-text-title">RPG Game</div>
                <div className="container-text-content">
                  Let your imagination run wild like never before. <br />
                  Be the creator and ruler of your own world without rules, and
                  without limits. <br />
                  Join us and create your best memories in the world.
                </div>

                <div className="normal_button" style={{ marginTop: "2rem" }}>
                  Play Now
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
