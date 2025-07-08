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
import TestCharts from "./Components/Pages/TestCharts";
import AdminPanel from "./Components/Pages/AdminPanel";
import PersonalAccount from "./Components/Pages/PersonalAccount";
import Software from "./Components/Pages/Software";
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
        <Route path="/Software" element={<Software/>}/>
        <Route path="/Registration" element={<RegistrationService/>} />
        <Route path="/TestCharts" element={<TestCharts />}/>
        <Route path="/AdminPanel" element={<AdminPanel />}/>
        <Route path="/PersonalAccount" element={<PersonalAccount />}/>
      </Routes>
    </Router>
  </>
  );
}
export default App;
