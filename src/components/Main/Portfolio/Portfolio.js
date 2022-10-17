import portfolioIco from '../../../images/portfolioIco.svg'

function Portfolio() {
   return (
      <section className="portfolio">
         <h2 className="portfolio__title">Портфолио</h2>
         <div className="portfolio__flex">
            <h3 className='portfolio__link-description'>Статичный сайт</h3>
            <a className="portfolio__link" href="https://methodm4n.github.io/how-to-learn/">
               <img className='portfolio__link-icon' src={portfolioIco} alt="Изображение стрелки"/>
            </a>
         </div>
         <div className="portfolio__flex">
            <h3 className='portfolio__link-description'>Адаптивный сайт</h3>
            <a className="portfolio__link" href="https://methodm4n.github.io/russian-travel/">
               <img className='portfolio__link-icon' src={portfolioIco} alt="Изображение стрелки"/>
            </a>
         </div>
         <div className="portfolio__flex">
            <h3 className='portfolio__link-description'>Одностраничное приложение</h3>
            <a className="portfolio__link" href="https://methodm4n.github.io/mesto/">
               <img className='portfolio__link-icon' src={portfolioIco} alt="Изображение стрелки"/>
            </a>
         </div>
      </section>
   )
}

export default Portfolio;