import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/global/Header";
import Footer from "./components/global/Footer";
import Page404 from "./components/global/Page404";
import MapEditor from "./components/global/MapEditor";
import GameWindow from "./components/global/GameWindow";
import Dashboard from "./components/global/Dashboard";
import GameInfo from "./components/gameinfo/GameInfo";
import Monsters from "./components/gameinfo/Monsters";
import Items from "./components/gameinfo/Items";
import News from "./components/news/News";
import { useEffect, useState } from "react";

// import Error from "./Components/Error";

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
    <div className="App relative">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/gamewindow" element={<GameWindow />} />
          <Route path="/news" element={<News />} />
          <Route path="/gameinfo" element={<GameInfo />} />
          <Route path="/monsters" element={<Monsters />} />
          <Route path="/map_editor" element={<MapEditor />} />
          <Route path="/items" element={<Items />} />
          <Route path="/*" element={<Page404 />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
