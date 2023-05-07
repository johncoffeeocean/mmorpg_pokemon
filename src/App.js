import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/global/Header";
import Footer from "./components/global/Footer";
import Page404 from "./components/global/Page404";
import Dashboard from "./components/global/Dashboard";
import News from "./components/news/News";
import GameInfo from "./components/gameinfo/GameInfo";
import Monsters from "./components/gameinfo/Monsters";
import Items from "./components/gameinfo/Items";
// import Error from "./Components/Error";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/news" element={<News />} />
          <Route path="/gameinfo" element={<GameInfo />} />
          <Route path="/monsters" element={<Monsters />} />
          <Route path="/items" element={<Items />} />
          <Route path="*" element={<Page404 />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
