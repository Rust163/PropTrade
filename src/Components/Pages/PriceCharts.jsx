import React, {useState} from "react";
import '../../styles/styles.css';
function PriceCharts(){
    const [activeTab, setActiveTab] = useState("Акции");
    return(
<>       
<nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
  <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">Название инструмента</a>
  <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <input className="form-control form-control-dark w-100" type="text" placeholder="Поиск" aria-label="Search"/>
  <ul className="navbar-nav px-3">
    <li className="nav-item text-nowrap">
      <a className="nav-link" href="#">Найти</a>
    </li>
  </ul>
</nav>

<div className="container-fluid">
  <div className="row">
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active link-secondary" aria-current="page" href="#">
              <span data-feather="home"></span>
              Фондовый рынок
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link link-secondary" href="#">
              <span data-feather="file"></span>
              Срочный рынок
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link link-secondary" href="#">
              <span data-feather="shopping-cart"></span>
              Сырьевой рынок
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link link-secondary" href="#">
              <span data-feather="users"></span>
              Валюта
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link link-secondary" href="#">
              <span data-feather="bar-chart-2"></span>
              Криптовалюта
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link link-secondary" href="#">
              <span data-feather="layers"></span>
              Индексы
            </a>
          </li>
        </ul>

        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Saved reports</span>
          <a className="link-secondary" href="#" aria-label="Add a new report">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file-text"></span>
              Current month
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file-text"></span>
              Last quarter
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file-text"></span>
              Social engagement
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file-text"></span>
              Year-end sale
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">График цены</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group mr-2">
            <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
            <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
          </div>
          <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
            <span data-feather="calendar"></span>
            This week
          </button>
        </div>
      </div>

      <canvas className="my-4 w-100 charts-img" id="myChart" width="900" height="380"></canvas>

      <h2>{activeTab} <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}><button type="button" className="btn btn-sm btn-outline-secondary" hidden>Добавить инструмент</button>
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setActiveTab("Акции")}>Акции</button>
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setActiveTab("Фьючерсы")}>Фьючерсы</button>
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setActiveTab("Валюта")}>Валюта</button>
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setActiveTab("Криптовалюта")}>Криптовалюта</button>
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setActiveTab("Избранное")}>Избранное</button>
      </div></h2>
      
      <div className="table-responsive">
        <table className="table table-striped table-sm table-hover table-active" >
          
          {activeTab === "Акции" && <div>
            <thead>
            <tr className="table-active">
              <th className="text-center">Тикет</th>
              <th className="text-center">Название</th>
              <th className="text-center">Тип инструмента</th>
              <th className="text-center">Отрасль</th>
              <th className="text-center">Цена</th>
              <th className="text-center">Объем</th>
              <th className="text-center">Волатильность</th>
              <th className="text-center">Рыночный тренд</th>
              <th className="text-center">Дата экспирации(Фьючерсы)</th>
              <th className="text-center">Гарантийное обеспечение(Фьючерсы)</th>
            </tr>
          </thead>
            <tbody>
            <tr>
              <td className="text-center">sber</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Акции</td>
              <td className="text-center">банковская</td>
              <td className="text-center">236,52</td>
              <td className="text-center">56млн</td>
              <td className="text-center">46</td>
              <td className="text-center">рост</td>
              <td className="text-center">--</td>
              <td className="text-center">--</td>
            </tr>
            <tr>
              <td className="text-center">sbк-9.25</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Фьючерсы</td>
              <td className="text-center">банковская</td>
              <td className="text-center">2396</td>
              <td className="text-center">14млн</td>
              <td className="text-center">39</td>
              <td className="text-center">рост</td>
              <td className="text-center">15.09.2025</td>
              <td className="text-center">4953</td>
            </tr>
            <tr>
              <td className="text-center">brn-9.25</td>
              <td className="text-center">Brand</td>
              <td className="text-center">Фьючерсы</td>
              <td className="text-center">сырьевая</td>
              <td className="text-center">85,63</td>
              <td className="text-center">96млн</td>
              <td className="text-center">43</td>
              <td className="text-center">флет</td>
              <td className="text-center">15.09.2025</td>
              <td className="text-center">8560</td>
            </tr>
            <tr>
              <td className="text-center">sbк-9.25</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Фьючерсы</td>
              <td className="text-center">банковская</td>
              <td className="text-center">2396</td>
              <td className="text-center">14млн</td>
              <td className="text-center">39</td>
              <td className="text-center">рост</td>
              <td className="text-center">15.09.2025</td>
              <td className="text-center">4953</td>
            </tr>
            <tr>
              <td className="text-center">sber</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Акции</td>
              <td className="text-center">банковская</td>
              <td className="text-center">236,52</td>
              <td className="text-center">56млн</td>
              <td className="text-center">46</td>
              <td className="text-center">рост</td>
              <td className="text-center">--</td>
              <td className="text-center">--</td>
            </tr>
            <tr>
              <td className="text-center">sbк-9.25</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Фьючерсы</td>
              <td className="text-center">банковская</td>
              <td className="text-center">2396</td>
              <td className="text-center">14млн</td>
              <td className="text-center">39</td>
              <td className="text-center">рост</td>
              <td className="text-center">15.09.2025</td>
              <td className="text-center">4953</td>
            </tr>
            <tr>
              <td className="text-center">sber</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Акции</td>
              <td className="text-center">банковская</td>
              <td className="text-center">236,52</td>
              <td className="text-center">56млн</td>
              <td className="text-center">46</td>
              <td className="text-center">рост</td>
              <td className="text-center">--</td>
              <td className="text-center">--</td>
            </tr>
            <tr>
              <td className="text-center">sbк-9.25</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Фьючерсы</td>
              <td className="text-center">банковская</td>
              <td className="text-center">2396</td>
              <td className="text-center">14млн</td>
              <td className="text-center">39</td>
              <td className="text-center">рост</td>
              <td className="text-center">15.09.2025</td>
              <td className="text-center">4953</td>
            </tr>
            <tr>
              <td className="text-center">sber</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Акции</td>
              <td className="text-center">банковская</td>
              <td className="text-center">236,52</td>
              <td className="text-center">56млн</td>
              <td className="text-center">46</td>
              <td className="text-center">рост</td>
              <td className="text-center">--</td>
              <td className="text-center">--</td>
            </tr>
            <tr>
              <td className="text-center">sbк-9.25</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Фьючерсы</td>
              <td className="text-center">банковская</td>
              <td className="text-center">2396</td>
              <td className="text-center">14млн</td>
              <td className="text-center">39</td>
              <td className="text-center">рост</td>
              <td className="text-center">15.09.2025</td>
              <td className="text-center">4953</td>
            </tr>
            <tr>
              <td className="text-center">sber</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Акции</td>
              <td className="text-center">банковская</td>
              <td className="text-center">236,52</td>
              <td className="text-center">56млн</td>
              <td className="text-center">46</td>
              <td className="text-center">рост</td>
              <td className="text-center">--</td>
              <td className="text-center">--</td>
            </tr>
            <tr>
              <td className="text-center">sbк-9.25</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Фьючерсы</td>
              <td className="text-center">банковская</td>
              <td className="text-center">2396</td>
              <td className="text-center">14млн</td>
              <td className="text-center">39</td>
              <td className="text-center">рост</td>
              <td className="text-center">15.09.2025</td>
              <td className="text-center">4953</td>
            </tr>
            <tr>
              <td className="text-center">sber</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Акции</td>
              <td className="text-center">банковская</td>
              <td className="text-center">236,52</td>
              <td className="text-center">56млн</td>
              <td className="text-center">46</td>
              <td className="text-center">рост</td>
              <td className="text-center">--</td>
              <td className="text-center">--</td>
            </tr>
            <tr>
              <td className="text-center">sbк-9.25</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Фьючерсы</td>
              <td className="text-center">банковская</td>
              <td className="text-center">2396</td>
              <td className="text-center">14млн</td>
              <td className="text-center">39</td>
              <td className="text-center">рост</td>
              <td className="text-center">15.09.2025</td>
              <td className="text-center">4953</td>
            </tr>
            <tr>
              <td className="text-center">sber</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Акции</td>
              <td className="text-center">банковская</td>
              <td className="text-center">236,52</td>
              <td className="text-center">56млн</td>
              <td className="text-center">46</td>
              <td className="text-center">рост</td>
              <td className="text-center">--</td>
              <td className="text-center">--</td>
            </tr>
            <tr>
              <td className="text-center">sbк-9.25</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Фьючерсы</td>
              <td className="text-center">банковская</td>
              <td className="text-center">2396</td>
              <td className="text-center">14млн</td>
              <td className="text-center">39</td>
              <td className="text-center">рост</td>
              <td className="text-center">15.09.2025</td>
              <td className="text-center">4953</td>
            </tr>
          </tbody>
          </div>}
          {activeTab === "Фьючерсы" && <div>
            <thead>
            <tr className="table-active">
              <th className="text-center">Тикет</th>
              <th className="text-center">Название</th>
              <th className="text-center">Тип инструмента</th>
              <th className="text-center">Отрасль</th>
              <th className="text-center">Цена</th>
              <th className="text-center">Объем</th>
              <th className="text-center">Волатильность</th>
              <th className="text-center">Рыночный тренд</th>
              <th className="text-center">Дата экспирации(Фьючерсы)</th>
              <th className="text-center">Гарантийное обеспечение(Фьючерсы)</th>
            </tr>
          </thead>
            <tbody>
            <tr>
              <td className="text-center">AAPL</td>
              <td className="text-center">Apple</td>
              <td className="text-center">Акции</td>
              <td className="text-center">it</td>
              <td className="text-center">563.25</td>
              <td className="text-center">125млн</td>
              <td className="text-center">36</td>
              <td className="text-center">флет</td>
              <td className="text-center">--</td>
              <td className="text-center">--</td>
            </tr>
            <tr>
              <td className="text-center">sbк-9.25</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Фьючерсы</td>
              <td className="text-center">банковская</td>
              <td className="text-center">2396</td>
              <td className="text-center">14млн</td>
              <td className="text-center">39</td>
              <td className="text-center">рост</td>
              <td className="text-center">15.09.2025</td>
              <td className="text-center">4953</td>
            </tr>
            <tr>
              <td className="text-center">brn-9.25</td>
              <td className="text-center">Brand</td>
              <td className="text-center">Фьючерсы</td>
              <td className="text-center">сырьевая</td>
              <td className="text-center">85,63</td>
              <td className="text-center">96млн</td>
              <td className="text-center">43</td>
              <td className="text-center">флет</td>
              <td className="text-center">15.09.2025</td>
              <td className="text-center">8560</td>
            </tr>
            <tr>
              <td className="text-center">sbк-9.25</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Фьючерсы</td>
              <td className="text-center">банковская</td>
              <td className="text-center">2396</td>
              <td className="text-center">14млн</td>
              <td className="text-center">39</td>
              <td className="text-center">рост</td>
              <td className="text-center">15.09.2025</td>
              <td className="text-center">4953</td>
            </tr>
            <tr>
              <td className="text-center">sber</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Акции</td>
              <td className="text-center">банковская</td>
              <td className="text-center">236,52</td>
              <td className="text-center">56млн</td>
              <td className="text-center">46</td>
              <td className="text-center">рост</td>
              <td className="text-center">--</td>
              <td className="text-center">--</td>
            </tr>
            <tr>
              <td className="text-center">sbк-9.25</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Фьючерсы</td>
              <td className="text-center">банковская</td>
              <td className="text-center">2396</td>
              <td className="text-center">14млн</td>
              <td className="text-center">39</td>
              <td className="text-center">рост</td>
              <td className="text-center">15.09.2025</td>
              <td className="text-center">4953</td>
            </tr>
            <tr>
              <td className="text-center">sber</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Акции</td>
              <td className="text-center">банковская</td>
              <td className="text-center">236,52</td>
              <td className="text-center">56млн</td>
              <td className="text-center">46</td>
              <td className="text-center">рост</td>
              <td className="text-center">--</td>
              <td className="text-center">--</td>
            </tr>
            <tr>
              <td className="text-center">sbк-9.25</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Фьючерсы</td>
              <td className="text-center">банковская</td>
              <td className="text-center">2396</td>
              <td className="text-center">14млн</td>
              <td className="text-center">39</td>
              <td className="text-center">рост</td>
              <td className="text-center">15.09.2025</td>
              <td className="text-center">4953</td>
            </tr>
            <tr>
              <td className="text-center">sber</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Акции</td>
              <td className="text-center">банковская</td>
              <td className="text-center">236,52</td>
              <td className="text-center">56млн</td>
              <td className="text-center">46</td>
              <td className="text-center">рост</td>
              <td className="text-center">--</td>
              <td className="text-center">--</td>
            </tr>
            <tr>
              <td className="text-center">sbк-9.25</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Фьючерсы</td>
              <td className="text-center">банковская</td>
              <td className="text-center">2396</td>
              <td className="text-center">14млн</td>
              <td className="text-center">39</td>
              <td className="text-center">рост</td>
              <td className="text-center">15.09.2025</td>
              <td className="text-center">4953</td>
            </tr>
            <tr>
              <td className="text-center">sber</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Акции</td>
              <td className="text-center">банковская</td>
              <td className="text-center">236,52</td>
              <td className="text-center">56млн</td>
              <td className="text-center">46</td>
              <td className="text-center">рост</td>
              <td className="text-center">--</td>
              <td className="text-center">--</td>
            </tr>
            <tr>
              <td className="text-center">sbк-9.25</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Фьючерсы</td>
              <td className="text-center">банковская</td>
              <td className="text-center">2396</td>
              <td className="text-center">14млн</td>
              <td className="text-center">39</td>
              <td className="text-center">рост</td>
              <td className="text-center">15.09.2025</td>
              <td className="text-center">4953</td>
            </tr>
            <tr>
              <td className="text-center">sber</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Акции</td>
              <td className="text-center">банковская</td>
              <td className="text-center">236,52</td>
              <td className="text-center">56млн</td>
              <td className="text-center">46</td>
              <td className="text-center">рост</td>
              <td className="text-center">--</td>
              <td className="text-center">--</td>
            </tr>
            <tr>
              <td className="text-center">sbк-9.25</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Фьючерсы</td>
              <td className="text-center">банковская</td>
              <td className="text-center">2396</td>
              <td className="text-center">14млн</td>
              <td className="text-center">39</td>
              <td className="text-center">рост</td>
              <td className="text-center">15.09.2025</td>
              <td className="text-center">4953</td>
            </tr>
            <tr>
              <td className="text-center">sber</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Акции</td>
              <td className="text-center">банковская</td>
              <td className="text-center">236,52</td>
              <td className="text-center">56млн</td>
              <td className="text-center">46</td>
              <td className="text-center">рост</td>
              <td className="text-center">--</td>
              <td className="text-center">--</td>
            </tr>
            <tr>
              <td className="text-center">sbк-9.25</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Фьючерсы</td>
              <td className="text-center">банковская</td>
              <td className="text-center">2396</td>
              <td className="text-center">14млн</td>
              <td className="text-center">39</td>
              <td className="text-center">рост</td>
              <td className="text-center">15.09.2025</td>
              <td className="text-center">4953</td>
            </tr>
          </tbody>
          </div>}
          {activeTab === "Валюта" && <div>
            <thead>
            <tr className="table-active">
              <th className="text-center">Тикет</th>
              <th className="text-center">Название</th>
              <th className="text-center">Тип инструмента</th>
              <th className="text-center">Отрасль</th>
              <th className="text-center">Цена</th>
              <th className="text-center">Объем</th>
              <th className="text-center">Волатильность</th>
              <th className="text-center">Рыночный тренд</th>
              <th className="text-center">Дата экспирации(Фьючерсы)</th>
              <th className="text-center">Гарантийное обеспечение(Фьючерсы)</th>
            </tr>
          </thead>
            <tbody>
            <tr>
              <td className="text-center">RUB/USD</td>
              <td className="text-center">рубль/доллар</td>
              <td className="text-center">валюта</td>
              <td className="text-center">валютный</td>
              <td className="text-center">14,56</td>
              <td className="text-center">98млн</td>
              <td className="text-center">21</td>
              <td className="text-center">рост</td>
              <td className="text-center">--</td>
              <td className="text-center">--</td>
            </tr>
            <tr>
              <td className="text-center">sbк-9.25</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Фьючерсы</td>
              <td className="text-center">банковская</td>
              <td className="text-center">2396</td>
              <td className="text-center">14млн</td>
              <td className="text-center">39</td>
              <td className="text-center">рост</td>
              <td className="text-center">15.09.2025</td>
              <td className="text-center">4953</td>
            </tr>
            <tr>
              <td className="text-center">brn-9.25</td>
              <td className="text-center">Brand</td>
              <td className="text-center">Фьючерсы</td>
              <td className="text-center">сырьевая</td>
              <td className="text-center">85,63</td>
              <td className="text-center">96млн</td>
              <td className="text-center">43</td>
              <td className="text-center">флет</td>
              <td className="text-center">15.09.2025</td>
              <td className="text-center">8560</td>
            </tr>
            <tr>
              <td className="text-center">sbк-9.25</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Фьючерсы</td>
              <td className="text-center">банковская</td>
              <td className="text-center">2396</td>
              <td className="text-center">14млн</td>
              <td className="text-center">39</td>
              <td className="text-center">рост</td>
              <td className="text-center">15.09.2025</td>
              <td className="text-center">4953</td>
            </tr>
            <tr>
              <td className="text-center">sber</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Акции</td>
              <td className="text-center">банковская</td>
              <td className="text-center">236,52</td>
              <td className="text-center">56млн</td>
              <td className="text-center">46</td>
              <td className="text-center">рост</td>
              <td className="text-center">--</td>
              <td className="text-center">--</td>
            </tr>
            <tr>
              <td className="text-center">sbк-9.25</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Фьючерсы</td>
              <td className="text-center">банковская</td>
              <td className="text-center">2396</td>
              <td className="text-center">14млн</td>
              <td className="text-center">39</td>
              <td className="text-center">рост</td>
              <td className="text-center">15.09.2025</td>
              <td className="text-center">4953</td>
            </tr>
            <tr>
              <td className="text-center">sber</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Акции</td>
              <td className="text-center">банковская</td>
              <td className="text-center">236,52</td>
              <td className="text-center">56млн</td>
              <td className="text-center">46</td>
              <td className="text-center">рост</td>
              <td className="text-center">--</td>
              <td className="text-center">--</td>
            </tr>
            <tr>
              <td className="text-center">sbк-9.25</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Фьючерсы</td>
              <td className="text-center">банковская</td>
              <td className="text-center">2396</td>
              <td className="text-center">14млн</td>
              <td className="text-center">39</td>
              <td className="text-center">рост</td>
              <td className="text-center">15.09.2025</td>
              <td className="text-center">4953</td>
            </tr>
            <tr>
              <td className="text-center">sber</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Акции</td>
              <td className="text-center">банковская</td>
              <td className="text-center">236,52</td>
              <td className="text-center">56млн</td>
              <td className="text-center">46</td>
              <td className="text-center">рост</td>
              <td className="text-center">--</td>
              <td className="text-center">--</td>
            </tr>
            <tr>
              <td className="text-center">sbк-9.25</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Фьючерсы</td>
              <td className="text-center">банковская</td>
              <td className="text-center">2396</td>
              <td className="text-center">14млн</td>
              <td className="text-center">39</td>
              <td className="text-center">рост</td>
              <td className="text-center">15.09.2025</td>
              <td className="text-center">4953</td>
            </tr>
            <tr>
              <td className="text-center">sber</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Акции</td>
              <td className="text-center">банковская</td>
              <td className="text-center">236,52</td>
              <td className="text-center">56млн</td>
              <td className="text-center">46</td>
              <td className="text-center">рост</td>
              <td className="text-center">--</td>
              <td className="text-center">--</td>
            </tr>
            <tr>
              <td className="text-center">sbк-9.25</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Фьючерсы</td>
              <td className="text-center">банковская</td>
              <td className="text-center">2396</td>
              <td className="text-center">14млн</td>
              <td className="text-center">39</td>
              <td className="text-center">рост</td>
              <td className="text-center">15.09.2025</td>
              <td className="text-center">4953</td>
            </tr>
            <tr>
              <td className="text-center">sber</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Акции</td>
              <td className="text-center">банковская</td>
              <td className="text-center">236,52</td>
              <td className="text-center">56млн</td>
              <td className="text-center">46</td>
              <td className="text-center">рост</td>
              <td className="text-center">--</td>
              <td className="text-center">--</td>
            </tr>
            <tr>
              <td className="text-center">sbк-9.25</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Фьючерсы</td>
              <td className="text-center">банковская</td>
              <td className="text-center">2396</td>
              <td className="text-center">14млн</td>
              <td className="text-center">39</td>
              <td className="text-center">рост</td>
              <td className="text-center">15.09.2025</td>
              <td className="text-center">4953</td>
            </tr>
            <tr>
              <td className="text-center">sber</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Акции</td>
              <td className="text-center">банковская</td>
              <td className="text-center">236,52</td>
              <td className="text-center">56млн</td>
              <td className="text-center">46</td>
              <td className="text-center">рост</td>
              <td className="text-center">--</td>
              <td className="text-center">--</td>
            </tr>
            <tr>
              <td className="text-center">sbк-9.25</td>
              <td className="text-center">Сбербанк</td>
              <td className="text-center">Фьючерсы</td>
              <td className="text-center">банковская</td>
              <td className="text-center">2396</td>
              <td className="text-center">14млн</td>
              <td className="text-center">39</td>
              <td className="text-center">рост</td>
              <td className="text-center">15.09.2025</td>
              <td className="text-center">4953</td>
            </tr>
          </tbody>
          </div>}
          
        </table>
      </div>
    </main>
  </div>
</div>
</>
    );
}
export default PriceCharts;