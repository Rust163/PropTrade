import React from "react";
import { useState } from "react";
const Registration = ({onSubmit}) => {
    /*console.log("Получен onSubmit в Registration:", onSubmit);
    console.log("Тип onSubmit:", typeof onSubmit);*/
    const[FirstName, setFirstName] = useState('');
    const[LastName, setLastName] = useState('');
    const[MiddleName, setMiddleName] = useState('');
    const[Email, setEmail] = useState('');
    const[Phone, setPhone] = useState('');
    const[Country, setCountry] = useState('');
    const[PostIndex, setPostIndex] = useState('');
    const[PassportSeries, setPassportSeries] = useState('');
    const[PassportNumber, setPassportNumber] = useState('');
    const[PassportIssued, setPassportIssued] = useState('');
    const[DocumentPicturePath, setDocumentPicturePath] = useState('');
    const[HashPassword, setHashPassword] = useState('');
    const[ProfilePicturePath, setProfilePicturePath] = useState('');

    

    const handleSubmit = (event) => {
      event.preventDefault();
      if (typeof onSubmit === "function") {
        onSubmit({
          FirstName, LastName, MiddleName, Email, Phone, Country, 
          PostIndex, PassportSeries, PassportNumber, PassportIssued, 
          DocumentPicturePath, HashPassword, ProfilePicturePath
        });
      } else {
        /*console.error("onSubmit is not передана в Registration");*/
      }
    }
    console.log("Компонент Registration отрендерился!");
    console.log("Получен onSubmit в Registration:", onSubmit);
    console.log("Тип onSubmit:", typeof onSubmit);  
    return(
        <>
<div className="container pt-5">
  <div className="py-5 text-center">
    <img className="d-block mx-auto mb-4" src="/img/brand/bootstrap-solid.svg" alt="логотип bootstrap" width="72" height="72"/>
    <h1 className="h2">Форма оформления заказа</h1>
    <p className="lead">Ниже приведен пример формы, полностью созданной с помощью элементов управления формой Bootstrap. Каждая требуемая группа форм имеет состояние проверки, которое может быть инициировано попыткой отправить форму без ее заполнения.</p>
  </div>

  
    <div className="col-md-7 col-lg-8">
      <h4 className="mb-3">Адрес для выставления счета</h4>
      <form className="needs-validation" onSubmit={handleSubmit} noValidate>
        <div className="row g-3">
          <div className="col-sm-6">
            <label htmlFor="firstName" className="form-label">Имя</label>
            <input type="text" className="form-control" id="firstName" placeholder="Имя" value={FirstName} required="" onChange={(e) => setFirstName(e.target.value)}/>
            <div className="invalid-feedback">
              Требуется действительное имя.
            </div>
          </div>

          <div className="col-sm-6">
            <label htmlFor="lastName" className="form-label">Фамилия</label>
            <input type="text" className="form-control" id="lastName" placeholder="Фамилия" value={LastName} required="" onChange={(e) => setLastName(e.target.value)}/>
            <div className="invalid-feedback">
              Требуется действительная фамилия.
            </div>
          </div>

          <div className="col-12">
            <label htmlFor="username" className="form-label">Отчество</label>
            <div className="input-group">
              <input type="text" className="form-control" id="middleName" placeholder="Отчество" value={MiddleName} required="" onChange={(e) => setMiddleName(e.target.value)}/>
            <div className="invalid-feedback">
               Отчество пользователя обязательно для заполнения.
              </div>
            </div>
          </div>

          <div className="col-12">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" value={Email} placeholder="you@example.com" onChange={(e) => setEmail(e.target.value)}/>
            <div className="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>

          <div className="col-12">
            <label htmlFor="address" className="form-label">Номер телефона</label>
            <input type="tel" className="form-control" id="phone" placeholder="+7(123)456-78-90" value={Phone} required="" onChange={(e) => setPhone(e.target.value)}/>
            <div className="invalid-feedback">
              Пожалуйста, введите свой Номер телефона.
            </div>
          </div>

          <div className="col-sm-12">
            <label htmlFor="address2" className="form-label">Паспортные данные <span className="text-muted">(Серия, номер)</span></label>
            <input type="text" className="form-control" id="" value={PassportSeries} placeholder="Серия" onChange={(e) => setPassportSeries(e.target.value)}/>
            <input type="text" className="form-control" id="" value={PassportNumber} placeholder="Номер" onChange={(e) => setPassportNumber(e.target.value)}/>
            <input type="text" className="form-control" id="" value={PassportIssued} placeholder="Когда и кем выдан" onChange={(e) => setPassportIssued(e.target.value)}/>
            <input type="file" className="form-control" id="" placeholder="Скан или фотография паспорта" onChange={(e) => setDocumentPicturePath(e.target.files[0])}/>
          </div>

          <div className="col-md-7">
            <label htmlFor="country" className="form-label">Страна</label>
            <select className="form-select" id="country" value={Country} required="" onChange={(e) => setCountry(e.target.value)}>
              <option value="">Выберите...</option>
              <option>Россия</option>
              <option>Украина</option>
              <option>Белоруссия</option>
              <option>Казахстан</option>
            </select>
            <div className="invalid-feedback">
              Пожалуйста, выберите действительную страну.
            </div>
          </div>
          <div className="col-md-7">
            <label htmlFor="zip" className="form-label">Почтовый индекс</label>
            <input type="text" className="form-control" id="postIndex" value={PostIndex} placeholder="" required="" onChange={(e) => setPostIndex(e.target.value)}/>
            <div className="invalid-feedback">
              Требуется почтовый индекс.
            </div>
          </div>
        </div>

        <div className="col-sm-12">
          <label htmlFor="photo" className="form-label">Фото профиля</label>
          <input type="file" className="form-control" id="" placeholder="Фотография профиля" onChange={(e) => setProfilePicturePath(e.target.files[0])}/>
        </div>

        <div className="col-sm-6">
            <label htmlFor="password" className="form-label">Пароль</label>
            <input type="password" className="form-control" id="password" placeholder="Пароль" value={HashPassword} required="" onChange={(e) => setHashPassword(e.target.value)}/>
            <div className="invalid-feedback">
              Требуется ввести пароль.
            </div>
          </div>

        <hr className="my-4"/>
        <div className="form-check">
        <label className="form-check-label">Даю согласие на обработку данных</label>
          <input type="checkbox" className="form-check-input" id=""/>
        
        </div>
        

        <div className="form-check">
          <input type="checkbox" className="form-check-input" id=""/>
          <label className="form-check-label" htmlFor="save-info">Присылать мне уведомления на почту</label>
        </div>

        

        <button className="btn btn-primary btn-lg btn-block" type="submit">Зарегистрироваться</button>
      </form>
    </div>
    </div>
 

        </>
    );
}
export default Registration;
