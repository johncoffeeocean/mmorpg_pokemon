import React, { useState } from "react";
import imgBackground from "../../assets/images/dashboard_background.jpg";
import imgBackBoy from "../../assets/images/dashboard_boy.png";
import imgBackGirl from "../../assets/images/dashboard_girl.png";
import imgBackMon from "../../assets/images/dashboard_monster.png";
import GameWindow from "./GameWindow";

const BRANDS = ["Mercedes", "Ferrari", "Porsche", "Lamborghini"];

const Dashboard = () => {
  const [playFlag,setPlayFlag] = useState(false)
  return (
    <div className="absolute">
      <img src={imgBackground} className="w-full h-full" ></img>
    </div>
  );
};

export default Dashboard;
