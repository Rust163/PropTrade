import React from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationMenu from "./Components/Pages/NavigationMenu";
import Home from "./Components/Pages/Home";
import News from "./Components/Pages/News";
import Login from "./Components/Pages/Login";
import Registration from "./Components/Pages/Registration";
import './styles/bootstrap.css';

function App() {
  return (
  <>
    <Router>
      <NavigationMenu />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/News" element={<News />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/Registration" element={<Registration />}/>
      </Routes>
    </Router>
  </>
  );
}
export default App;
