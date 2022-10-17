
function Profile() {
   return (
      <section className="profile">
         <h2 className="profile__title">Привет, Александр!</h2>
         <div className="profile__container">
            <p className="profile__info">Имя</p>
            <input className="profile__input" placeholder="Александр"></input>
         </div>
         <div className="profile__container">
            <p className="profile__info">E-mail</p>
            <input className="profile__input" placeholder="pochta@yandex.ru"></input>
         </div>
         <button className="profile__button">Редактировать</button>
         <button className="profile__button">Выйти из аккаунта</button>
      </section>
   )
}

export default Profile;