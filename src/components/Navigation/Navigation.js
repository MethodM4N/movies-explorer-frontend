import { Link } from "react-router-dom";
import profileIco from '../../images/header-profileIco.svg'

function Navigation({ isOpen, onClose }) {
   isOpen ? document.body.style.overflow = "hidden" : document.body.style.overflow = "scroll";

   return (
      <section className={`navigation ${isOpen ? 'navigation_opened' : ''}`}>
         <div className="navigation__container">
            <Link className="navigation__redirect-button" to="/" onClick={onClose}>Главная</Link>
            <Link className="navigation__redirect-button" to="/movies" onClick={onClose}>Фильмы</Link>
            <Link className="navigation__redirect-button" to="/saved-movies" onClick={onClose}>Сохранённые фильмы</Link>
            <Link to="/profile" className="header__container" onClick={onClose}>
               <p className='header__profile-name'>Аккаунт</p>
               <img className="header__profile-ico" src={profileIco} alt="Лого" />
            </Link>
         </div>
      </section>
   )
}

export default Navigation;