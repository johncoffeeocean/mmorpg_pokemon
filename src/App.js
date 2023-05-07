import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/global/Header";
import Footer from "./components/global/Footer";
import Page404 from "./components/global/Page404";
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
          <Route path="/new" element={<News />} />
          <Route path="/gameinfo" element={<GameInfo />} />
          <Route path="/items" element={<Items />} />
          <Route path="/monsters" element={<Monsters />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
