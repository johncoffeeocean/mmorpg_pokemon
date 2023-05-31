import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/global/Header";
import Footer from "./components/global/Footer";
import About from "./components/global/About";
import Register from "./components/global/Register";
import Login from "./components/global/Login";
import Page404 from "./components/global/Page404";
import MapEditor from "./components/map/MapEditor";
import GameWindow from "./components/map/GameWindow";
import Dashboard from "./components/global/Dashboard";
import GameInfo from "./components/gameinfo/GameInfo";
import Monsters from "./components/gameinfo/Monsters";
import Items from "./components/gameinfo/Items";
import News from "./components/news/News";
import BuyItem from "./components/item/BuyItem";

// import Error from "./Components/Error";
document.addEventListener("wheel", (event) => {
  if (event.ctrlKey) {
    document.body.style.zoom = "100%";
    event.preventDefault();
  }
});
function App() {
  const [showHearder, setShowHeader] = useState(true);

  useEffect(() => {
    const handleUrlChange = () => {
      console.log("URL changed:", window.location.href);
      if (window.location.href.indexOf("map_editor") > -1) {
        setShowHeader(false);
        alert("false");
      } else {
        setShowHeader(true);
        alert("true");
      }
    };

    window.addEventListener("popstate", handleUrlChange);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  });

  return (
    <div className="App relative" style={{ minHeight: "1200px;" }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/gamewindow" element={<GameWindow />} />
          <Route path="/news" element={<News />} />
          <Route path="/gameinfo" element={<GameInfo />} />
          <Route path="/monsters" element={<Monsters />} />
          <Route path="/map_editor" element={<MapEditor />} />
          <Route path="/items" element={<Items />} />
          <Route path="/buyitem" element={<BuyItem />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
