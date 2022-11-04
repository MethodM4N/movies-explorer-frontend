import { Link, NavLink } from 'react-router-dom';
import headerLogo from '../../images/header-logo.svg'
import profileIco from '../../images/header-profileIco.svg'
import Navigation from '../Navigation/Navigation';
import React from 'react';

function Header(props) {
   return (
      <>
      {
      !props.loggedIn && 
      <header className="header">
         <Link to="/"  className="header__logo"><img src={headerLogo} alt="Лого" /></Link>
         <div className="header__container">
                  <Link className="header__link" to="/signup">Регистрация</Link>
                  <Link className="header__link header__link_sign-in" to="/signin">Войти</Link>
         </div>
      </header >
      }
      {
      props.loggedIn && 
      <header className="header header_movies">
         <div className="header__container header__container_movies">
            <Link to="/"><img className="header__logo" src={headerLogo} alt="Лого" /></Link>
            <NavLink className="header__link header__link_movies" activeClassName="header__link_active" exact to='/movies'>Фильмы</NavLink>
            <NavLink className="header__link header__link_saved-movies" activeClassName="header__link_active" exact to='/saved-movies'>Сохранённые фильмы</NavLink>
         </div>
         <Link to="/profile" className="header__container header__container_movies">
            <p className='header__profile-name'>Аккаунт</p>
            <img className="header__profile-ico" src={profileIco} alt="Лого" />
         </Link>
         <div className="header__burger-menu" onClick={props.isOpen ? props.onClose : props.onClick}>
            <span className={`header__burger-class ${props.isOpen ? 'header__burger-class_clicked' : 'header__burger-class_unclicked'}`}></span>
            <span className={`header__burger-class ${props.isOpen ? 'header__burger-class_clicked' : 'header__burger-class_unclicked'}`}></span>
            <span className={`header__burger-class ${props.isOpen ? 'header__burger-class_clicked' : 'header__burger-class_unclicked'}`}></span>
         </div>
      <Navigation isOpen={props.isOpen} onClose={props.onClose} />
      </header >
      }
      </>
   );
}

export default Header;