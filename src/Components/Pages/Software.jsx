import React from "react";

function Software(){
    return(
        <>
            <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
  <div className="col-md-5 p-lg-5 mx-auto my-5">
    <h1 className="display-4 font-weight-normal">Заголовок</h1>
    <p className="lead font-weight-normal">И еще более остроумный подзаголовок. Начните свои маркетинговые усилия с этого примера, основанного на маркетинговых страницах Apple.</p>
    <a className="btn btn-outline-secondary" href="#">Скоро в продаже</a>
  </div>
  <div className="product-device shadow-sm d-none d-md-block"></div>
  <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
</div>

<div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
  <div className="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
    <div className="my-3 py-3">
      <h2 className="display-5">Другой заголовок</h2>
      <p className="lead">И еще более остроумный подзаголовок.</p>
    </div>
    <div className="bg-light shadow-sm mx-auto" style={{width: '80%', height: '300', borderRadius: '21px 21px 0 0'}}></div>
  </div>
  <div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
    <div className="my-3 p-3">
      <h2 className="display-5">Другой заголовок</h2>
      <p className="lead">И еще более остроумный подзаголовок.</p>
    </div>
    <div className="bg-dark shadow-sm mx-auto" style={{width: '80%', height: '300', borderRadius: '21px 21px 0 0'}}></div>
  </div>
</div>

<div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
  <div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
    <div className="my-3 p-3">
      <h2 className="display-5">Другой заголовок</h2>
      <p className="lead">И еще более остроумный подзаголовок.</p>
    </div>
    <div className="bg-dark shadow-sm mx-auto" style={{width: '80%', height: '300', borderRadius: '21px 21px 0 0'}}></div>
  </div>
  <div className="bg-primary mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
    <div className="my-3 py-3">
      <h2 className="display-5">Другой заголовок</h2>
      <p className="lead">И еще более остроумный подзаголовок.</p>
    </div>
    <div className="bg-light shadow-sm mx-auto" style={{width: '80%', height: '300', borderRadius: '21px 21px 0 0'}}></div>
  </div>
</div>
        </>
    )
}

export default Software;