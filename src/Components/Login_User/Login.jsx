import React from "react";
function Login(){
    return(
        <>
            <body className="text-center">
                <form className="form-signin">
                  <img className="mb-4" src="/img/brand/bootstrap-solid.svg" alt="логотип bootstrap" width="72" height="72"/>
                  <h1 className="h3 mb-3 font-weight-normal">Пожалуйста войдите</h1>
                  <label for="inputEmail" className="sr-only">Email</label>
                  <input type="email" id="inputEmail" className="form-control" placeholder="Email" required="" autofocus=""/>
                  <label for="inputPassword" className="sr-only">Пароль</label>
                  <input type="password" id="inputPassword" className="form-control" placeholder="Пароль" required=""/>
                  <div className="checkbox mb-3">
                    <label>
                      Запомнить меня
                      <input type="checkbox" value="remember-me"/>
                    </label>
                    <p>Еще не зарегистрировались? <a className="nav-link">Пройдите регистрацию.</a></p>
                  </div>
                  <button className="btn btn-lg btn-primary btn-block" type="submit">Войти</button>
                  <p className="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
                </form>
            </body>
        </>
    );
}

export default Login;