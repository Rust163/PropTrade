import React from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/NavigationMenu.css';

function NavigationMenu(){
    const navigate = useNavigate();
    return(
    <>
    
        <header>
  <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div className="container-fluid hight">
      <a className="navbar-brand colorful-text logo_ites" href="#">Intraday Trading EcoSystems<br/><p className="Slogan">ITES: Технологии для вашего успеха</p></a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" aria-current="page" hidden={true} onClick={() => navigate('/Home')}>Домашняя</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" hidden={true} onClick={() => navigate('/News')}>Новости</a>
              </li>
              <li className="nav-item">
                <a className="nav-link point-nav" onClick={() => navigate('/PriceCharts')}>Графики/Котировки</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" hidden={true} onClick={() => navigate('/Software')}>Программное обеспечение</a>
              </li>
              <li className="nav-item" hidden={true}>
                <a className="nav-link" >Скриннер</a>
              </li>
              <li className="nav-item" hidden={true}>
                <a className="nav-link" >Торговый журнал</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" hidden={true} onClick={() => navigate('/Training')}>Обучение</a>
              </li>
              
              <li className="nav-item">
                <a className="nav-link" hidden={true} onClick={() => navigate('/Login')}>Войти</a>
              </li>
              <li className="nav-item" hidden={true}>
                <a className="nav-link" onClick={() => navigate('/PersonalAccount')}>Личный кабинет</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" hidden={true} onClick={() => navigate('/TestCharts')}>TestPages</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" hidden={true} onClick={() => navigate('/AdminPanel')}>Админка</a>
              </li>
            </ul>
      </div>
    </div>
  </nav>
</header>

    </>
    );
}

export default NavigationMenu;