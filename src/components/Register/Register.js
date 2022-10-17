import { Link } from "react-router-dom";
import headerLogo from '../../images/header-logo.svg'

function Register() {
   return (
      <section className="register">
         <Link to="/" style={{ width: "38px" }}><img className="header__logo header__logo_auth" src={headerLogo} alt="Лого" /></Link>
         <h2 className="register__title">Добро пожаловать!</h2>
         <label className="register__info">Имя</label>
         <input className="register__input" placeholder=""></input>
         <span className="register__error-massage"></span>
         <label className="register__info">E-mail</label>
         <input className="register__input" placeholder=""></input>
         <span className="register__error-massage"></span>
         <label className="register__info">Пароль</label>
         <input className="register__input" type="password"  placeholder=""></input>
         <span className="register__error-massage">Что-то пошло не так...</span>
         <button className="register__button">Зарегистрироваться</button>
         <div className="register__container">
            <label className="register__redirect-info">Уже зарегистрированы?</label>
            <Link className="register__redirect-button" to="/signin">Войти</Link>
         </div>
      </section>
   )
}

export default Register;