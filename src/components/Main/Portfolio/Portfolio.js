import portfolioIco from '../../../images/portfolioIco.svg'

function Portfolio() {
   return (
      <section className="portfolio">
         <h2 className="portfolio__title">Портфолио</h2>
         <ul style={{padding: "0", margin: "0"}}>
            <li className="portfolio__flex">
               <a className="portfolio__link" href="https://methodm4n.github.io/how-to-learn/" rel="noreferrer" target="_blank">
               <h3 className='portfolio__link-description'>Статичный сайт</h3>
                  <img className='portfolio__link-icon' src={portfolioIco} alt="Изображение стрелки"/>
               </a>
            </li>
            <li className="portfolio__flex">
               <a className="portfolio__link" href="https://methodm4n.github.io/russian-travel/" rel="noreferrer" target="_blank">
               <h3 className='portfolio__link-description'>Адаптивный сайт</h3>
                  <img className='portfolio__link-icon' src={portfolioIco} alt="Изображение стрелки"/>
               </a>
            </li>
            <li className="portfolio__flex">
               <a className="portfolio__link" href="https://methodm4n.github.io/russian-travel/" rel="noreferrer" target="_blank">
               <h3 className='portfolio__link-description'>Одностраничное приложение</h3>
                  <img className='portfolio__link-icon' src={portfolioIco} alt="Изображение стрелки"/>
               </a>
            </li>
         </ul>
      </section>
   )
}

export default Portfolio;