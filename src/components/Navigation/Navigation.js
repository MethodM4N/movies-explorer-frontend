import { Link, NavLink } from "react-router-dom";
import profileIco from '../../images/header-profileIco.svg'

function Navigation({ isOpen, onClose }) {
   isOpen ? document.body.style.overflow = "hidden" : document.body.style.overflow = "scroll";

   return (
      <section className={`navigation ${isOpen ? 'navigation_opened' : ''}`}>
         <div className="navigation__container">
            <NavLink className="navigation__redirect-button" activeClassName="navigation__redirect-button_active" exact to="/" onClick={onClose}>Главная</NavLink>
            <NavLink className="navigation__redirect-button" activeClassName="navigation__redirect-button_active" exact to="/movies" onClick={onClose}>Фильмы</NavLink>
            <NavLink className="navigation__redirect-button" activeClassName="navigation__redirect-button_active" exact to="/saved-movies" onClick={onClose}>Сохранённые фильмы</NavLink>
            <Link to="/profile" className="header__container" onClick={onClose}>
               <p className='header__profile-name'>Аккаунт</p>
               <img className="header__profile-ico" src={profileIco} alt="Лого" />
            </Link>
         </div>
      </section>
   )
}

export default Navigation;