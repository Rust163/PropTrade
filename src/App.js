import React from "react";
import {BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Login from "./Components/Login_User/Login";
import "./styles.css";

function App() {
  return (
  <>
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" aria-current="page">Домашняя</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" >Новости</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" >Графики</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" >Программное обеспечение</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" >Скриннер</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" >Торговый журнал</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" >Личный кабинет</a>
              </li>
              <li className="nav-item">
                <Link to="/Login" className="nav-link">Войти</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="dropdown08" data-toggle="dropdown" aria-expanded="true">Котировки</a>
                <ul className="dropdown-menu" aria-labelledby="dropdown08">
                  <li><a className="dropdown-item">Индексы</a></li>
                  <li><a className="dropdown-item" >Акции</a></li>
                  <li><a className="dropdown-item" >Фьючерсы</a></li>
                  <li><a className="dropdown-item" >Валюта</a></li>
                  <li><a className="dropdown-item" >Криптовалюта</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/Login" element={<Login />}/>
      </Routes>
    </Router>
  </>
  );
}
export default App;
