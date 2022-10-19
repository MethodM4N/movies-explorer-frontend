import { Link } from "react-router-dom";
import headerLogo from '../../images/header-logo.svg'

function Login() {
   return (
      <section className="login">
         <Link to="/" className="login__head-link"><img className="header__logo" src={headerLogo} alt="Лого"/></Link>
         <h2 className="login__title">Рады видеть!</h2>
         <label className="login__info">E-mail</label>
         <input className="login__input" placeholder=""></input>
         <span className="login__error-massage"></span>
         <label className="login__info">Пароль</label>
         <input className="login__input" type="password"  placeholder=""></input>
         <span className="login__error-massage"></span>
         <button className="login__button">Войти</button>
         <div className="login__container">
            <label className="login__redirect-info">Ещё не зарегистрированы?</label>
            <Link className="login__redirect-button" to="/signup">Регистрация</Link>
         </div>
      </section>
   )
}

export default Login;