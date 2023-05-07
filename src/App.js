import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/global/Header";
import Footer from "./components/global/Footer";
import Page404 from "./components/global/Page404";
import Dashboard from "./components/global/Dashboard";
// import Error from "./Components/Error";

function App() {
  return (
    <div className="App relative">
     

      <BrowserRouter>
      <Header />
        <Routes>
          
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;
