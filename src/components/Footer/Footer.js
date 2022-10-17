
function Footer() {
   return (
      <footer className="footer">
         <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2> 
         <div className="footer__container">
            <p className="footer__copyright">&copy; 2022</p>    
            <ul className="footer__links">
               <li>
                  <a className="footer__link" href="https://practicum.yandex.ru/profile/web/">Яндекс.Практикум</a>
               </li>
               <li>
                  <a className="footer__link" href="https://github.com/MethodM4N">Github</a>
               </li>
            </ul>
         </div>
      </footer>
   )
}

export default Footer;