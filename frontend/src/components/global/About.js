import React, { useState } from "react";
import Footer from "./Footer";

const BRANDS = ["Mercedes", "Ferrari", "Porsche", "Lamborghini"];

const About = () => {
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
                  src="/img/about_background.png"
                  alt="backgroundImage"
                  data-xblocker="passed"
                />
              </div>

              <div className="container-text-middle">
                <div className="container-text-title">RPG GAME</div>
                <div className="container-text-content">
                  This RPG is set in a medieval era with Kings, Warlords, and
                  horses. Characters need to defend themselves using swords and
                  other weapons since the roads can be dangerous. Battle system
                  will be 2 versus 2 turn-based, and characters can catch
                  monsters and train them to fight. Players can travel, buy and
                  sell items, embark on quests, join alliances and use
                  equipment.
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
