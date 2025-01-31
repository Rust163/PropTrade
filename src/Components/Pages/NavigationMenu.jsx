import React from "react";
import { useNavigate } from "react-router-dom";

function NavigationMenu(){
    const navigate = useNavigate();
    return(
    <>
        <header>
  <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Carousel</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" aria-current="page" onClick={() => navigate('/Home')}>Домашняя</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate('/News')}>Новости</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" >Графики</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" >Программное обеспечение</a>
              </li>
              <li className="nav-item" hidden={true}>
                <a className="nav-link" >Скриннер</a>
              </li>
              <li className="nav-item" hidden={true}>
                <a className="nav-link" >Торговый журнал</a>
              </li>
              <li className="nav-item" hidden={true}>
                <a className="nav-link" >Личный кабинет</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate('/Login')}>Войти</a>
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
            <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</header>

    </>
    );
}

export default NavigationMenu;