
function AboutProject() {
   return (
      <section className="aboutProject">
         <h2 className="main__title">О проекте</h2>
         <div className="aboutProject__grid">
            <h3 className="aboutProject__subtitle">Дипломный проект включал 5 этапов</h3>
            <h3 className="aboutProject__subtitle">На выполнение диплома ушло 5 недель</h3>
            <p className="aboutProject__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            <p className="aboutProject__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
         </div>
         <div className="aboutProject__flex">
            <p className="aboutProject__weeks">1 неделя</p>
            <p className="aboutProject__weeks">4 недели</p>
         </div>
         <div className="aboutProject__flex">
            <p className="aboutProject__text-tech">Back-end</p>
            <p className="aboutProject__text-tech">Front-end</p>
         </div>
      </section>
   )
}

export default AboutProject;