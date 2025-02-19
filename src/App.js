import React from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationMenu from "./Components/Pages/NavigationMenu";
import RunningLine from "./Components/Pages/RunningLine";
import Home from "./Components/Pages/Home";
import News from "./Components/Pages/News";
import PriceCharts from "./Components/Pages/PriceCharts";
import Training from "./Components/Pages/Training";
import Login from "./Components/Pages/Login";
import Registration from "./Components/Pages/Registration";
import RegistrationService from "./Components/Services/RegistrationService";
import Tabs from "./Components/Pages/TestTabs";
import './styles/bootstrap.css';

function App() {
  return (
  <>
    <Router>
      <NavigationMenu />
      <RunningLine />
      <Routes>
        <Route path="/Home" element={<Home />}/>
        <Route path="/News" element={<News />}/>
        <Route path="/PriceCharts" element={<PriceCharts />}/>
        <Route path="/Training" element={<Training />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/Registration" element={<RegistrationService/>} />
        <Route path="/Tabs" element={<Tabs />}/>
      </Routes>
    </Router>
  </>
  );
}
export default App;
