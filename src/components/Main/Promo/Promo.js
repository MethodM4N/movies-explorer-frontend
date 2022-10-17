import promoImage from '../../../images/promo-illustration.svg'

function Promo() {
   return (
      <section className="promo">
         <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
         <img className="promo__image" src={promoImage} alt="СОСОС" />
      </section>
   )
}

export default Promo;