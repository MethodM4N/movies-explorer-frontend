import aboutMePhoto from '../../../images/photoAboutMe.png'

function AboutMe() {
   return (
      <section className="aboutMe">
         <h2 className="main__title">Студент</h2>
         <div className="aboutMe__grid">
            <div>
               <h3 className="aboutMe__name">Александр</h3>
               <p className="aboutMe__prof">Фронтенд-разработчик, 30 лет</p>
               <p className="aboutMe__description">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
               и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». 
               После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
               <a className="aboutMe__git-link" href='https://github.com/MethodM4N' rel="noreferrer" target="_blank">Github</a>
            </div>
            <img className="aboutMe__photo" src={aboutMePhoto} alt="Фото студента" />
         </div>
      </section>
   )
}

export default AboutMe;