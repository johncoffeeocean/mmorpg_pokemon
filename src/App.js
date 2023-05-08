import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/global/Header";
import Footer from "./components/global/Footer";
import Page404 from "./components/global/Page404";
import MapEditor from "./components/global/MapEditor";
import GameWindow from "./components/global/GameWindow";
import Dashboard from "./components/global/Dashboard";
import News from "./components/news/News";
import GameInfo from "./components/gameinfo/GameInfo";
import Items from "./components/gameinfo/Items";
import Monsters from "./components/gameinfo/Monsters";

// import Error from "./Components/Error";

function App() {
  return (
    <div className="App relative">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/gamewindow" element={<GameWindow />} />
          <Route path="/news" element={<News />} />
          <Route path="/gameinfo" element={<GameInfo />} />
          <Route path="/items" element={<Items />} />
          <Route path="/monsters" element={<Monsters />} />
          <Route path="/map_editor" element={<MapEditor />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
