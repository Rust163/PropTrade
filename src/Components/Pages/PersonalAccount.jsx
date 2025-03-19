import React from "react";
import '../../styles/PersonalAccount.css';

function PersonalAccount(){
    return(
        <>
        <div className="account-users">
        <div className="account-block">
        <p>ITES</p>
        <div>
            <p>Депозит:</p>
        </div>
        <div>
            <p>Статус: Новичок</p>
        </div>
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light collapse">
            <ul className="nav flex-column">
                <a className="nav-link active link-secondary ff-text" href="#">
                    <span></span>
                    <li>Моя торговля</li>
                </a>
                <a className="nav-link active link-secondary ff-text" href="#">
                    <span></span>
                    <li>Единый счет</li>
                </a>
                <a className="nav-link active link-secondary ff-text" href="#">
                    <span></span>
                    <li>Финансовый результат</li>
                </a>
                <a className="nav-link active link-secondary ff-text" href="#">
                    <span></span>
                    <li>Статистика</li>
                </a>
                <a className="nav-link active link-secondary ff-text" href="#">
                    <span></span>
                    <li>Календарь отчетности</li>
                </a>
                <a className="nav-link active link-secondary ff-text" href="#">
                    <span></span>
                    <li>Характеристики акций</li>
                </a>
                <a className="nav-link active link-secondary ff-text" href="#">
                    <span></span>
                    <li>Конкурс</li>
                </a>
                <a className="nav-link active link-secondary ff-text" href="#">
                    <span></span>
                    <li>Вывод средств</li>
                </a>

                <h5>Дополнительно...</h5>

                <a className="nav-link active link-secondary ff-text" href="#">
                    <span></span>
                    <li>Профиль</li>
                </a>
                <a className="nav-link active link-secondary ff-text" href="#">
                    <span></span>
                    <li>Программное обеспечение</li>
                </a>
                <a className="nav-link active link-secondary ff-text" href="#">
                    <span></span>
                    <li>Информация</li>
                </a>
            </ul>
        </nav>
        </div>
                <thead>
                    <tr className="table-active ml-50">
                        <th className="text-center">Год</th>
                        <th className="text-center">Неделя</th>
                        <th className="text-center">Понедельник</th>
                        <th className="text-center">Вторник</th>
                        <th className="text-center">Среда</th>
                        <th className="text-center">Четверг</th>
                        <th className="text-center">Пятница</th>
                        <th className="text-center">Суббота</th>
                        <th className="text-center">Воскресение</th>
                    </tr>
                </thead>
           
        </div>
        </>
    );
}
export default PersonalAccount;